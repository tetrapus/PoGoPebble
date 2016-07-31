var Data = require('data');

var pokemonSection = [
  {
    "type": "heading",
    "defaultValue": "Pokemon"
  },
  {
    type: 'input',
    appKey: 'pokesearch',
    label: 'Search Pokemon'
  }
];

for (var i=0; i < Data.shards.length; ++i) {
  pokemonSection.push({
    type: 'heading',
    appKey: 'heading'+i,
    defaultValue: ""
  });
  for (var j=0; j < Data.shards[i].length; ++j) {
    var p = Data.shards[i][j];
    pokemonSection.push({
      type: "toggle",
      appKey: "hide"+p,
      label: "Hidden",
      defaultValue: false
    });
    pokemonSection.push({
      type: "toggle",
      appKey: "vibrate"+p,
      label: "Enable Alerts",
      defaultValue: true
    });
    pokemonSection.push({
      "type": "slider",
      "appKey": "priority"+p,
      "defaultValue": 5,
      "label": "Priority",
      "max": 10,
      "description": "The Pokemon with the highest priority will be displayed first."
    });
  }
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
          "label": "Neutral",
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
  type: 'section',
  items: [
      {
        type: 'heading',
        defaultValue: 'Modes',
        id: 'mode_heading'
      },
      {
        type: 'checkboxgroup',
        appKey: 'modes',
        defaultValue: ["enable_priority"],
        options: [
          {
            label: "Enable Backlight",
            value: "enable_backlight"
          },
          {
            label: "Enable Priority",
            value: "enable_priority"
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
        "max": 1000,
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
    type: "submit",
    defaultValue: "Save"
  },
  {
    type: "toggle",
    appKey: "debug",
    label: "Enable Debug Mode",
    defaultValue: false
  }
];
