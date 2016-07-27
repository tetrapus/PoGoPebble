var Settings = require('settings');
var Clay = require('clay');
var clayConfig = require('config');
var SettingsPage = require('settingspage');
var Data = require('data');

var clay = new Clay(
  clayConfig,
  SettingsPage,
  {
    autoHandleEvents: false,
    userData: {
      pokemon: Data.pokemon,
      shards: Data.shards
    }
  }
);


var themes = {
  none: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    highlightColor: '#AAAAAA',
    lockColor: '#555555',
    logo: ''
  },
  valor: {
    backgroundColor: '#AA0000',
    textColor: '#ffffff',
    highlightColor: '#FF0000',
    lockColor: '#ff5555',
    logo: 'images/valor.png'
  },
  mystic: {
    backgroundColor: '#0055FF',
    textColor: '#ffffff',
    highlightColor: '55AAFF',
    lockColor: '#0000ff',
    logo: 'images/mystic.png'
  },
  instinct: {
    backgroundColor: '#FFFF00',
    textColor: '#000000',
    highlightColor: '#ffffaa',
    lockColor: '#ffaa00',
    logo: 'images/instinct.png'
  }
};

var subscribers = [];


function currentTheme() {
  var current = Settings.option('team');
  if (current === '')
    current = 'none';
  var theme = themes[current];
  if (!theme)
    theme = themes.none;
  return theme;
}

function init() {
  Pebble.addEventListener('showConfiguration', function(e) {
    Pebble.openURL(clay.generateUrl());
  });

  Pebble.addEventListener('webviewclosed', function(e) {
    if (e && !e.response) {
      return;
    }
    var dict = clay.getSettings(e.response);
    // Save the Clay settings to the Settings module.
    Settings.option(dict);
    // If we changed teams we need to re-skin all navigation elements
    notifySubscribers();
  });
}


function notifySubscribers() {
  var theme = currentTheme();
  for (var i=0; i < subscribers.length; ++i) {
    subscribers[i](theme);
  }
}

function watchUpdate(callback) {
  subscribers.push(callback);
}

this.exports = {
  currentTheme: currentTheme,
  init: init,
  watchUpdate: watchUpdate
};
