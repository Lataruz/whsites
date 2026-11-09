# Wormhole Site Field Guide

A quick-reference guide to EVE Online wormhole sites (combat, data and relic, gas, ore, and the shattered-system sites): what spawns, what triggers it, and what the gas and ore are worth.

- `index.html` is the page; `app.js` holds the site data and the code that renders it.
- `fonts/` holds the self-hosted fonts (SIL Open Font License), so the page makes no requests to other sites.
- `prices.json` holds sell prices for Jita, Amarr, Dodixie and Hek. It is refreshed once a day by `.github/workflows/update-prices.yml`, which runs `scripts/update-prices.mjs`. The script also refreshes the built-in copy of the prices in `app.js`, used when `prices.json` can't be loaded (for example when you open `index.html` straight from disk). You can also run it by hand from the Actions tab.
- Prices come from [EVE Tycoon](https://evetycoon.com/market) (each hub's whole region). Site values are rough estimates.

Compiled by Lataruz. EVE Online is a trademark of CCP hf.
