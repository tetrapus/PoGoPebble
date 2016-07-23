var Settings = require('settings');
var themes = {
  none: {
    backgroundColour: 'black',
    textColour: 'white'
  },
  valor: {
    backgroundColour: 'red',
    textColour: 'white'
  },
  mystic: {
    backgroundColour: 'blue',
    textColour: 'white'
  },
  instinct: {
    backgroundColour: 'yellow',
    textColour: 'black'
  }
};
function currentTheme() {
  var current = Settings.option('team');
  if (current === '')
    current = 'none';
  var theme = themes[current];
  if (!theme)
    theme = themes.none;
  return theme;
}

this.exports = {
  currentTheme: currentTheme
};