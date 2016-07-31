var UI = require('ui');
var Vector2 = require('vector2');

var Constants = require('constants');
var Options = require('options');


var background = new UI.Rect({
  position: new Vector2(0, 0),
  size: new Vector2(
    Constants.SCREEN_WIDTH,
    Constants.SCREEN_HEIGHT
  ),
  backgroundColor: Options.currentTheme().backgroundColor,
});


function init(panel) {
  Options.watchUpdate(updateTheme);
  panel.add(background);
}

function updateTheme(theme) {
  background.backgroundColor(theme.backgroundColor);
}

this.exports = {
  init: init
};
