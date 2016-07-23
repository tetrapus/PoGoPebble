var UI = require('ui');
var Vector2 = require('vector2');

var Compass = require('compass');
var Nearby = require('nearby');
var Tracker = require('tracker');

var Constants = require('constants');
var Themes = require('themes');

var background = {};

function init(panel) {
  console.log("Call: View.init");
  background = new UI.Rect({
    position: new Vector2(0, 0),
    size: new Vector2(
      Constants.SCREEN_WIDTH,
      Constants.SCREEN_HEIGHT
    ),
    backgroundColor: Themes.currentTheme().backgroundColour,
  });
  panel.add(background);
  Compass.init(panel);
  Tracker.init(panel);
  Nearby.init(panel);
  panel.show();
}

function draw(panel, pos, pokemon) {
  console.log("Call: View.draw");
  background.backgroundColor(Themes.currentTheme().backgroundColour);
  
  Compass.draw(pokemon.length);
  Nearby.draw(panel, pokemon);
  Tracker.draw(pos, pokemon);
}


this.exports = {
  draw: draw,
  init: init
};