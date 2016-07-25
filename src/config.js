var Data = require('data');

var pokemonSection = [
  {
    "type": "heading",
    "defaultValue": "Pokemon"
  },
  {
    "type": "select",
    "appKey": "pokemon_selector",
    "defaultValue": "Zubat",
    "label": "Pokemon",
    "options": [],
  }
];

for (var i=1; i<=151; i++) {
  pokemonSection[1].options.push({
    label: Data.pokemon[i],
    value: i
  });
  pokemonSection.push({
    type: "toggle",
    appKey: "hide"+i,
    label: "Hidden",
    defaultValue: false
  });
  pokemonSection.push({
    type: "toggle",
    appKey: "vibrate"+i,
    label: "Enable Alerts",
    defaultValue: true
  });
  pokemonSection.push({
    "type": "slider",
    "appKey": "priority"+i,
    "defaultValue": 5,
    "label": "Priority",
    "max": 10,
    "description": "If " + Data.pokemon[i] + " has the highest priority it will be displayed."
  });
}

this.exports = 
[
  {
  "type": "section",
  "items": [
    {
      "type": "heading",
      "defaultValue": "Theme"
    },
    {
      "type": "select",
      "appKey": "team",
      "defaultValue": "",
      "label": "Team",
      "options": [
        { 
          "label": "", 
          "value": "" 
        },
        { 
          "label": "Valor",
          "value": "valor" 
        },
        { 
          "label": "Mystic",
          "value": "mystic" 
        },
        { 
          "label": "Instinct",
          "value": "instinct" 
        }
      ]
    }
  ]
  },
  {
    "type": "section",
    "items": [
      {
        "type": "heading",
        "defaultValue": "Range"
      },
      {
        "type": "slider",
        "appKey": "vibration_range",
        "defaultValue": 50,
        "label": "Alert (metres)",
        "max": 500,
        "step": 10,
        "description": "Vibrate if a new pokemon appears within the given range"
      },
      {
        "type": "slider",
        "appKey": "shown_range",
        "defaultValue": 500,
        "label": "Show (metres)",
        "max": 1000,
        "step": 10,
        "description": "Only show pokemon within the given range"
      }
    ]
  },
  {
    "type": "section",
    "items": pokemonSection
  },
  {
  "type": "submit",
  "defaultValue": "Save"
  },
  {
    type: "toggle",
    appKey: "debug",
    label: "Enable Debug Mode",
    defaultValue: false
  }
];