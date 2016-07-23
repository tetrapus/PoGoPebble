var UI = require('ui');
var Vector2 = require('vector2');

var Constants = require('constants');
var Themes = require('themes');


var background = new UI.Rect({
  position: new Vector2(0, 0),
  size: new Vector2(
    Constants.SCREEN_WIDTH,
    Constants.SCREEN_HEIGHT
  ),
  backgroundColor: Themes.currentTheme().backgroundColor,
});


function init(panel) {
  Themes.watchUpdate(updateTheme);
  panel.add(background);
}

function updateTheme(theme) {
  background.backgroundColor(theme.backgroundColor);
}

this.exports = {
  init: init
};