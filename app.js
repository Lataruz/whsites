const fmt = n => n.toLocaleString('en-US');
// Escape text before it goes into innerHTML (used for anything that comes from prices.json).
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------------- DATA ---------------- */

const combatSites = [
  {class:"C1", name:"Perimeter Ambush Point", waves:[
    {label:"First encounter", ships:[
      {name:"Vigilant Sentry Tower (Sirius)", qty:2, hull:"Platform"},
      {name:"Awakened Escort", qty:1, hull:"Cruiser", trigger:true},
      {name:"Emergent Escort", qty:1, hull:"Frigate", tag:"WEB"}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Escort", qty:2, hull:"Cruiser", trigger:true},
      {name:"Emergent Patroller", qty:3, hull:"Frigate"}
    ]},
    {label:"Second wave", ships:[
      {name:"Awakened Escort", qty:2, hull:"Cruiser"},
      {name:"Awakened Patroller", qty:2, hull:"Cruiser"}
    ]}
  ]},
  {class:"C1", name:"Perimeter Camp", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Watchman", qty:2, hull:"Frigate", tag:"VAMP", trigger:true},
      {name:"Emergent Patroller", qty:4, hull:"Frigate"},
      {name:"Vigilant Sentry Tower (Sirius)", qty:2, hull:"Platform"}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Watchman", qty:3, hull:"Frigate", tag:"VAMP"},
      {name:"Emergent Patroller", qty:5, hull:"Frigate"},
      {name:"Awakened Patroller", qty:1, hull:"Cruiser", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Patroller", qty:2, hull:"Frigate"},
      {name:"Awakened Patroller", qty:2, hull:"Cruiser"},
      {name:"Awakened Watchman", qty:1, hull:"Cruiser", tag:"VAMP"}
    ]}
  ]},
  {class:"C1", name:"Phase Catalyst Node", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Escort", qty:2, hull:"Frigate", tag:"WEB"},
      {name:"Emergent Watchman", qty:4, hull:"Frigate", tag:"VAMP"},
      {name:"Vigilant Sentry Tower (Sirius)", qty:4, hull:"Platform", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Patroller", qty:2, hull:"Cruiser"},
      {name:"Awakened Escort", qty:1, hull:"Cruiser", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Patroller", qty:6, hull:"Frigate"},
      {name:"Emergent Watchman", qty:3, hull:"Frigate", tag:"VAMP"}
    ]}
  ]},
  {class:"C1", name:"The Line", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Watchman", qty:3, hull:"Frigate", tag:"VAMP"},
      {name:"Emergent Patroller", qty:4, hull:"Frigate"},
      {name:"Awakened Watchman", qty:1, hull:"Cruiser", tag:"VAMP", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Patroller", qty:2, hull:"Cruiser", trigger:true},
      {name:"Emergent Escort", qty:3, hull:"Frigate", tag:"WEB"}
    ]},
    {label:"Second wave", ships:[
      {name:"Awakened Watchman", qty:5, hull:"Cruiser", tag:"VAMP"}
    ]}
  ]},
  {class:"C2", name:"Perimeter Checkpoint", waves:[
    {label:"First encounter", ships:[
      {name:"Awakened Patroller", qty:3, hull:"Cruiser", trigger:true},
      {name:"Emergent Patroller", qty:2, hull:"Frigate"},
      {name:"Vigilant Sentry Tower (Sirius)", qty:2, hull:"Platform"}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Escort", qty:2, hull:"Cruiser"},
      {name:"Awakened Patroller", qty:2, hull:"Cruiser", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Patroller", qty:3, hull:"Frigate"},
      {name:"Sleepless Patroller", qty:1, hull:"Battleship"}
    ]}
  ]},
  {class:"C2", name:"Perimeter Hangar", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Watchman", qty:2, hull:"Frigate", tag:"VAMP"},
      {name:"Awakened Patroller", qty:3, hull:"Cruiser", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Escort", qty:2, hull:"Cruiser", trigger:true},
      {name:"Sleepless Watchman", qty:1, hull:"Battleship"}
    ]},
    {label:"Second wave", ships:[
      {name:"Awakened Escort", qty:2, hull:"Cruiser"},
      {name:"Sleepless Escort", qty:1, hull:"Battleship"}
    ]}
  ]},
  {class:"C2", name:"The Ruins of Enclave Cohort 27", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Patroller", qty:6, hull:"Frigate", trigger:true},
      {name:"Sleepless Patroller", qty:1, hull:"Battleship"}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Watchman", qty:1, hull:"Frigate", tag:"VAMP"},
      {name:"Awakened Patroller", qty:5, hull:"Cruiser", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Sleepless Escort", qty:1, hull:"Battleship"}
    ]}
  ]},
  {class:"C2", name:"Sleeper Data Sanctuary", waves:[
    {label:"First encounter", ships:[
      {name:"Vigilant Sentry Tower (Sirius)", qty:3, hull:"Platform"},
      {name:"Emergent Patroller", qty:3, hull:"Frigate"},
      {name:"Awakened Escort", qty:2, hull:"Cruiser", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Escort", qty:4, hull:"Frigate", tag:"WEB"},
      {name:"Sleepless Escort", qty:1, hull:"Battleship", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Sleepless Outguard", qty:1, hull:"Battleship", tag:"VAMP"}
    ]}
  ]},
  {class:"C3", name:"Fortification Frontier Stronghold", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Defender", qty:2, hull:"Frigate", tag:"WEB"},
      {name:"Awakened Defender", qty:2, hull:"Cruiser", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Upholder", qty:2, hull:"Cruiser", tag:"WEB/VAMP", trigger:true},
      {name:"Awakened Defender", qty:2, hull:"Cruiser"}
    ]},
    {label:"Second wave", ships:[
      {name:"Awakened Defender", qty:2, hull:"Cruiser"},
      {name:"Awakened Upholder", qty:1, hull:"Cruiser", tag:"WEB/VAMP"},
      {name:"Awakened Preserver", qty:1, hull:"Cruiser", tag:"RREP"},
      {name:"Sleepless Upholder", qty:1, hull:"Battleship", tag:"VAMP"}
    ]}
  ]},
  {class:"C3", name:"Outpost Frontier Stronghold", waves:[
    {label:"First encounter", ships:[
      {name:"Wakeful Sentry Tower (Argos)", qty:3, hull:"Platform"},
      {name:"Sleepless Defender", qty:1, hull:"Battleship", tag:"WEB", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Defender", qty:4, hull:"Cruiser", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Defender", qty:4, hull:"Frigate", tag:"WEB"},
      {name:"Sleepless Defender", qty:2, hull:"Battleship", tag:"WEB"}
    ]}
  ]},
  {class:"C3", name:"Solar Cell", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Preserver", qty:1, hull:"Frigate", tag:"SCRAM/WEB/VAMP", trigger:true},
      {name:"Awakened Upholder", qty:1, hull:"Cruiser", tag:"WEB/VAMP"},
      {name:"Sleepless Defender", qty:1, hull:"Battleship", tag:"WEB", note:"Possible additional spawn"}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Defender", qty:2, hull:"Frigate", tag:"WEB"},
      {name:"Emergent Upholder", qty:2, hull:"Frigate", tag:"RREP/VAMP", trigger:true},
      {name:"Awakened Upholder", qty:1, hull:"Cruiser", tag:"WEB/VAMP"},
      {name:"Awakened Defender", qty:3, hull:"Cruiser"}
    ]},
    {label:"Second wave", ships:[
      {name:"Awakened Defender", qty:2, hull:"Cruiser"},
      {name:"Sleepless Preserver", qty:1, hull:"Battleship", tag:"RREP"},
      {name:"Sleepless Defender", qty:1, hull:"Battleship", tag:"WEB"}
    ]}
  ]},
  {class:"C3", name:"The Oruze Construct", waves:[
    {label:"First encounter", ships:[
      {name:"Wakeful Sentry Tower (Argos)", qty:2, hull:"Platform"},
      {name:"Awakened Upholder", qty:4, hull:"Cruiser", tag:"WEB/VAMP", trigger:true},
      {name:"Awakened Preserver", qty:1, hull:"Cruiser", tag:"RREP", note:"Possible additional spawn"}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Defender", qty:4, hull:"Frigate", tag:"WEB"},
      {name:"Sleepless Defender", qty:1, hull:"Battleship", tag:"WEB", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Awakened Preserver", qty:2, hull:"Cruiser", tag:"RREP"},
      {name:"Sleepless Upholder", qty:1, hull:"Battleship", tag:"VAMP"}
    ]}
  ]},
  {class:"C4", name:"Frontier Barracks", waves:[
    {label:"First encounter", ships:[
      {name:"Sleepless Preserver", qty:1, hull:"Battleship", tag:"RREP", trigger:true},
      {name:"Sleepless Upholder", qty:1, hull:"Battleship", tag:"VAMP"}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Preserver", qty:2, hull:"Cruiser", tag:"RREP"},
      {name:"Sleepless Upholder", qty:3, hull:"Battleship", tag:"VAMP", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Preserver", qty:3, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Preserver", qty:4, hull:"Cruiser", tag:"RREP"},
      {name:"Sleepless Preserver", qty:2, hull:"Battleship", tag:"RREP"}
    ]}
  ]},
  {class:"C4", name:"Frontier Command Post", waves:[
    {label:"First encounter", ships:[
      {name:"Wakeful Sentry Tower (Argos)", qty:5, hull:"Platform"},
      {name:"Emergent Defender", qty:4, hull:"Frigate", tag:"WEB"},
      {name:"Emergent Preserver", qty:4, hull:"Frigate", tag:"SCRAM/WEB/VAMP", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Upholder", qty:4, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Awakened Defender", qty:6, hull:"Cruiser", trigger:true},
      {name:"Sleepless Defender", qty:2, hull:"Battleship", tag:"WEB"}
    ]},
    {label:"Second wave", ships:[
      {name:"Awakened Defender", qty:2, hull:"Cruiser"},
      {name:"Awakened Preserver", qty:2, hull:"Cruiser", tag:"RREP"},
      {name:"Sleepless Preserver", qty:3, hull:"Battleship", tag:"RREP"}
    ]}
  ]},
  {class:"C4", name:"Integrated Terminus", waves:[
    {label:"First encounter", ships:[
      {name:"Wakeful Sentry Tower (Argos)", qty:4, hull:"Platform"},
      {name:"Emergent Upholder", qty:3, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Awakened Defender", qty:4, hull:"Cruiser", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Preserver", qty:2, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Preserver", qty:2, hull:"Cruiser", tag:"RREP"},
      {name:"Awakened Upholder", qty:4, hull:"Cruiser", tag:"WEB/VAMP", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Defender", qty:4, hull:"Frigate", tag:"WEB"},
      {name:"Emergent Upholder", qty:2, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Sleepless Safeguard", qty:1, hull:"Battleship", tag:"SCRAM/WEB/VAMP"}
    ]}
  ]},
  {class:"C4", name:"Sleeper Information Sanctum", waves:[
    {label:"First encounter", ships:[
      {name:"Awakened Upholder", qty:2, hull:"Cruiser", tag:"WEB/VAMP"},
      {name:"Sleepless Preserver", qty:2, hull:"Battleship", tag:"RREP", trigger:true},
      {name:"Emergent Upholder", qty:2, hull:"Frigate", tag:"RREP/VAMP", note:"Possible additional spawn"}
    ]},
    {label:"First wave", ships:[
      {name:"Sleepless Defender", qty:3, hull:"Battleship", tag:"WEB"},
      {name:"Sleepless Safeguard", qty:1, hull:"Battleship", tag:"SCRAM/WEB/VAMP", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Preserver", qty:2, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Emergent Upholder", qty:3, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Awakened Preserver", qty:2, hull:"Cruiser", tag:"RREP"},
      {name:"Awakened Upholder", qty:2, hull:"Cruiser", tag:"WEB/VAMP"}
    ]}
  ]},
  {class:"C5", name:"Core Garrison", waves:[
    {label:"First encounter", ships:[
      {name:"Restless Sentry Tower (Orthrus)", qty:3, hull:"Platform"},
      {name:"Emergent Sentinel", qty:5, hull:"Frigate", tag:"SCRAM/WEB"},
      {name:"Awakened Sentinel", qty:5, hull:"Cruiser", tag:"WEB", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Keeper", qty:6, hull:"Frigate", tag:"RREP/VAMP", trigger:true},
      {name:"Sleepless Sentinel", qty:3, hull:"Battleship", tag:"SCRAM/WEB/VAMP"}
    ]},
    {label:"Second wave", ships:[
      {name:"Awakened Sentinel", qty:5, hull:"Cruiser", tag:"WEB"},
      {name:"Awakened Keeper", qty:3, hull:"Cruiser", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Sentinel", qty:3, hull:"Battleship", tag:"SCRAM/WEB/VAMP", trigger:true}
    ]},
    {label:"Third wave", ships:[
      {name:"Emergent Warden", qty:3, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Sentinel", qty:2, hull:"Cruiser", tag:"WEB"},
      {name:"Sleepless Keeper", qty:2, hull:"Battleship", tag:"VAMP"}
    ]}
  ],
  escalation:[
    {name:"Upgraded Avenger", qty:3, hull:"Elite Battleship", tag:"SCRAM/WEB/VAMP", note:"Spawns once for each capital ship warp-in"},
    {name:"Decloaked Transmission Relay", qty:1, hull:"Structure", note:"Spawned by the Awakened Sentinel x5 in the Second Wave, attacking it triggers the Drifter wave"},
    {name:"Drifter Response Battleship (Arithmos Tyrannos)", qty:1, hull:"Overseer Battleship", tag:"SCRAM/WEB/VAMP", note:"Without a capital on site a Drifter Recon Battleship (Hyleus Tyrannos) spawns instead"}
  ]},
  {class:"C5", name:"Core Stronghold", waves:[
    {label:"First encounter", ships:[
      {name:"Restless Sentry Tower (Orthrus)", qty:6, hull:"Platform"},
      {name:"Emergent Sentinel", qty:4, hull:"Frigate", tag:"SCRAM/WEB", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Sleepless Keeper", qty:2, hull:"Battleship", tag:"VAMP"},
      {name:"Sleepless Warden", qty:2, hull:"Battleship", tag:"RREP", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Warden", qty:6, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Sentinel", qty:7, hull:"Cruiser", tag:"WEB", trigger:true}
    ]},
    {label:"Third wave", ships:[
      {name:"Awakened Warden", qty:4, hull:"Cruiser", tag:"RREP"},
      {name:"Sleepless Keeper", qty:2, hull:"Battleship", tag:"VAMP"},
      {name:"Sleepless Warden", qty:3, hull:"Battleship", tag:"RREP"}
    ]}
  ],
  escalation:[
    {name:"Upgraded Avenger", qty:3, hull:"Elite Battleship", tag:"SCRAM/WEB/VAMP", note:"Spawns once for each capital ship warp-in"},
    {name:"Decloaked Transmission Relay", qty:1, hull:"Structure", note:"Spawns when the Sleepless Keeper x2 in the Third Wave die, attacking it triggers the Drifter wave"},
    {name:"Drifter Response Battleship (Arithmos Tyrannos)", qty:1, hull:"Overseer Battleship", tag:"SCRAM/WEB/VAMP", note:"Without a capital on site a Drifter Recon Battleship (Hyleus Tyrannos) spawns instead"}
  ]},
  {class:"C5", name:"Oruze Osobnyk", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Sentinel", qty:4, hull:"Frigate", tag:"SCRAM/WEB"},
      {name:"Sleepless Keeper", qty:1, hull:"Battleship", tag:"VAMP"},
      {name:"Sleepless Sentinel", qty:3, hull:"Battleship", tag:"SCRAM/WEB/VAMP", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Sentinel", qty:6, hull:"Cruiser", tag:"WEB"},
      {name:"Sleepless Guardian", qty:1, hull:"Battleship", tag:"SCRAM/WEB/VAMP", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Keeper", qty:4, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Emergent Warden", qty:2, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Warden", qty:3, hull:"Cruiser", tag:"RREP"}
    ]}
  ],
  escalation:[
    {name:"Upgraded Avenger", qty:3, hull:"Elite Battleship", tag:"SCRAM/WEB/VAMP", note:"Spawns once for each capital ship warp-in"},
    {name:"Decloaked Transmission Relay", qty:1, hull:"Structure", note:"Attacking it triggers the Drifter wave"},
    {name:"Drifter Response Battleship (Arithmos Tyrannos)", qty:1, hull:"Overseer Battleship", tag:"SCRAM/WEB/VAMP", note:"Without a capital on site a Drifter Recon Battleship (Hyleus Tyrannos) spawns instead"}
  ]},
  {class:"C5", name:"Quarantine Area", waves:[
    {label:"First encounter", ships:[
      {name:"Restless Sentry Tower (Orthrus)", qty:4, hull:"Platform", trigger:"?"},
      {name:"Emergent Escort", qty:3, hull:"Frigate", tag:"WEB"},
      {name:"Awakened Keeper", qty:2, hull:"Cruiser", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Sentinel", qty:1, hull:"Battleship", tag:"SCRAM/WEB/VAMP"}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Sentinel", qty:4, hull:"Cruiser", tag:"WEB", trigger:"?"},
      {name:"Sleepless Sentinel", qty:2, hull:"Battleship", tag:"SCRAM/WEB/VAMP"}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Sentinel", qty:5, hull:"Frigate", tag:"SCRAM/WEB"},
      {name:"Awakened Warden", qty:3, hull:"Cruiser", tag:"RREP"},
      {name:"Sleepless Keeper", qty:2, hull:"Battleship", tag:"VAMP", trigger:true}
    ]}
  ],
  escalation:[
    {name:"Upgraded Avenger", qty:3, hull:"Elite Battleship", tag:"SCRAM/WEB/VAMP", note:"Spawns once for each capital ship warp-in"},
    {name:"Decloaked Transmission Relay", qty:1, hull:"Structure", note:"Spawns when the Sleepless Keepers die, attacking it triggers the Drifter wave"},
    {name:"Drifter Response Battleship (Arithmos Tyrannos)", qty:1, hull:"Overseer Battleship", tag:"SCRAM/WEB/VAMP", note:"Without a capital on site a Drifter Recon Battleship (Hyleus Tyrannos) spawns instead"}
  ]},
  {class:"C6", name:"Core Citadel", waves:[
    {label:"First encounter", ships:[
      {name:"Sleepless Keeper", qty:1, hull:"Battleship", tag:"VAMP"},
      {name:"Sleepless Sentinel", qty:1, hull:"Battleship", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Warden", qty:1, hull:"Battleship", tag:"RREP", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Keeper", qty:8, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Sleepless Sentinel", qty:3, hull:"Battleship", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Warden", qty:1, hull:"Battleship", tag:"RREP", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Keeper", qty:8, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Sleepless Keeper", qty:3, hull:"Battleship", tag:"VAMP", trigger:true},
      {name:"Sleepless Warden", qty:3, hull:"Battleship", tag:"RREP"}
    ]},
    {label:"Third wave", ships:[
      {name:"Emergent Keeper", qty:8, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Sleepless Guardian", qty:2, hull:"Battleship", tag:"SCRAM/WEB/VAMP"}
    ]}
  ],
  escalation:[
    {name:"Upgraded Avenger", qty:3, hull:"Elite Battleship", tag:"SCRAM/WEB/VAMP", note:"Spawns once for each capital ship warp-in"},
    {name:"Decloaked Transmission Relay", qty:1, hull:"Structure", note:"Attacking it triggers the Drifter wave"},
    {name:"Drifter Response Battleship (Arithmos Tyrannos)", qty:1, hull:"Overseer Battleship", tag:"SCRAM/WEB/VAMP", note:"Without a capital on site a Drifter Recon Battleship (Hyleus Tyrannos) spawns instead"}
  ]},
  {class:"C6", name:"Core Bastion", waves:[
    {label:"First encounter", ships:[
      {name:"Restless Sentry Tower (Orthrus)", qty:3, hull:"Platform"},
      {name:"Emergent Sentinel", qty:3, hull:"Frigate", tag:"SCRAM/WEB"},
      {name:"Emergent Keeper", qty:3, hull:"Frigate", tag:"RREP/VAMP", trigger:true},
      {name:"Awakened Sentinel", qty:3, hull:"Cruiser", tag:"WEB"},
      {name:"Awakened Warden", qty:3, hull:"Cruiser", tag:"RREP"},
      {name:"Awakened Keeper", qty:3, hull:"Cruiser", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Sentinel", qty:2, hull:"Battleship", tag:"SCRAM/WEB/VAMP"}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Sentinel", qty:4, hull:"Cruiser", tag:"WEB"},
      {name:"Awakened Warden", qty:4, hull:"Cruiser", tag:"RREP", trigger:true},
      {name:"Sleepless Keeper", qty:4, hull:"Battleship", tag:"VAMP"}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Warden", qty:6, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Warden", qty:5, hull:"Cruiser", tag:"RREP"},
      {name:"Sleepless Guardian", qty:5, hull:"Battleship", tag:"SCRAM/WEB/VAMP", trigger:true}
    ]},
    {label:"Third wave", ships:[
      {name:"Sleepless Sentinel", qty:4, hull:"Battleship", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Guardian", qty:2, hull:"Battleship", tag:"SCRAM/WEB/VAMP"}
    ]}
  ],
  escalation:[
    {name:"Upgraded Avenger", qty:3, hull:"Elite Battleship", tag:"SCRAM/WEB/VAMP", note:"Spawns once for each capital ship warp-in"},
    {name:"Decloaked Transmission Relay", qty:1, hull:"Structure", note:"Attacking it triggers the Drifter wave"},
    {name:"Drifter Response Battleship (Arithmos Tyrannos)", qty:1, hull:"Overseer Battleship", tag:"SCRAM/WEB/VAMP", note:"Without a capital on site a Drifter Recon Battleship (Hyleus Tyrannos) spawns instead"}
  ]},
  {class:"C6", name:"The Mirror", waves:[
    {label:"First encounter", ships:[
      {name:"Restless Sentry Tower (Orthrus)", qty:6, hull:"Platform"},
      {name:"Sleepless Sentinel", qty:2, hull:"Battleship", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Warden", qty:3, hull:"Battleship", tag:"RREP", trigger:true},
      {name:"Awakened Warden", qty:4, hull:"Cruiser", tag:"RREP"},
      {name:"Emergent Warden", qty:6, hull:"Frigate", tag:"SCRAM/WEB/VAMP"}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Sentinel", qty:6, hull:"Frigate", tag:"SCRAM/WEB"},
      {name:"Sleepless Keeper", qty:2, hull:"Battleship", tag:"VAMP"},
      {name:"Sleepless Guardian", qty:3, hull:"Battleship", tag:"SCRAM/WEB/VAMP", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Keeper", qty:4, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Emergent Warden", qty:4, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Keeper", qty:4, hull:"Cruiser", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Warden", qty:4, hull:"Cruiser", tag:"RREP"},
      {name:"Sleepless Keeper", qty:4, hull:"Battleship", tag:"VAMP"}
    ]}
  ],
  escalation:[
    {name:"Upgraded Avenger", qty:3, hull:"Elite Battleship", tag:"SCRAM/WEB/VAMP", note:"Spawns once for each capital ship warp-in"},
    {name:"Decloaked Transmission Relay", qty:1, hull:"Structure", note:"Attacking it triggers the Drifter wave"},
    {name:"Drifter Response Battleship (Arithmos Tyrannos)", qty:1, hull:"Overseer Battleship", tag:"SCRAM/WEB/VAMP", note:"Without a capital on site a Drifter Recon Battleship (Hyleus Tyrannos) spawns instead"}
  ]},
  {class:"C6", name:"Strange Energy Readings", waves:[
    {label:"First encounter", ships:[
      {name:"Awakened Warden", qty:5, hull:"Cruiser", tag:"RREP", trigger:true},
      {name:"Emergent Keeper", qty:5, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Sleepless Keeper", qty:2, hull:"Battleship", tag:"VAMP", note:"May not always appear"}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Keeper", qty:6, hull:"Cruiser", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Guardian", qty:3, hull:"Battleship", tag:"SCRAM/WEB/VAMP", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Keeper", qty:6, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Awakened Warden", qty:4, hull:"Cruiser", tag:"RREP"},
      {name:"Sleepless Keeper", qty:5, hull:"Battleship", tag:"VAMP"}
    ]}
  ]}
];

const dataRelicSites = [
  {class:"C1", type:"Relic", name:"Forgotten Perimeter Power Array", waves:[
    {label:"First encounter", ships:[
      {name:"Awakened Patroller", qty:2, hull:"Cruiser", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Escort", qty:3, hull:"Cruiser", trigger:true},
      {name:"Emergent Watchman", qty:3, hull:"Frigate", tag:"VAMP"}
    ]},
    {label:"Second wave", ships:[
      {name:"Awakened Escort", qty:2, hull:"Cruiser"},
      {name:"Awakened Watchman", qty:2, hull:"Cruiser", tag:"VAMP"}
    ]}
  ]},
  {class:"C1", type:"Relic", name:"Forgotten Perimeter Coronation Platform", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Patroller", qty:2, hull:"Frigate"},
      {name:"Emergent Escort", qty:1, hull:"Frigate", tag:"WEB"},
      {name:"Awakened Patroller", qty:2, hull:"Cruiser", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Escort", qty:1, hull:"Frigate", tag:"WEB"},
      {name:"Awakened Patroller", qty:3, hull:"Cruiser", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Patroller", qty:3, hull:"Frigate"},
      {name:"Awakened Patroller", qty:2, hull:"Cruiser"},
      {name:"Awakened Watchman", qty:3, hull:"Cruiser", tag:"VAMP"}
    ]}
  ]},
  {class:"C1", type:"Data", name:"Unsecured Perimeter Amplifier", waves:[
    {label:"First encounter", ships:[
      {name:"Awakened Patroller", qty:2, hull:"Cruiser", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Watchman", qty:3, hull:"Frigate", tag:"VAMP"},
      {name:"Awakened Escort", qty:3, hull:"Cruiser", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Awakened Escort", qty:2, hull:"Cruiser"},
      {name:"Awakened Watchman", qty:2, hull:"Cruiser", tag:"VAMP"}
    ]}
  ]},
  {class:"C1", type:"Data", name:"Unsecured Perimeter Information Center", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Patroller", qty:3, hull:"Frigate"},
      {name:"Emergent Watchman", qty:1, hull:"Frigate", tag:"VAMP"},
      {name:"Awakened Patroller", qty:1, hull:"Cruiser", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Escort", qty:1, hull:"Frigate", tag:"WEB"},
      {name:"Awakened Patroller", qty:3, hull:"Cruiser", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Patroller", qty:2, hull:"Frigate"},
      {name:"Awakened Patroller", qty:2, hull:"Cruiser"},
      {name:"Awakened Watchman", qty:3, hull:"Cruiser", tag:"VAMP"}
    ]}
  ]},
  {class:"C2", type:"Relic", name:"Forgotten Perimeter Gateway", waves:[
    {label:"First encounter", ships:[
      {name:"Awakened Patroller", qty:4, hull:"Cruiser"},
      {name:"Awakened Watchman", qty:1, hull:"Cruiser", tag:"VAMP", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Watchman", qty:2, hull:"Frigate", tag:"VAMP"},
      {name:"Sleepless Patroller", qty:1, hull:"Battleship", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Patroller", qty:4, hull:"Frigate"},
      {name:"Sleepless Escort", qty:1, hull:"Battleship"},
      {name:"Sleepless Watchman", qty:1, hull:"Battleship"}
    ]}
  ]},
  {class:"C2", type:"Relic", name:"Forgotten Perimeter Habitation Coils", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Patroller", qty:2, hull:"Frigate"},
      {name:"Emergent Escort", qty:2, hull:"Frigate", tag:"WEB", trigger:true},
      {name:"Awakened Patroller", qty:3, hull:"Cruiser"}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Escort", qty:4, hull:"Frigate", tag:"WEB"},
      {name:"Awakened Patroller", qty:4, hull:"Cruiser", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Escort", qty:4, hull:"Frigate", tag:"WEB"},
      {name:"Emergent Patroller", qty:4, hull:"Frigate"},
      {name:"Sleepless Patroller", qty:1, hull:"Battleship", trigger:true}
    ]},
    {label:"Third wave", ships:[
      {name:"Emergent Escort", qty:3, hull:"Frigate", tag:"WEB"},
      {name:"Awakened Patroller", qty:1, hull:"Cruiser"},
      {name:"Awakened Escort", qty:2, hull:"Cruiser"},
      {name:"Sleepless Watchman", qty:1, hull:"Battleship"}
    ]}
  ]},
  {class:"C2", type:"Data", name:"Unsecured Perimeter Comms Relay", waves:[
    {label:"First encounter", ships:[
      {name:"Awakened Patroller", qty:3, hull:"Cruiser"},
      {name:"Awakened Watchman", qty:2, hull:"Cruiser", tag:"VAMP", trigger:true},
      {name:"Sleepless Outguard", qty:1, hull:"Battleship", tag:"VAMP", note:"Possible additional spawn"}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Watchman", qty:2, hull:"Frigate", tag:"VAMP"},
      {name:"Sleepless Patroller", qty:1, hull:"Battleship", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Patroller", qty:2, hull:"Frigate"},
      {name:"Sleepless Escort", qty:1, hull:"Battleship"},
      {name:"Sleepless Watchman", qty:1, hull:"Battleship"}
    ]}
  ]},
  {class:"C2", type:"Data", name:"Unsecured Perimeter Transponder Farm", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Escort", qty:2, hull:"Frigate", tag:"WEB", trigger:true},
      {name:"Emergent Patroller", qty:1, hull:"Frigate"},
      {name:"Awakened Patroller", qty:3, hull:"Cruiser"}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Escort", qty:2, hull:"Frigate", tag:"WEB"},
      {name:"Awakened Watchman", qty:1, hull:"Cruiser", tag:"VAMP"},
      {name:"Awakened Patroller", qty:4, hull:"Cruiser", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Patroller", qty:4, hull:"Frigate"},
      {name:"Emergent Escort", qty:4, hull:"Frigate", tag:"WEB", trigger:true},
      {name:"Sleepless Patroller", qty:1, hull:"Battleship"}
    ]},
    {label:"Third wave", ships:[
      {name:"Emergent Escort", qty:4, hull:"Frigate", tag:"WEB"},
      {name:"Awakened Escort", qty:3, hull:"Cruiser"},
      {name:"Awakened Patroller", qty:5, hull:"Cruiser"}
    ]}
  ]},
  {class:"C3", type:"Relic", name:"Forgotten Frontier Quarantine Outpost", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Defender", qty:6, hull:"Frigate", tag:"WEB"},
      {name:"Awakened Preserver", qty:3, hull:"Cruiser", tag:"RREP", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Upholder", qty:3, hull:"Cruiser", tag:"WEB/VAMP"},
      {name:"Awakened Preserver", qty:2, hull:"Cruiser", tag:"RREP"},
      {name:"Awakened Defender", qty:3, hull:"Cruiser", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Upholder", qty:4, hull:"Frigate", tag:"RREP/VAMP", trigger:true},
      {name:"Sleepless Defender", qty:1, hull:"Battleship", tag:"WEB"}
    ]},
    {label:"Third wave", ships:[
      {name:"Emergent Defender", qty:4, hull:"Frigate", tag:"WEB"},
      {name:"Sleepless Preserver", qty:2, hull:"Battleship", tag:"RREP"}
    ]}
  ]},
  {class:"C3", type:"Relic", name:"Forgotten Frontier Recursive Depot", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Preserver", qty:4, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Defender", qty:2, hull:"Cruiser", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Defender", qty:3, hull:"Cruiser", trigger:true},
      {name:"Awakened Upholder", qty:4, hull:"Cruiser", tag:"WEB/VAMP"}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Defender", qty:2, hull:"Frigate", tag:"WEB"},
      {name:"Awakened Upholder", qty:2, hull:"Cruiser", tag:"WEB/VAMP"},
      {name:"Sleepless Upholder", qty:2, hull:"Battleship", tag:"VAMP", trigger:true}
    ]},
    {label:"Third wave", ships:[
      {name:"Emergent Preserver", qty:2, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Upholder", qty:1, hull:"Cruiser", tag:"WEB/VAMP"},
      {name:"Sleepless Upholder", qty:3, hull:"Battleship", tag:"VAMP"}
    ]}
  ]},
  {class:"C3", type:"Data", name:"Unsecured Frontier Database", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Preserver", qty:3, hull:"Frigate", tag:"SCRAM/WEB/VAMP", trigger:true},
      {name:"Awakened Defender", qty:3, hull:"Cruiser"}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Upholder", qty:4, hull:"Cruiser", tag:"WEB/VAMP"},
      {name:"Awakened Defender", qty:4, hull:"Cruiser", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Defender", qty:3, hull:"Frigate", tag:"WEB"},
      {name:"Awakened Upholder", qty:3, hull:"Cruiser", tag:"WEB/VAMP"},
      {name:"Sleepless Upholder", qty:1, hull:"Battleship", tag:"VAMP", trigger:true}
    ]},
    {label:"Third wave", ships:[
      {name:"Emergent Preserver", qty:2, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Upholder", qty:3, hull:"Cruiser", tag:"WEB/VAMP"},
      {name:"Sleepless Upholder", qty:2, hull:"Battleship", tag:"VAMP"}
    ]}
  ]},
  {class:"C3", type:"Data", name:"Unsecured Frontier Receiver", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Defender", qty:5, hull:"Frigate", tag:"WEB"},
      {name:"Awakened Preserver", qty:3, hull:"Cruiser", tag:"RREP", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Defender", qty:3, hull:"Cruiser"},
      {name:"Awakened Upholder", qty:3, hull:"Cruiser", tag:"WEB/VAMP"},
      {name:"Awakened Preserver", qty:1, hull:"Cruiser", tag:"RREP", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Upholder", qty:3, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Sleepless Defender", qty:1, hull:"Battleship", tag:"WEB", trigger:true}
    ]},
    {label:"Third wave", ships:[
      {name:"Emergent Defender", qty:4, hull:"Frigate", tag:"WEB"},
      {name:"Sleepless Preserver", qty:2, hull:"Battleship", tag:"RREP"}
    ]}
  ]},
  {class:"C4", type:"Relic", name:"Forgotten Frontier Conversion Module", waves:[
    {label:"First encounter", ships:[
      {name:"Wakeful Sentry Tower (Argos)", qty:1, hull:"Platform"},
      {name:"Emergent Defender", qty:6, hull:"Frigate", tag:"WEB"},
      {name:"Awakened Defender", qty:6, hull:"Cruiser"},
      {name:"Sleepless Upholder", qty:1, hull:"Battleship", tag:"VAMP", trigger:true},
      {name:"Sleepless Safeguard", qty:1, hull:"Battleship", tag:"SCRAM/WEB/VAMP", note:"Only spawns if a Talocan relic can spawn"}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Defender", qty:5, hull:"Frigate", tag:"WEB"},
      {name:"Awakened Defender", qty:5, hull:"Cruiser"},
      {name:"Sleepless Defender", qty:3, hull:"Battleship", tag:"WEB", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Sleepless Safeguard", qty:4, hull:"Battleship", tag:"SCRAM/WEB/VAMP"}
    ]}
  ]},
  {class:"C4", type:"Relic", name:"Forgotten Frontier Evacuation Center", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Defender", qty:4, hull:"Frigate", tag:"WEB"},
      {name:"Sleepless Preserver", qty:1, hull:"Battleship", tag:"RREP", trigger:true},
      {name:"Sleepless Defender", qty:1, hull:"Battleship", tag:"WEB", note:"Only spawns if a Talocan relic can spawn"}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Defender", qty:4, hull:"Cruiser"},
      {name:"Sleepless Preserver", qty:2, hull:"Battleship", tag:"RREP", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Sleepless Defender", qty:2, hull:"Battleship", tag:"WEB"},
      {name:"Sleepless Preserver", qty:2, hull:"Battleship", tag:"RREP"}
    ]}
  ]},
  {class:"C4", type:"Data", name:"Unsecured Frontier Digital Nexus", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Defender", qty:4, hull:"Frigate", tag:"WEB"},
      {name:"Awakened Defender", qty:6, hull:"Cruiser", trigger:true},
      {name:"Sleepless Safeguard", qty:1, hull:"Battleship", tag:"SCRAM/WEB/VAMP", note:"Only spawns if a Talocan relic can spawn"}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Preserver", qty:4, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Defender", qty:4, hull:"Cruiser"},
      {name:"Sleepless Defender", qty:3, hull:"Battleship", tag:"WEB", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Sleepless Safeguard", qty:4, hull:"Battleship", tag:"SCRAM/WEB/VAMP"}
    ]}
  ]},
  {class:"C4", type:"Data", name:"Unsecured Frontier Trinary Hub", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Defender", qty:4, hull:"Frigate", tag:"WEB"},
      {name:"Sleepless Preserver", qty:1, hull:"Battleship", tag:"RREP", trigger:true},
      {name:"Sleepless Defender", qty:1, hull:"Battleship", tag:"WEB", note:"Only spawns if a Talocan relic can spawn"}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Defender", qty:4, hull:"Cruiser"},
      {name:"Sleepless Preserver", qty:2, hull:"Battleship", tag:"RREP", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Sleepless Defender", qty:2, hull:"Battleship", tag:"WEB"},
      {name:"Sleepless Preserver", qty:2, hull:"Battleship", tag:"RREP"}
    ]}
  ]},
  {class:"C5", type:"Relic", name:"Forgotten Core Data Field", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Sentinel", qty:5, hull:"Frigate", tag:"SCRAM/WEB"},
      {name:"Awakened Keeper", qty:5, hull:"Cruiser", tag:"SCRAM/WEB/VAMP", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Keeper", qty:4, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Emergent Warden", qty:4, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Keeper", qty:3, hull:"Cruiser", tag:"SCRAM/WEB/VAMP", trigger:true},
      {name:"Awakened Sentinel", qty:2, hull:"Cruiser", tag:"WEB"},
      {name:"Awakened Warden", qty:3, hull:"Cruiser", tag:"RREP"}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Warden", qty:6, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Keeper", qty:2, hull:"Battleship", tag:"VAMP", trigger:true},
      {name:"Sleepless Sentinel", qty:2, hull:"Battleship", tag:"SCRAM/WEB/VAMP"}
    ]},
    {label:"Third wave", ships:[
      {name:"Awakened Keeper", qty:2, hull:"Cruiser", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Warden", qty:2, hull:"Cruiser", tag:"RREP"},
      {name:"Sleepless Keeper", qty:2, hull:"Battleship", tag:"VAMP"},
      {name:"Sleepless Warden", qty:2, hull:"Battleship", tag:"RREP"}
    ]}
  ],
  escalation:[
    {name:"Sleepless Guardian", qty:6, hull:"Battleship", tag:"SCRAM/WEB/VAMP", note:"First escalation"},
    {name:"Sleepless Guardian", qty:8, hull:"Battleship", tag:"SCRAM/WEB/VAMP", note:"Second escalation"}
  ],
  escUnverified:true},
  {class:"C5", type:"Relic", name:"Forgotten Core Information Pen", waves:[
    {label:"First encounter", ships:[
      {name:"Sleepless Keeper", qty:3, hull:"Battleship", tag:"VAMP", trigger:true},
      {name:"Sleepless Sentinel", qty:1, hull:"Battleship", tag:"SCRAM/WEB/VAMP", note:"Only spawns if a Talocan relic can spawn"}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Keeper", qty:4, hull:"Frigate", tag:"RREP/VAMP", trigger:"?"},
      {name:"Awakened Warden", qty:4, hull:"Cruiser", tag:"RREP"},
      {name:"Sleepless Keeper", qty:2, hull:"Battleship", tag:"VAMP"}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Keeper", qty:3, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Emergent Warden", qty:3, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Sentinel", qty:3, hull:"Cruiser", tag:"WEB"},
      {name:"Awakened Warden", qty:4, hull:"Cruiser", tag:"RREP", trigger:true},
      {name:"Sleepless Keeper", qty:3, hull:"Battleship", tag:"VAMP"}
    ]},
    {label:"Third wave", ships:[
      {name:"Emergent Warden", qty:4, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Keeper", qty:4, hull:"Cruiser", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Keeper", qty:5, hull:"Battleship", tag:"VAMP"}
    ]}
  ]},
  {class:"C5", type:"Data", name:"Unsecured Frontier Enclave Relay", waves:[
    {label:"First encounter", ships:[
      {name:"Sleepless Keeper", qty:3, hull:"Battleship", tag:"VAMP", trigger:true},
      {name:"Sleepless Sentinel", qty:1, hull:"Battleship", tag:"SCRAM/WEB/VAMP", note:"Only spawns if a Talocan relic can spawn"}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Keeper", qty:5, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Awakened Warden", qty:4, hull:"Cruiser", tag:"RREP"},
      {name:"Sleepless Keeper", qty:"2\u20133", hull:"Battleship", tag:"VAMP", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Keeper", qty:3, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Emergent Warden", qty:4, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Sentinel", qty:3, hull:"Cruiser", tag:"WEB"},
      {name:"Awakened Warden", qty:4, hull:"Cruiser", tag:"RREP"},
      {name:"Sleepless Keeper", qty:2, hull:"Battleship", tag:"VAMP", trigger:true}
    ]},
    {label:"Third wave", ships:[
      {name:"Emergent Warden", qty:3, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Warden", qty:3, hull:"Cruiser", tag:"RREP"},
      {name:"Sleepless Warden", qty:5, hull:"Battleship", tag:"RREP"}
    ]}
  ],
  escalation:[
    {name:"Sleepless Guardian", qty:6, hull:"Battleship", tag:"SCRAM/WEB/VAMP", note:"First escalation"},
    {name:"Sleepless Guardian", qty:8, hull:"Battleship", tag:"SCRAM/WEB/VAMP", note:"Second escalation"}
  ],
  escUnverified:true},
  {class:"C5", type:"Data", name:"Unsecured Frontier Server Bank", waves:[
    {label:"First encounter", ships:[
      {name:"Emergent Sentinel", qty:5, hull:"Frigate", tag:"SCRAM/WEB"},
      {name:"Awakened Keeper", qty:5, hull:"Cruiser", tag:"SCRAM/WEB/VAMP", trigger:true}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Keeper", qty:3, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Emergent Warden", qty:3, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Keeper", qty:4, hull:"Cruiser", tag:"SCRAM/WEB/VAMP", trigger:true},
      {name:"Awakened Sentinel", qty:2, hull:"Cruiser", tag:"WEB"},
      {name:"Awakened Warden", qty:4, hull:"Cruiser", tag:"RREP"}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Warden", qty:5, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Keeper", qty:2, hull:"Battleship", tag:"VAMP", trigger:true},
      {name:"Sleepless Sentinel", qty:1, hull:"Battleship", tag:"SCRAM/WEB/VAMP"}
    ]},
    {label:"Third wave", ships:[
      {name:"Awakened Keeper", qty:2, hull:"Cruiser", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Warden", qty:3, hull:"Cruiser", tag:"RREP"},
      {name:"Sleepless Keeper", qty:2, hull:"Battleship", tag:"VAMP"},
      {name:"Sleepless Warden", qty:2, hull:"Battleship", tag:"RREP"}
    ]}
  ],
  escalation:[
    {name:"Sleepless Guardian", qty:6, hull:"Battleship", tag:"SCRAM/WEB/VAMP", note:"First escalation"},
    {name:"Sleepless Guardian", qty:8, hull:"Battleship", tag:"SCRAM/WEB/VAMP", note:"Second escalation"}
  ],
  escUnverified:true},
  {class:"C6", type:"Relic", name:"Forgotten Core Assembly Hall", waves:[
    {label:"First encounter", ships:[
      {name:"Restless Sentry Tower (Orthrus)", qty:6, hull:"Platform"},
      {name:"Emergent Sentinel", qty:5, hull:"Frigate", tag:"SCRAM/WEB"},
      {name:"Sleepless Keeper", qty:3, hull:"Battleship", tag:"VAMP"},
      {name:"Sleepless Sentinel", qty:3, hull:"Battleship", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Warden", qty:3, hull:"Battleship", tag:"RREP", trigger:true},
      {name:"Sleepless Guardian", qty:1, hull:"Battleship", tag:"SCRAM/WEB/VAMP", note:"Only spawns if a Talocan relic can spawn"}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Keeper", qty:6, hull:"Cruiser", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Keeper", qty:3, hull:"Battleship", tag:"VAMP"},
      {name:"Sleepless Sentinel", qty:2, hull:"Battleship", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Warden", qty:1, hull:"Battleship", tag:"RREP", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Awakened Warden", qty:6, hull:"Cruiser", tag:"RREP"},
      {name:"Sleepless Keeper", qty:3, hull:"Battleship", tag:"VAMP"},
      {name:"Sleepless Sentinel", qty:2, hull:"Battleship", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Warden", qty:2, hull:"Battleship", tag:"RREP", trigger:true}
    ]},
    {label:"Third wave", ships:[
      {name:"Emergent Sentinel", qty:10, hull:"Frigate", tag:"SCRAM/WEB"},
      {name:"Awakened Sentinel", qty:6, hull:"Cruiser", tag:"WEB"},
      {name:"Sleepless Guardian", qty:6, hull:"Battleship", tag:"SCRAM/WEB/VAMP"}
    ]}
  ],
  escalation:[
    {name:"Sleepless Guardian", qty:6, hull:"Battleship", tag:"SCRAM/WEB/VAMP", note:"First escalation"},
    {name:"Sleepless Guardian", qty:8, hull:"Battleship", tag:"SCRAM/WEB/VAMP", note:"Second escalation"}
  ],
  escUnverified:true},
  {class:"C6", type:"Relic", name:"Forgotten Core Circuitry Disassembler", waves:[
    {label:"First encounter", ships:[
      {name:"Wakeful Sentry Tower (Argos)", qty:3, hull:"Platform"},
      {name:"Restless Sentry Tower (Orthrus)", qty:4, hull:"Platform"},
      {name:"Emergent Sentinel", qty:9, hull:"Frigate", tag:"SCRAM/WEB"},
      {name:"Emergent Keeper", qty:9, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Emergent Warden", qty:9, hull:"Frigate", tag:"SCRAM/WEB/VAMP", trigger:true},
      {name:"Sleepless Guardian", qty:1, hull:"Battleship", tag:"SCRAM/WEB/VAMP"}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Warden", qty:4, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Sentinel", qty:7, hull:"Cruiser", tag:"WEB"},
      {name:"Awakened Keeper", qty:7, hull:"Cruiser", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Warden", qty:7, hull:"Cruiser", tag:"RREP", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Sentinel", qty:5, hull:"Frigate", tag:"SCRAM/WEB"},
      {name:"Sleepless Sentinel", qty:3, hull:"Battleship", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Keeper", qty:3, hull:"Battleship", tag:"VAMP"},
      {name:"Sleepless Warden", qty:3, hull:"Battleship", tag:"RREP"},
      {name:"Sleepless Guardian", qty:1, hull:"Battleship", tag:"SCRAM/WEB/VAMP", trigger:true}
    ]},
    {label:"Third wave", ships:[
      {name:"Emergent Sentinel", qty:4, hull:"Frigate", tag:"SCRAM/WEB"},
      {name:"Emergent Keeper", qty:4, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Awakened Sentinel", qty:4, hull:"Cruiser", tag:"WEB"},
      {name:"Awakened Keeper", qty:4, hull:"Cruiser", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Warden", qty:4, hull:"Cruiser", tag:"RREP"},
      {name:"Sleepless Sentinel", qty:2, hull:"Battleship", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Keeper", qty:2, hull:"Battleship", tag:"VAMP"},
      {name:"Sleepless Warden", qty:2, hull:"Battleship", tag:"RREP"},
      {name:"Sleepless Guardian", qty:3, hull:"Battleship", tag:"SCRAM/WEB/VAMP"}
    ]}
  ],
  escalation:[
    {name:"Sleepless Warden", qty:6, hull:"Battleship", tag:"RREP", note:"First escalation"},
    {name:"Sleepless Warden", qty:8, hull:"Battleship", tag:"RREP", note:"Second escalation"}
  ],
  escUnverified:true},
  {class:"C6", type:"Data", name:"Unsecured Core Backup Array", waves:[
    {label:"First encounter", ships:[
      {name:"Wakeful Sentry Tower (Argos)", qty:3, hull:"Platform"},
      {name:"Restless Sentry Tower (Orthrus)", qty:3, hull:"Platform"},
      {name:"Emergent Sentinel", qty:10, hull:"Frigate", tag:"SCRAM/WEB"},
      {name:"Sleepless Keeper", qty:3, hull:"Battleship", tag:"VAMP"},
      {name:"Sleepless Sentinel", qty:2, hull:"Battleship", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Warden", qty:2, hull:"Battleship", tag:"RREP", trigger:true},
      {name:"Sleepless Guardian", qty:1, hull:"Battleship", tag:"SCRAM/WEB/VAMP", note:"Only spawns if a Talocan relic can spawn"}
    ]},
    {label:"First wave", ships:[
      {name:"Awakened Keeper", qty:6, hull:"Cruiser", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Sentinel", qty:3, hull:"Battleship", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Keeper", qty:3, hull:"Battleship", tag:"VAMP"},
      {name:"Sleepless Warden", qty:2, hull:"Battleship", tag:"RREP", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Awakened Warden", qty:4, hull:"Cruiser", tag:"RREP"},
      {name:"Sleepless Sentinel", qty:3, hull:"Battleship", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Keeper", qty:3, hull:"Battleship", tag:"VAMP"},
      {name:"Sleepless Warden", qty:3, hull:"Battleship", tag:"RREP", trigger:true}
    ]},
    {label:"Third wave", ships:[
      {name:"Emergent Sentinel", qty:10, hull:"Frigate", tag:"SCRAM/WEB"},
      {name:"Awakened Sentinel", qty:8, hull:"Cruiser", tag:"WEB"},
      {name:"Sleepless Guardian", qty:6, hull:"Battleship", tag:"SCRAM/WEB/VAMP"}
    ]}
  ],
  escalation:[
    {name:"Sleepless Warden", qty:6, hull:"Battleship", tag:"RREP", note:"First escalation"},
    {name:"Sleepless Warden", qty:8, hull:"Battleship", tag:"RREP", note:"Second escalation"}
  ],
  escUnverified:true},
  {class:"C6", type:"Data", name:"Unsecured Core Emergence", waves:[
    {label:"First encounter", ships:[
      {name:"Wakeful Sentry Tower (Argos)", qty:4, hull:"Platform"},
      {name:"Restless Sentry Tower (Orthrus)", qty:4, hull:"Platform"},
      {name:"Emergent Sentinel", qty:9, hull:"Frigate", tag:"SCRAM/WEB"},
      {name:"Emergent Keeper", qty:9, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Emergent Warden", qty:9, hull:"Frigate", tag:"SCRAM/WEB/VAMP", trigger:true},
      {name:"Sleepless Guardian", qty:1, hull:"Battleship", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Guardian", qty:1, hull:"Battleship", tag:"SCRAM/WEB/VAMP", note:"Only spawns if a Talocan relic can spawn"}
    ]},
    {label:"First wave", ships:[
      {name:"Emergent Warden", qty:4, hull:"Frigate", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Sentinel", qty:7, hull:"Cruiser", tag:"WEB"},
      {name:"Awakened Keeper", qty:7, hull:"Cruiser", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Warden", qty:7, hull:"Cruiser", tag:"RREP", trigger:true}
    ]},
    {label:"Second wave", ships:[
      {name:"Emergent Sentinel", qty:5, hull:"Frigate", tag:"SCRAM/WEB"},
      {name:"Sleepless Sentinel", qty:3, hull:"Battleship", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Keeper", qty:3, hull:"Battleship", tag:"VAMP"},
      {name:"Sleepless Warden", qty:3, hull:"Battleship", tag:"RREP"},
      {name:"Sleepless Guardian", qty:1, hull:"Battleship", tag:"SCRAM/WEB/VAMP", trigger:true}
    ]},
    {label:"Third wave", ships:[
      {name:"Emergent Sentinel", qty:4, hull:"Frigate", tag:"SCRAM/WEB"},
      {name:"Emergent Keeper", qty:4, hull:"Frigate", tag:"RREP/VAMP"},
      {name:"Awakened Sentinel", qty:4, hull:"Cruiser", tag:"WEB"},
      {name:"Awakened Keeper", qty:4, hull:"Cruiser", tag:"SCRAM/WEB/VAMP"},
      {name:"Awakened Warden", qty:4, hull:"Cruiser", tag:"RREP"},
      {name:"Sleepless Sentinel", qty:2, hull:"Battleship", tag:"SCRAM/WEB/VAMP"},
      {name:"Sleepless Keeper", qty:2, hull:"Battleship", tag:"VAMP"},
      {name:"Sleepless Warden", qty:2, hull:"Battleship", tag:"RREP"}
    ]}
  ],
  escalation:[
    {name:"Sleepless Warden", qty:6, hull:"Battleship", tag:"RREP", note:"First escalation"},
    {name:"Sleepless Warden", qty:8, hull:"Battleship", tag:"RREP", note:"Second escalation"}
  ],
  escUnverified:true}
];

const gasSites = [
  {classRange:"C1–C4", name:"Barren Perimeter Reservoir", clouds:[
    {gas:"Fullerite-C60", units:6000}, {gas:"Fullerite-C50", units:12000}
  ], guards:[
    {name:"Emergent Patroller", qty:3, hull:"Frigate"},
    {name:"Emergent Watchman", qty:2, hull:"Frigate", tag:"VAMP"}
  ]},
  {classRange:"C1–C4", name:"Minor Perimeter Reservoir", clouds:[
    {gas:"Fullerite-C72", units:6000}, {gas:"Fullerite-C70", units:12000}
  ], guards:[
    {name:"Awakened Patroller", qty:2, hull:"Cruiser"}
  ]},
  {classRange:"C1–C4", name:"Ordinary Perimeter Reservoir", clouds:[
    {gas:"Fullerite-C84", units:6000}, {gas:"Fullerite-C72", units:12000}
  ], guards:[
    {name:"Emergent Patroller", qty:3, hull:"Frigate"},
    {name:"Emergent Watchman", qty:3, hull:"Frigate", tag:"VAMP"}
  ]},
  {classRange:"C1–C4", name:"Sizable Perimeter Reservoir", clouds:[
    {gas:"Fullerite-C50", units:6000}, {gas:"Fullerite-C84", units:12000}
  ], guards:[
    {name:"Emergent Patroller", qty:3, hull:"Frigate"},
    {name:"Emergent Watchman", qty:3, hull:"Frigate", tag:"VAMP"}
  ]},
  {classRange:"C1–C4", name:"Token Perimeter Reservoir", clouds:[
    {gas:"Fullerite-C70", units:6000}, {gas:"Fullerite-C60", units:12000}
  ], guards:[
    {name:"Emergent Escort", qty:2, hull:"Frigate", tag:"WEB"},
    {name:"Awakened Watchman", qty:1, hull:"Cruiser", tag:"VAMP"}
  ]},
  {classRange:"C3–C6", name:"Bountiful Frontier Reservoir", clouds:[
    {gas:"Fullerite-C32", units:4000}, {gas:"Fullerite-C28", units:20000}
  ], guards:[
    {name:"Emergent Defender", qty:6, hull:"Frigate", tag:"WEB"},
    {name:"Awakened Defender", qty:4, hull:"Cruiser"}
  ]},
  {classRange:"C3–C6", name:"Vast Frontier Reservoir", clouds:[
    {gas:"Fullerite-C28", units:4000}, {gas:"Fullerite-C32", units:20000}
  ], guards:[
    {name:"Awakened Defender", qty:4, hull:"Cruiser"},
    {name:"Awakened Upholder", qty:4, hull:"Cruiser", tag:"WEB/VAMP"}
  ]},
  {classRange:"C5–C6", name:"Instrumental Core Reservoir", clouds:[
    {gas:"Fullerite-C320", units:24000}, {gas:"Fullerite-C540", units:2000}
  ], guards:[
    {name:"Sleepless Sentinel", qty:4, hull:"Battleship", tag:"SCRAM/WEB/VAMP"}
  ]},
  {classRange:"C5–C6", name:"Vital Core Reservoir", clouds:[
    {gas:"Fullerite-C320", units:2000}, {gas:"Fullerite-C540", units:24000}
  ], guards:[
    {name:"Emergent Keeper", qty:4, hull:"Frigate", tag:"RREP/VAMP"},
    {name:"Sleepless Keeper", qty:4, hull:"Battleship", tag:"VAMP"}
  ]}
];

const oreSites = [
  {classRange:"C1–C6", group:"Perimeter", name:"Common Perimeter Deposit", ores:[
    {ore:"Arkonor", qty:1, units:20000, cargo:320000},
    {ore:"Bistot", qty:1, units:30000, cargo:480000},
    {ore:"Gneiss", qty:1, units:40000, cargo:200000},
    {ore:"Kernite", qty:1, units:300000, cargo:360000},
    {ore:"Omber", qty:1, units:300000, cargo:180000},
    {ore:"Pyroxeres", qty:2, units:520000, cargo:156000}
  ], guards:[{name:"Emergent Patroller", qty:5, hull:"Frigate"}]},
  {classRange:"C1–C6", group:"Perimeter", name:"Ordinary Perimeter Deposit", ores:[
    {ore:"Arkonor", qty:1, units:1000, cargo:160000},
    {ore:"Bistot", qty:1, units:20000, cargo:320000},
    {ore:"Gneiss", qty:1, units:20000, cargo:100000},
    {ore:"Kernite", qty:4, units:200000, cargo:240000},
    {ore:"Omber", qty:4, units:200000, cargo:120000},
    {ore:"Pyroxeres", qty:13, units:1620000, cargo:486000}
  ], guards:[
    {name:"Emergent Patroller", qty:3, hull:"Frigate"},
    {name:"Emergent Watchman", qty:2, hull:"Frigate", tag:"VAMP"}
  ]},
  {classRange:"C1–C6", group:"Frontier", name:"Average Frontier Deposit", ores:[
    {ore:"Arkonor", qty:3, units:30000, cargo:480000},
    {ore:"Bistot", qty:3, units:39999, cargo:639984},
    {ore:"Gneiss", qty:6, units:450000, cargo:2250000},
    {ore:"Kernite", qty:20, units:300000, cargo:360000},
    {ore:"Omber", qty:15, units:300000, cargo:180000},
    {ore:"Pyroxeres", qty:3, units:700000, cargo:210000}
  ], guards:[
    {name:"Emergent Patroller", qty:3, hull:"Frigate"},
    {name:"Awakened Patroller", qty:2, hull:"Cruiser"}
  ]},
  {classRange:"C1–C6", group:"Frontier", name:"Unexceptional Frontier Deposit", ores:[
    {ore:"Arkonor", qty:1, units:30000, cargo:480000},
    {ore:"Bistot", qty:1, units:50000, cargo:800000},
    {ore:"Gneiss", qty:1, units:60000, cargo:300000},
    {ore:"Kernite", qty:1, units:400000, cargo:480000},
    {ore:"Omber", qty:1, units:400000, cargo:240000}
  ], guards:[
    {name:"Emergent Escort", qty:1, hull:"Frigate", tag:"WEB"},
    {name:"Emergent Patroller", qty:2, hull:"Frigate"},
    {name:"Emergent Watchman", qty:2, hull:"Frigate", tag:"VAMP"}
  ]},
  {classRange:"C5–C6", group:"Core", name:"Exceptional Core Deposit", ores:[
    {ore:"Arkonor", qty:4, units:80000, cargo:1280000},
    {ore:"Bistot", qty:5, units:120000, cargo:1920000},
    {ore:"Gneiss", qty:6, units:160000, cargo:800000},
    {ore:"Kernite", qty:12, units:1000000, cargo:1200000},
    {ore:"Omber", qty:12, units:1000000, cargo:600000},
    {ore:"Pyroxeres", qty:10, units:1530000, cargo:459000}
  ], guards:[{name:"Sleepless Sentinel", qty:1, hull:"Battleship", tag:"SCRAM/WEB/VAMP"}]},
  {classRange:"C5–C6", group:"Core", name:"Infrequent Core Deposit", ores:[
    {ore:"Arkonor", qty:2, units:25000, cargo:400000},
    {ore:"Bistot", qty:3, units:35000, cargo:560000},
    {ore:"Gneiss", qty:4, units:45000, cargo:225000},
    {ore:"Kernite", qty:11, units:400000, cargo:480000},
    {ore:"Omber", qty:10, units:400000, cargo:240000},
    {ore:"Pyroxeres", qty:11, units:868000, cargo:260400}
  ], guards:[{name:"Awakened Defender", qty:2, hull:"Cruiser"}]},
  {classRange:"C5–C6", group:"Core", name:"Isolated Core Deposit", ores:[
    {ore:"Arkonor", qty:6, units:36000, cargo:576000},
    {ore:"Bistot", qty:6, units:48000, cargo:768000},
    {ore:"Gneiss", qty:6, units:72000, cargo:360000},
    {ore:"Kernite", qty:6, units:720000, cargo:864000},
    {ore:"Omber", qty:6, units:720000, cargo:432000}
  ], guards:[
    {name:"Awakened Watchman", qty:1, hull:"Cruiser", tag:"VAMP"},
    {name:"Emergent Patroller", qty:2, hull:"Frigate"}
  ]},
  {classRange:"C5–C6", group:"Core", name:"Rarified Core Deposit", ores:[
    {ore:"Arkonor", qty:1, units:50000, cargo:800000},
    {ore:"Bistot", qty:1, units:80000, cargo:1280000},
    {ore:"Crokite", qty:1, units:80000, cargo:1280000},
    {ore:"Dark Ochre", qty:1, units:100000, cargo:800000},
    {ore:"Gneiss", qty:1, units:100000, cargo:500000},
    {ore:"Hedbergite", qty:2, units:200000, cargo:600000},
    {ore:"Hemorphite", qty:3, units:300000, cargo:900000},
    {ore:"Jaspet", qty:4, units:500000, cargo:1000000},
    {ore:"Kernite", qty:4, units:600000, cargo:720000},
    {ore:"Mercoxit", qty:1, units:15000, cargo:600000},
    {ore:"Omber", qty:3, units:500000, cargo:300000},
    {ore:"Pyroxeres", qty:6, units:480000, cargo:144000},
    {ore:"Spodumain", qty:1, units:200000, cargo:3200000}
  ], guards:[
    {name:"Sleepless Sentinel", qty:1, hull:"Battleship", tag:"SCRAM/WEB/VAMP"},
    {name:"Awakened Sentinel", qty:2, hull:"Cruiser", tag:"WEB"}
  ]},
  {classRange:"C5–C6", group:"Core", name:"Uncommon Core Deposit", ores:[
    {ore:"Arkonor", qty:4, units:40000, cargo:640000},
    {ore:"Bistot", qty:6, units:60000, cargo:960000},
    {ore:"Gneiss", qty:1, units:70000, cargo:350000},
    {ore:"Kernite", qty:7, units:590000, cargo:708000},
    {ore:"Omber", qty:5, units:600000, cargo:360000},
    {ore:"Pyroxeres", qty:5, units:500000, cargo:150000}
  ], guards:[
    {name:"Awakened Escort", qty:1, hull:"Cruiser"},
    {name:"Emergent Watchman", qty:2, hull:"Frigate", tag:"VAMP"}
  ]},
  {classRange:"C5–C6", group:"Core", name:"Unusual Core Deposit", ores:[
    {ore:"Arkonor", qty:1, units:35000, cargo:560000},
    {ore:"Bistot", qty:1, units:50000, cargo:800000},
    {ore:"Gneiss", qty:1, units:60000, cargo:300000},
    {ore:"Kernite", qty:4, units:400000, cargo:480000},
    {ore:"Omber", qty:3, units:400000, cargo:240000}
  ], guards:[{name:"Awakened Patroller", qty:2, hull:"Cruiser"}]}
];

const shatteredSites = [
  {classRange:"Shattered", group:"Shattered systems only", kind:"Ore", name:"Shattered Debris Field", ores:[
    {ore:"Arkonor", qty:4, units:250000, cargo:4000000},
    {ore:"Bistot", qty:7, units:460000, cargo:7360000},
    {ore:"Gneiss", qty:3, units:200000, cargo:1000000},
    {ore:"Kernite (Fiery)", qty:1, units:21344, cargo:25612},
    {ore:"Kernite (Luminous)", qty:7, units:159218, cargo:191058},
    {ore:"Kernite", qty:10, units:203168, cargo:243798},
    {ore:"Pyroxeres (Viscous)", qty:3, units:236952, cargo:71084},
    {ore:"Pyroxeres (Solid)", qty:3, units:230394, cargo:69117},
    {ore:"Pyroxeres", qty:16, units:1163934, cargo:349174}
  ], guards:[
    {name:"Emergent Defender", qty:2, hull:"Frigate", tag:"WEB"},
    {name:"Awakened Defender", qty:1, hull:"Cruiser"}
  ]},
  {classRange:"Shattered", group:"Shattered systems only", kind:"Ice", minOrders:3, name:"Shattered Ice Field", ores:[
    {ore:"Thick Blue Ice", qty:22, units:6868, cargo:6868000},
    {ore:"Enriched Clear Icicle", qty:22, units:6868, cargo:6868000},
    {ore:"Dark Glitter", qty:27, units:10802, cargo:10802000, verify:true},
    {ore:"Gelidus", qty:23, units:2756, cargo:2756000},
    {ore:"Smooth Glacial Mass", qty:21, units:6456, cargo:6456000},
    {ore:"Glare Crust", qty:45, units:4080, cargo:4080000},
    {ore:"Krystallos", qty:26, units:2620, cargo:2620000, verify:true},
    {ore:"Pristine White Glaze", qty:20, units:6200, cargo:6200000}
  ], guards:[
    {name:"Emergent Defender", qty:2, hull:"Frigate", tag:"WEB"},
    {name:"Awakened Defender", qty:1, hull:"Cruiser"}
  ]}
];

/* ---------------- search index ---------------- */
function shipText(s){ return [s.name, s.hull, s.tag||''].join(' '); }
function buildSearch(site){
  const parts = [site.name];
  if(site.waves) site.waves.forEach(w=>w.ships.forEach(s=>parts.push(shipText(s))));
  if(site.escalation) site.escalation.forEach(s=>parts.push(shipText(s)));
  if(site.clouds) site.clouds.forEach(c=>parts.push(c.gas));
  if(site.guards) site.guards.forEach(s=>parts.push(shipText(s)));
  if(site.ores) site.ores.forEach(o=>parts.push(o.ore));
  return parts.join(' ').toLowerCase();
}
[...combatSites, ...dataRelicSites, ...gasSites, ...oreSites, ...shatteredSites].forEach(s => s._search = buildSearch(s));
document.getElementById('totalCount').textContent = combatSites.length + dataRelicSites.length + gasSites.length + oreSites.length + shatteredSites.length;

/* ---------------- render helpers ---------------- */
function shipRow(s){
  return `<li class="ship-row${s.trigger?' is-trigger':''}">
    <span class="ship-name">${s.name}</span>
    <span class="ship-qty">×${s.qty}</span>
    <span class="ship-hull">${s.hull}</span>
    ${s.tag?`<span class="ship-tag">${s.tag}</span>`:''}
    ${s.trigger?`<span class="trigger-flag">${s.trigger==='?'?'trigger?':'trigger'}</span>`:''}
    ${s.note?`<span class="ship-note">${s.note}</span>`:''}
  </li>`;
}

/* ---------------- prices ---------------- */
// Fallback used if prices.json can't be loaded (e.g. file opened locally).
// When hosted, prices.json is fetched and replaces this.
let PRICES = /*FALLBACK_START*/{"updated":"2026-11-10T05:06:19Z","hubs":{"jita":{"label":"Jita","items":{"Fullerite-C28":{"sell":14620,"orders":42},"Fullerite-C32":{"sell":21600,"orders":64},"Fullerite-C50":{"sell":7396.34,"orders":24},"Fullerite-C60":{"sell":8466.88,"orders":29},"Fullerite-C70":{"sell":10180.21,"orders":80},"Fullerite-C72":{"sell":6963.34,"orders":45},"Fullerite-C84":{"sell":9117.94,"orders":30},"Fullerite-C320":{"sell":38946.82,"orders":43},"Fullerite-C540":{"sell":53422.83,"orders":60},"Arkonor":{"sell":3085.51,"orders":26},"Bistot":{"sell":2324.97,"orders":9},"Crokite":{"sell":5000,"orders":4},"Dark Ochre":{"sell":4300,"orders":1},"Gneiss":{"sell":2238.37,"orders":6},"Hedbergite":{"sell":608.89,"orders":2},"Hemorphite":{"sell":1059,"orders":30},"Jaspet":{"sell":600.68,"orders":19},"Kernite":{"sell":591.58,"orders":77},"Mercoxit":{"sell":26674.56,"orders":5},"Omber":{"sell":188.57,"orders":73},"Pyroxeres":{"sell":35,"orders":12},"Spodumain":{"sell":9998,"orders":16},"Kernite (Luminous)":{"sell":494.7,"orders":3},"Kernite (Fiery)":{"sell":495.48,"orders":5},"Pyroxeres (Solid)":{"sell":29.95,"orders":12},"Pyroxeres (Viscous)":{"sell":31.6,"orders":13},"Thick Blue Ice":{"sell":null,"orders":0},"Enriched Clear Icicle":{"sell":null,"orders":0},"Dark Glitter":{"sell":700000,"orders":1},"Gelidus":{"sell":1499000,"orders":1},"Smooth Glacial Mass":{"sell":null,"orders":0},"Glare Crust":{"sell":null,"orders":0},"Krystallos":{"sell":800000,"orders":1},"Pristine White Glaze":{"sell":null,"orders":0}}},"amarr":{"label":"Amarr","items":{"Fullerite-C28":{"sell":12796.01,"orders":11},"Fullerite-C32":{"sell":19866.8,"orders":17},"Fullerite-C50":{"sell":5900,"orders":3},"Fullerite-C60":{"sell":8400,"orders":2},"Fullerite-C70":{"sell":8881,"orders":13},"Fullerite-C72":{"sell":6708,"orders":27},"Fullerite-C84":{"sell":8198,"orders":23},"Fullerite-C320":{"sell":37931.08,"orders":26},"Fullerite-C540":{"sell":54753.76,"orders":13},"Arkonor":{"sell":4000,"orders":3},"Bistot":{"sell":3849,"orders":1},"Crokite":{"sell":7717.84,"orders":2},"Dark Ochre":{"sell":3941.75,"orders":2},"Gneiss":{"sell":null,"orders":0},"Hedbergite":{"sell":840,"orders":3},"Hemorphite":{"sell":890,"orders":6},"Jaspet":{"sell":458,"orders":2},"Kernite":{"sell":439.15,"orders":64},"Mercoxit":{"sell":24410,"orders":1},"Omber":{"sell":199.89,"orders":30},"Pyroxeres":{"sell":24,"orders":6},"Spodumain":{"sell":11620,"orders":3},"Kernite (Luminous)":{"sell":135.6,"orders":5},"Kernite (Fiery)":{"sell":224.99,"orders":6},"Pyroxeres (Solid)":{"sell":30.14,"orders":4},"Pyroxeres (Viscous)":{"sell":25.88,"orders":5},"Thick Blue Ice":{"sell":null,"orders":0},"Enriched Clear Icicle":{"sell":null,"orders":0},"Dark Glitter":{"sell":198000,"orders":7},"Gelidus":{"sell":null,"orders":0},"Smooth Glacial Mass":{"sell":null,"orders":0},"Glare Crust":{"sell":250000,"orders":6},"Krystallos":{"sell":null,"orders":0},"Pristine White Glaze":{"sell":null,"orders":0}}},"dodixie":{"label":"Dodixie","items":{"Fullerite-C28":{"sell":13302,"orders":11},"Fullerite-C32":{"sell":20701.12,"orders":9},"Fullerite-C50":{"sell":null,"orders":0},"Fullerite-C60":{"sell":8322.28,"orders":5},"Fullerite-C70":{"sell":9419.27,"orders":8},"Fullerite-C72":{"sell":6123.39,"orders":27},"Fullerite-C84":{"sell":8862.87,"orders":27},"Fullerite-C320":{"sell":36180,"orders":2},"Fullerite-C540":{"sell":58722.15,"orders":5},"Arkonor":{"sell":3679,"orders":3},"Bistot":{"sell":null,"orders":0},"Crokite":{"sell":6100,"orders":3},"Dark Ochre":{"sell":4000,"orders":1},"Gneiss":{"sell":2000,"orders":2},"Hedbergite":{"sell":1000,"orders":2},"Hemorphite":{"sell":1334,"orders":4},"Jaspet":{"sell":343.38,"orders":4},"Kernite":{"sell":569.48,"orders":36},"Mercoxit":{"sell":null,"orders":0},"Omber":{"sell":1.02,"orders":35},"Pyroxeres":{"sell":49.99,"orders":2},"Spodumain":{"sell":null,"orders":0},"Kernite (Luminous)":{"sell":null,"orders":0},"Kernite (Fiery)":{"sell":500.1,"orders":1},"Pyroxeres (Solid)":{"sell":60,"orders":1},"Pyroxeres (Viscous)":{"sell":23,"orders":2},"Thick Blue Ice":{"sell":null,"orders":0},"Enriched Clear Icicle":{"sell":null,"orders":0},"Dark Glitter":{"sell":null,"orders":0},"Gelidus":{"sell":null,"orders":0},"Smooth Glacial Mass":{"sell":null,"orders":0},"Glare Crust":{"sell":500000,"orders":2},"Krystallos":{"sell":null,"orders":0},"Pristine White Glaze":{"sell":null,"orders":0}}},"hek":{"label":"Hek","items":{"Fullerite-C28":{"sell":12912.92,"orders":12},"Fullerite-C32":{"sell":19570.86,"orders":8},"Fullerite-C50":{"sell":null,"orders":0},"Fullerite-C60":{"sell":4005.06,"orders":4},"Fullerite-C70":{"sell":8250,"orders":2},"Fullerite-C72":{"sell":5000,"orders":20},"Fullerite-C84":{"sell":8168.88,"orders":24},"Fullerite-C320":{"sell":37000,"orders":3},"Fullerite-C540":{"sell":56659.86,"orders":5},"Arkonor":{"sell":2490,"orders":5},"Bistot":{"sell":1750,"orders":2},"Crokite":{"sell":3500,"orders":1},"Dark Ochre":{"sell":null,"orders":0},"Gneiss":{"sell":1390,"orders":3},"Hedbergite":{"sell":null,"orders":0},"Hemorphite":{"sell":2160,"orders":5},"Jaspet":{"sell":395,"orders":2},"Kernite":{"sell":579.89,"orders":62},"Mercoxit":{"sell":19000,"orders":2},"Omber":{"sell":84.76,"orders":38},"Pyroxeres":{"sell":18,"orders":5},"Spodumain":{"sell":null,"orders":0},"Kernite (Luminous)":{"sell":160.86,"orders":3},"Kernite (Fiery)":{"sell":156,"orders":4},"Pyroxeres (Solid)":{"sell":null,"orders":0},"Pyroxeres (Viscous)":{"sell":null,"orders":0},"Thick Blue Ice":{"sell":null,"orders":0},"Enriched Clear Icicle":{"sell":null,"orders":0},"Dark Glitter":{"sell":null,"orders":0},"Gelidus":{"sell":400000,"orders":1},"Smooth Glacial Mass":{"sell":null,"orders":0},"Glare Crust":{"sell":300000,"orders":3},"Krystallos":{"sell":460000,"orders":2},"Pristine White Glaze":{"sell":null,"orders":0}}}}}/*FALLBACK_END*/;

const HUB_ORDER = ['jita','amarr','dodixie','hek'];
let currentHub = 'jita';
try{ const saved = localStorage.getItem('wh-market'); if(saved && HUB_ORDER.includes(saved)) currentHub = saved; }catch(e){}

function hubData(h){ return PRICES.hubs && PRICES.hubs[h]; }
const HUB_LABELS = {jita:'Jita', amarr:'Amarr', dodixie:'Dodixie', hek:'Hek'};
function hubLabel(h){ return HUB_LABELS[h||currentHub] || ''; }
function priceOf(name, hub){
  const d = hubData(hub||currentHub);
  const it = d && d.items && d.items[name];
  return it && typeof it.sell === 'number' ? it.sell : null;
}
// A price is flagged if it rests on very few orders, or sits far from the other hubs.
function priceFlag(name){
  const d = hubData(currentHub);
  const it = d && d.items && d.items[name];
  if(!it || typeof it.sell !== 'number') return null;
  if(it.orders < 3) return 'few orders';
  const others = HUB_ORDER.filter(h=>h!==currentHub).map(h=>priceOf(name,h)).filter(p=>p!==null).sort((a,b)=>a-b);
  if(others.length >= 2){
    const mid = others.length%2 ? others[(others.length-1)/2] : (others[others.length/2-1]+others[others.length/2])/2;
    const ratio = it.sell/mid;
    if(ratio > 3 || ratio < 1/3) return 'far from other hubs';
  }
  return null;
}
function fmtPrice(p){
  if(p===null) return '–';
  if(p<100) return p.toFixed(2);
  return Math.round(p).toLocaleString('en-US');
}
function fmtIsk(n){
  if(n>=1e9) return (n/1e9).toFixed(2)+' B';
  if(n>=1e6) return (n/1e6).toFixed(1)+' M';
  if(n>=1e3) return Math.round(n/1e3)+' k';
  return Math.round(n).toString();
}

// Some sites (the shattered ice field) only count prices backed by enough sell orders,
// because the ice items trade so thinly that a single odd order would swing the estimate.
function priceUsable(site, name){
  const p = priceOf(name);
  if(p===null) return null;
  if(site.minOrders){
    const d = hubData(currentHub), it = d && d.items && d.items[name];
    if(!it || it.orders < site.minOrders) return null;
  }
  return p;
}

// Estimated value of one gas or ore site: units × sell price at the chosen hub.
function siteValue(site){
  let total = 0, cargo = 0;
  const missing = [], flagged = [];
  const rows = site.clouds ? site.clouds.map(c=>({name:c.gas, units:c.units}))
                           : site.ores.map(o=>({name:o.ore, units:o.units, cargo:o.cargo}));
  rows.forEach(r=>{
    const p = priceUsable(site, r.name);
    if(p===null){ missing.push({name:r.name, reason: priceOf(r.name)===null ? 'none' : 'thin'}); return; }
    total += r.units * p;
    if(r.cargo) cargo += r.cargo;
    if(priceFlag(r.name)) flagged.push(r.name);
  });
  const perM3 = (site.ores && cargo>0) ? total/cargo : null;
  return {total, perM3, missing, flagged, partial: missing.length>0, priced: rows.length-missing.length, count: rows.length};
}

// "A, B (no Hek sell orders); C (too few Hek sell orders)"
function missingText(missing){
  const hub = esc(hubLabel());
  const parts = [];
  const none = missing.filter(m=>m.reason==='none').map(m=>esc(m.name));
  const thin = missing.filter(m=>m.reason==='thin').map(m=>esc(m.name));
  if(none.length) parts.push(`${none.join(', ')} (no ${hub} sell orders)`);
  if(thin.length) parts.push(`${thin.join(', ')} (too few ${hub} sell orders)`);
  return parts.join('; ');
}

function valueStrip(site){
  const v = siteValue(site);
  return `<div class="value-strip">
    <span class="value-main">${v.partial?'≥':'≈'} ${fmtIsk(v.total)} <small>ISK${v.partial?` · partial, ${v.priced} of ${v.count} priced`:''}</small></span>
    ${v.perM3!==null?`<span class="value-sub">${Math.round(v.perM3).toLocaleString('en-US')} ISK per m³${v.partial?' (priced items only)':''}</span>`:''}
    ${v.missing.length?`<span class="value-miss">Not counted: ${missingText(v.missing)}</span>`:''}
    ${v.flagged.length?`<span class="value-flag"><span class="star">*</span> Thin or unusual price: ${v.flagged.map(esc).join(', ')}</span>`:''}
  </div>`;
}

function updatePriceStamp(){
  document.getElementById('hubLabel').textContent = hubLabel();
  document.getElementById('hubNote').textContent = hubLabel();
  const d = new Date(PRICES.updated);
  const el = document.getElementById('priceDate');
  const stamp = document.getElementById('priceStamp');
  if(isNaN(d)){ el.textContent = 'date unknown'; return; }
  const txt = d.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'})
            + ', ' + d.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'UTC'}) + ' UTC';
  const ageDays = (Date.now()-d.getTime())/86400000;
  const stale = ageDays > 3;
  el.textContent = 'updated ' + txt + (stale ? ' · may be out of date' : '');
  stamp.classList.toggle('stale', stale);
}

function waveCard(site, accent, classLabel){
  return `<article class="site-card" style="--accent:${accent};--accent-dim:${accent==='var(--combat)'?'var(--combat-dim)':accent==='var(--datarelic)'?'var(--datarelic-dim)':accent}">
    <div class="site-card-head">
      <span class="class-badge">${classLabel}</span>
      <h3>${site.name}</h3>
      ${site.type?`<span class="type-badge">${site.type}</span>`:''}
    </div>
    <div class="wave-list">
      ${site.waves.map(w=>`<div class="wave">
        <p class="wave-label">${w.label}</p>
        <ul class="ship-list">${w.ships.map(shipRow).join('')}</ul>
      </div>`).join('')}
    </div>
    ${site.escalation?`<details class="escalation">
      <summary><span class="esc-pill">Optional</span>Capital escalation</summary>
      <div class="esc-body">
        ${site.escUnverified?`<p class="esc-unverified"><b>Unverified.</b> This escalation comes from older sources and may no longer exist in the game.</p>`:''}
        <p class="esc-intro">Only spawns if a capital ship warps into the site.</p>
        <ul class="ship-list">${site.escalation.map(shipRow).join('')}</ul>
      </div>
    </details>`:''}
  </article>`;
}

function gasCard(site){
  return `<article class="site-card" style="--accent:var(--gas);--accent-dim:var(--gas-dim)">
    <div class="site-card-head">
      <span class="class-badge">${site.classRange}</span>
      <h3>${site.name}</h3>
    </div>
    ${valueStrip(site)}
    <div class="cloud-list">
      ${site.clouds.map(c=>{
        const p = priceOf(c.gas);
        return `<div class="cloud-row"><span class="cloud-name">${c.gas}</span><span class="cloud-meta">${fmt(c.units)} units<i>${p===null?'no price':`${fmtPrice(p)} ISK each${priceFlag(c.gas)?'<span class="star">*</span>':''}`}</i></span></div>`;
      }).join('')}
    </div>
    ${site.flagged?`<p class="flag-note">Source flags this guard list as out of date. Verify before relying on it.</p>`:''}
    <div class="guard-list">
      <p class="wave-label">Guards</p>
      <ul class="ship-list">${site.guards.map(shipRow).join('')}</ul>
    </div>
  </article>`;
}

function oreCard(site){
  return `<article class="site-card" style="--accent:var(--ore);--accent-dim:var(--ore-dim)">
    <div class="site-card-head">
      <span class="class-badge">${site.classRange}</span>
      <h3>${site.name}</h3>
    </div>
    ${valueStrip(site)}
    <div class="ore-table">
      <div class="ore-table-head priced"><span>Ore</span><span>Units</span><span>Cargo m³</span><span>Value</span></div>
      ${site.ores.map(o=>{
        const p = priceOf(o.ore);
        return `<div class="ore-row priced"><span>${o.ore}${o.qty>1?` ×${o.qty}`:''}</span><span>${fmt(o.units)}</span><span>${fmt(o.cargo)}</span>${p===null?`<span class="nodata">no price</span>`:`<span>${fmtIsk(o.units*p)}${priceFlag(o.ore)?'<span class="star">*</span>':''}</span>`}</div>`;
      }).join('')}
    </div>
    <div class="guard-list">
      <p class="wave-label">Guards</p>
      <ul class="ship-list">${site.guards.map(shipRow).join('')}</ul>
    </div>
  </article>`;
}

function shatteredCard(site){
  const isIce = site.kind==='Ice';
  const anyPrice = site.ores.some(o=>priceUsable(site,o.ore)!==null);
  return `<article class="site-card" style="--accent:var(--shattered);--accent-dim:var(--shattered-dim)">
    <div class="site-card-head">
      <span class="class-badge">${site.classRange}</span>
      <h3>${site.name}</h3>
      <span class="type-badge">${site.kind}</span>
    </div>
    ${anyPrice?valueStrip(site):`<p class="no-price-note">Ice sells too thinly at ${esc(hubLabel())} (very few sell orders) to give a reliable value estimate for this site.</p>`}
    <div class="ore-table">
      <div class="ore-table-head priced"><span>${isIce?'Ice':'Ore'}</span><span>Units</span><span>Cargo m³</span><span>Value</span></div>
      ${site.ores.map(o=>{
        const p = priceUsable(site, o.ore);
        return `<div class="ore-row priced"><span>${o.ore}${o.qty>1?` ×${o.qty}`:''}</span><span>${fmt(o.units)}${o.verify?'<span class="verify-flag">verify</span>':''}</span><span>${fmt(o.cargo)}</span>${p===null?`<span class="nodata">${priceOf(o.ore)===null?'no price':'thin market'}</span>`:`<span>${fmtIsk(o.units*p)}${priceFlag(o.ore)?'<span class="star">*</span>':''}</span>`}</div>`;
      }).join('')}
    </div>
    <div class="guard-list">
      <p class="wave-label">Guards</p>
      <ul class="ship-list">${site.guards.map(shipRow).join('')}</ul>
    </div>
  </article>`;
}

/* ---------------- state & filtering ---------------- */
const classList = ["C1","C2","C3","C4","C5","C6"];
let activeCategory = "combat";
let activeType = "all";
let selectedClasses = new Set();

const classChipsEl = document.getElementById('classChips');
classList.forEach(c=>{
  const b = document.createElement('button');
  b.className = 'chip';
  b.textContent = c;
  b.dataset.class = c;
  b.addEventListener('click', ()=>{
    if(selectedClasses.has(c)) selectedClasses.delete(c); else selectedClasses.add(c);
    syncChips(); render();
  });
  classChipsEl.appendChild(b);
});

function syncChips(){
  [...classChipsEl.children].forEach(b=>{
    b.classList.toggle('active', selectedClasses.has(b.dataset.class));
    b.style.setProperty('--chip-accent', accentFor(activeCategory));
  });
  document.querySelectorAll('#typeToggle .chip').forEach(b=>{
    b.classList.toggle('active', b.dataset.type===activeType);
    b.style.setProperty('--chip-accent', accentFor(activeCategory));
  });
  const dirty = selectedClasses.size>0 || activeType!=='all' || search.value.trim()!=='' || sortSelect.value!=='default';
  document.getElementById('resetBtn').classList.toggle('show', dirty);
}

function accentFor(cat){
  return {combat:'#D97354', datarelic:'#4FAFCF', gas:'#A78BE0', ore:'#D4AC3B', shattered:'#E5799E'}[cat];
}
function accentVarFor(cat){
  return {combat:'var(--combat)', datarelic:'var(--datarelic)', gas:'var(--gas)', ore:'var(--ore)', shattered:'var(--shattered)'}[cat];
}

function classInRange(c, range){
  const nums = range.match(/\d+/g).map(Number);
  const cn = Number(c.replace('C',''));
  return cn>=nums[0] && cn<=nums[1];
}

const tabsEl = document.getElementById('tabs');
tabsEl.querySelectorAll('.tab').forEach(t=>{
  t.addEventListener('click', ()=>{
    activeCategory = t.dataset.cat;
    tabsEl.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active', x===t));
    document.getElementById('typeToggle').classList.toggle('show', activeCategory==='datarelic');
    document.getElementById('drCallout').classList.toggle('show', activeCategory==='datarelic');
    document.getElementById('shCallout').classList.toggle('show', activeCategory==='shattered');
    classChipsEl.style.display = activeCategory==='shattered' ? 'none' : '';
    const priced = activeCategory==='gas' || activeCategory==='ore' || activeCategory==='shattered';
    document.getElementById('sortWrap').classList.toggle('show', priced);
    document.getElementById('marketWrap').classList.toggle('show', priced);
    const note = document.getElementById('priceNote');
    note.classList.toggle('show', priced);
    note.style.setProperty('--accent-note', accentFor(activeCategory));
    // ISK per m³ only makes sense for ore (gas sites have no cargo figures in the sheet)
    sortSelect.querySelector('[data-ore-only]').hidden = !(activeCategory==='ore' || activeCategory==='shattered');
    if(!(activeCategory==='ore' || activeCategory==='shattered') && sortSelect.value==='perm3') sortSelect.value = 'value';
    if(!priced) sortSelect.value = 'default';
    syncChips();
    render();
  });
});

const sortSelect = document.getElementById('sortSelect');
sortSelect.addEventListener('change', ()=>{ syncChips(); render(); });

const marketSelect = document.getElementById('marketSelect');
marketSelect.value = currentHub;
marketSelect.addEventListener('change', ()=>{
  currentHub = marketSelect.value;
  try{ localStorage.setItem('wh-market', currentHub); }catch(e){}
  updatePriceStamp();
  render();
});
tabsEl.querySelector('[data-cat="combat"]').classList.add('active');

document.querySelectorAll('#typeToggle .chip').forEach(b=>{
  b.addEventListener('click', ()=>{ activeType = b.dataset.type; syncChips(); render(); });
});

const search = document.getElementById('search');
search.addEventListener('input', ()=>{ syncChips(); render(); });

document.getElementById('resetBtn').addEventListener('click', ()=>{
  selectedClasses.clear(); activeType='all'; search.value=''; sortSelect.value='default';
  syncChips(); render();
});

function render(){
  const grid = document.getElementById('grid');
  const q = search.value.trim().toLowerCase();
  let sites, matchesClass, groupKey;

  if(activeCategory==='combat'){
    sites = combatSites;
    matchesClass = s => selectedClasses.size===0 || selectedClasses.has(s.class);
    groupKey = s => s.class;
  } else if(activeCategory==='datarelic'){
    sites = dataRelicSites.filter(s => activeType==='all' || s.type.toLowerCase()===activeType);
    matchesClass = s => selectedClasses.size===0 || selectedClasses.has(s.class);
    groupKey = s => s.class;
  } else if(activeCategory==='gas'){
    sites = gasSites;
    matchesClass = s => selectedClasses.size===0 || [...selectedClasses].some(c=>classInRange(c, s.classRange));
    groupKey = s => s.classRange;
  } else if(activeCategory==='shattered'){
    sites = shatteredSites;
    matchesClass = () => true;
    groupKey = s => s.group;
  } else {
    sites = oreSites;
    matchesClass = s => selectedClasses.size===0 || [...selectedClasses].some(c=>classInRange(c, s.classRange));
    groupKey = s => `${s.group} · ${s.classRange}`;
  }

  const filtered = sites.filter(s => matchesClass(s) && (q==='' || s._search.includes(q)));

  const groups = new Map();
  const sortMode = (activeCategory==='gas' || activeCategory==='ore' || activeCategory==='shattered') ? sortSelect.value : 'default';
  if(sortMode!=='default'){
    // One flat list, so the order isn't broken up by class groups
    const keyFn = sortMode==='perm3' ? (s=>siteValue(s).perM3 ?? -1) : (s=>siteValue(s).total);
    filtered.sort((a,b)=>keyFn(b)-keyFn(a));
    groups.set(sortMode==='perm3' ? 'Sorted by ISK per m³' : 'Sorted by estimated value', filtered);
  } else {
    filtered.forEach(s=>{
      const k = groupKey(s);
      if(!groups.has(k)) groups.set(k, []);
      groups.get(k).push(s);
    });
  }

  const accent = accentVarFor(activeCategory);
  let html = '';
  groups.forEach((list, key)=>{
    const cards = list.map(s=>{
      if(activeCategory==='gas') return gasCard(s);
      if(activeCategory==='ore') return oreCard(s);
      if(activeCategory==='shattered') return shatteredCard(s);
      return waveCard(s, accent, s.class);
    }).join('');
    html += `<div class="group"><p class="group-title">${key}</p><div class="cards">${cards}</div></div>`;
  });

  grid.innerHTML = html || `<p class="empty-state">No sites match those filters.</p>`;
  document.getElementById('countLine').textContent = `${filtered.length} site${filtered.length===1?'':'s'} shown`;
}

syncChips();
updatePriceStamp();
render();

// When hosted, pick up the daily-refreshed prices.json (silently keeps the fallback if unavailable)
fetch('prices.json', {cache:'no-store'})
  .then(r => r.ok ? r.json() : null)
  .then(j => {
    if(j && j.hubs && j.updated){
      PRICES = j;
      updatePriceStamp();
      render();
    }
  })
  .catch(()=>{});
