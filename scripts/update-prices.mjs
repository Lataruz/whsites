// Refreshes prices.json with sell prices for the four main trade hubs.
// Runs once a day from .github/workflows/update-prices.yml (Node 20+, no dependencies).
//
// Price used per item = EVE Tycoon's "sellAvgFivePercent": the average price of the
// cheapest 5% of sell-order volume in the hub's region. Items with no sell orders get null.

import { readFile, writeFile } from 'node:fs/promises';

const API_BASE = process.env.PRICE_API_BASE || 'https://evetycoon.com/api/v1/market/stats';
const OUT_PATH = process.env.PRICES_PATH || 'prices.json';
const APP_PATH = process.env.APP_PATH || 'app.js'; // holds a built-in copy of the prices for when prices.json can't load
const DELAY_MS = Number(process.env.REQUEST_DELAY_MS ?? 200);
const MAX_FAILED_FRACTION = 0.1; // give up (and keep the old file) if more than 10% of lookups fail

const HUBS = {
  jita:    { label: 'Jita',    region: 'The Forge',   regionId: 10000002 },
  amarr:   { label: 'Amarr',   region: 'Domain',      regionId: 10000043 },
  dodixie: { label: 'Dodixie', region: 'Sinq Laison', regionId: 10000032 },
  hek:     { label: 'Hek',     region: 'Metropolis',  regionId: 10000042 },
};

const ITEMS = {
  'Fullerite-C28': 30375, 'Fullerite-C32': 30376, 'Fullerite-C50': 30370, 'Fullerite-C60': 30371,
  'Fullerite-C70': 30372, 'Fullerite-C72': 30373, 'Fullerite-C84': 30374, 'Fullerite-C320': 30377,
  'Fullerite-C540': 30378,
  'Arkonor': 22, 'Bistot': 1223, 'Crokite': 1225, 'Dark Ochre': 1232, 'Gneiss': 1229,
  'Hedbergite': 21, 'Hemorphite': 1231, 'Jaspet': 1226, 'Kernite': 20, 'Mercoxit': 11396,
  'Omber': 1227, 'Pyroxeres': 1224, 'Spodumain': 19,
  // Shattered-system sites: ore variants and ice (names match the site cards in index.html)
  'Kernite (Luminous)': 17452, 'Kernite (Fiery)': 17453,
  'Pyroxeres (Solid)': 17459, 'Pyroxeres (Viscous)': 17460,
  'Thick Blue Ice': 17975, 'Enriched Clear Icicle': 17978, 'Dark Glitter': 16267,
  'Gelidus': 16268, 'Smooth Glacial Mass': 17977, 'Glare Crust': 16266,
  'Krystallos': 16269, 'Pristine White Glaze': 17976,
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const round2 = (n) => Math.round(n * 100) / 100;

async function fetchStats(regionId, typeId) {
  const url = `${API_BASE}/${regionId}/${typeId}`;
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'whsites-price-updater (https://github.com/Lataruz/whsites)' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      lastErr = err;
      await sleep(1000 * attempt);
    }
  }
  throw lastErr;
}

function toEntry(stats) {
  const orders = Number(stats.sellOrders) || 0;
  const avg = Number(stats.sellAvgFivePercent);
  const min = Number(stats.minSell);
  const ok = orders > 0 && Number.isFinite(avg) && avg > 0;
  return {
    sell: ok ? round2(avg) : null,
    min: ok && Number.isFinite(min) ? min : null,
    orders,
  };
}

async function main() {
  let previous = null;
  try {
    previous = JSON.parse(await readFile(OUT_PATH, 'utf8'));
  } catch {
    // first run, or unreadable: start fresh
  }

  const hubs = {};
  let lookups = 0;
  let failed = 0;

  for (const [hubKey, hub] of Object.entries(HUBS)) {
    const items = {};
    for (const [name, typeId] of Object.entries(ITEMS)) {
      lookups++;
      try {
        items[name] = toEntry(await fetchStats(hub.regionId, typeId));
      } catch (err) {
        failed++;
        console.warn(`Lookup failed for ${name} in ${hub.label}: ${err.message}`);
        const old = previous?.hubs?.[hubKey]?.items?.[name];
        if (old) items[name] = old; // keep yesterday's value for this one item
      }
      await sleep(DELAY_MS);
    }
    hubs[hubKey] = { label: hub.label, region: hub.region, regionId: hub.regionId, items };
  }

  if (failed / lookups > MAX_FAILED_FRACTION) {
    console.error(`Too many failed lookups (${failed} of ${lookups}). Leaving ${OUT_PATH} unchanged.`);
    process.exit(1);
  }

  const out = {
    updated: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
    source: 'EVE Tycoon regional market stats',
    method:
      'sell = average price of the cheapest 5% of sell-order volume (sellAvgFivePercent); ' +
      'min = lowest sell order; null = no sell orders in the region',
    hubs,
  };

  await writeFile(OUT_PATH, JSON.stringify(out, null, 2) + '\n');
  console.log(`Wrote ${OUT_PATH}: ${lookups - failed}/${lookups} lookups succeeded.`);
  await updateFallback(out);
}

// Replace the built-in fallback prices in app.js (between the FALLBACK_START/END markers)
// with a compact copy of today's prices, so the page still has current values if prices.json
// fails to load (for example when index.html is opened straight from disk).
async function updateFallback(out) {
  const compact = { updated: out.updated, hubs: {} };
  for (const [key, hub] of Object.entries(out.hubs)) {
    const items = {};
    for (const [name, it] of Object.entries(hub.items)) items[name] = { sell: it.sell, orders: it.orders };
    compact.hubs[key] = { label: hub.label, items };
  }
  const src = await readFile(APP_PATH, 'utf8');
  const re = /\/\*FALLBACK_START\*\/[\s\S]*?\/\*FALLBACK_END\*\//;
  if (!re.test(src)) throw new Error(`Fallback markers not found in ${APP_PATH}`);
  const json = JSON.stringify(compact).replace(/</g, '\\u003c');
  await writeFile(APP_PATH, src.replace(re, () => `/*FALLBACK_START*/${json}/*FALLBACK_END*/`));
  console.log(`Updated fallback prices in ${APP_PATH}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
