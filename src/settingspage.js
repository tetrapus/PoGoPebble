this.exports = function(minified) {
  var clayConfig = this;
  var _ = minified._;
  var $ = minified.$;
  var HTML = minified.HTML;
  var pokemon = {
    1: 'Bulbasaur',
    2: 'Ivysaur',
    3: 'Venusaur',
    4: 'Charmander',
    5: 'Charmeleon',
    6: 'Charizard',
    7: 'Squirtle',
    8: 'Wartortle',
    9: 'Blastoise',
    10: 'Caterpie',
    11: 'Metapod',
    12: 'Butterfree',
    13: 'Weedle',
    14: 'Kakuna',
    15: 'Beedrill',
    16: 'Pidgey',
    17: 'Pidgeotto',
    18: 'Pidgeot',
    19: 'Rattata',
    20: 'Raticate',
    21: 'Spearow',
    22: 'Fearow',
    23: 'Ekans',
    24: 'Arbok',
    25: 'Pikachu',
    26: 'Raichu',
    27: 'Sandshrew',
    28: 'Sandslash',
    29: 'Nidoran (F)',
    30: 'Nidorina',
    31: 'Nidoqueen',
    32: 'Nidoran (M)',
    33: 'Nidorino',
    34: 'Nidoking',
    35: 'Clefairy',
    36: 'Clefable',
    37: 'Vulpix',
    38: 'Ninetales',
    39: 'Jigglypuff',
    40: 'Wigglytuff',
    41: 'Zubat',
    42: 'Golbat',
    43: 'Oddish',
    44: 'Gloom',
    45: 'Vileplume',
    46: 'Paras',
    47: 'Parasect',
    48: 'Venonat',
    49: 'Venomoth',
    50: 'Diglett',
    51: 'Dugtrio',
    52: 'Meowth',
    53: 'Persian',
    54: 'Psyduck',
    55: 'Golduck',
    56: 'Mankey',
    57: 'Primeape',
    58: 'Growlithe',
    59: 'Arcanine',
    60: 'Poliwag',
    61: 'Poliwhirl',
    62: 'Poliwrath',
    63: 'Abra',
    64: 'Kadabra',
    65: 'Alakazam',
    66: 'Machop',
    67: 'Machoke',
    68: 'Machamp',
    69: 'Bellsprout',
    70: 'Weepinbell',
    71: 'Victreebel',
    72: 'Tentacool',
    73: 'Tentacruel',
    74: 'Geodude',
    75: 'Graveler',
    76: 'Golem',
    77: 'Ponyta',
    78: 'Rapidash',
    79: 'Slowpoke',
    80: 'Slowbro',
    81: 'Magnemite',
    82: 'Magneton',
    83: 'Farfetchd',
    84: 'Doduo',
    85: 'Dodrio',
    86: 'Seel',
    87: 'Dewgong',
    88: 'Grimer',
    89: 'Muk',
    90: 'Shellder',
    91: 'Cloyster',
    92: 'Gastly',
    93: 'Haunter',
    94: 'Gengar',
    95: 'Onix',
    96: 'Drowzee',
    97: 'Hypno',
    98: 'Krabby',
    99: 'Kingler',
    100: 'Voltorb',
    101: 'Electrode',
    102: 'Exeggcute',
    103: 'Exeggutor',
    104: 'Cubone',
    105: 'Marowak',
    106: 'Hitmonlee',
    107: 'Hitmonchan',
    108: 'Lickitung',
    109: 'Koffing',
    110: 'Weezing',
    111: 'Rhyhorn',
    112: 'Rhydon',
    113: 'Chansey',
    114: 'Tangela',
    115: 'Kangaskhan',
    116: 'Horsea',
    117: 'Seadra',
    118: 'Goldeen',
    119: 'Seaking',
    120: 'Staryu',
    121: 'Starmie',
    122: 'Mrmime',
    123: 'Scyther',
    124: 'Jynx',
    125: 'Electabuzz',
    126: 'Magmar',
    127: 'Pinsir',
    128: 'Tauros',
    129: 'Magikarp',
    130: 'Gyarados',
    131: 'Lapras',
    132: 'Ditto',
    133: 'Eevee',
    134: 'Vaporeon',
    135: 'Jolteon',
    136: 'Flareon',
    137: 'Porygon',
    138: 'Omanyte',
    139: 'Omastar',
    140: 'Kabuto',
    141: 'Kabutops',
    142: 'Aerodactyl',
    143: 'Snorlax',
    144: 'Articuno',
    145: 'Zapdos',
    146: 'Moltres',
    147: 'Dratini',
    148: 'Dragonair',
    149: 'Dragonite',
    150: 'Mewtwo',
    151: 'Mew'
  };

  var shards = [
    [24, 4, 1, 23, 50, 42, 22, 2, 93, 14, 39, 11, 108, 43, 29, 16, 7, 19, 72, 8, 3, 41],
    [59, 5, 9, 101, 51, 44, 83, 97, 64, 124, 52, 131, 95, 30, 17, 21, 20, 73, 13, 37, 145],
    [63, 6, 12, 102, 84, 55, 136, 106, 98, 135, 56, 138, 31, 18, 27, 26, 114, 40, 45],
    [65, 10, 15, 103, 85, 58, 107, 99, 66, 139, 32, 25, 28, 78, 128, 70, 48],
    [142, 35, 69, 125, 87, 74, 116, 109, 67, 33, 46, 79, 111, 110, 49],
    [144, 36, 133, 96, 75, 115, 68, 34, 47, 80, 112, 71],
    [91, 132, 76, 140, 81, 38, 53, 86, 100],
    [104, 147, 88, 141, 82, 54, 90, 134],
    [113, 148, 92, 89, 57, 117],
    [149, 94, 105, 60, 119],
    [118, 122, 61, 120],
    [130, 126, 62, 121],
    [129, 77, 123],
    [146, 127, 143],
    [150, 137],
    [151]
  ];

  clayConfig.on(clayConfig.EVENTS.AFTER_BUILD, function() {
    var selector = clayConfig.getItemByAppKey("pokesearch");
    var tags = ["hide", "vibrate", "priority"];
    var show = function(num) {
      for (var tag=0; tag<tags.length; ++tag) {
       clayConfig.getItemByAppKey(tags[tag]+num).show();
      }
    };
    var hide = function(num) {
      for (var tag=0; tag<tags.length; ++tag) {
       clayConfig.getItemByAppKey(tags[tag]+num).hide();
      }
    };
    var updateVisible = function(str) {
      for (var i=0; i<shards.length; ++i) {
        var shard = clayConfig.getItemByAppKey("heading"+i);
        var visible = null;
        for (var j=0; j<shards[i].length; ++j) {
          var p = shards[i][j];
          if (str && pokemon[p].toLowerCase().indexOf(str.toLowerCase()) === 0) {
            show(p);
            visible = p;
          } else {
            hide(p);
          }
        }
        if (visible !== null) {
          shard.set(pokemon[visible]);
          shard.show();
        } else {
          shard.hide();
        }
      }
    };
    updateVisible(selector.get());
    selector.on('change', function() {
      updateVisible(selector.get());
    });
    clayConfig.getItemById('preset_apply').on('click', function() {
      var option = clayConfig.getItemById('preset_select').get();
      if (option === 0) {
        var elems = clayConfig.config[2].items;
        for (var i=2; i<elems.length; i++) {
          if (elems[i].label) {
            clayConfig.getItemByAppKey(elems[i].appKey).set(elems[i].defaultValue);
          }
        }
      }
    });
  });
};
