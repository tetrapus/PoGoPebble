var Settings = require('settings');
var Clay = require('clay');
var clayConfig = require('config');

var clay = new Clay(clayConfig, null, {autoHandleEvents: false});


var themes = {
  none: {
    backgroundColor: '#FFFF00',
    textColor: '#000000',
  },
  valor: {
    backgroundColor: '#AA0000',
    textColor: '#ffffff'
  },
  mystic: {
    backgroundColor: '#0055FF',
    textColor: '#ffffff'
  },
  instinct: {
    backgroundColor: '#FFC107',
    textColor: '#000000'
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