var UI = require('ui');
var Vector2 = require('vector2');
var Constants = require('constants');
var Themes = require('themes');

var POSITION_MIDDLE = new Vector2(Constants.SCREEN_WIDTH >> 1, Constants.SCREEN_HEIGHT >> 1);
var FIXME = new Vector2(45, 52);

var compass = new UI.Circle({
  position: POSITION_MIDDLE,
  radius: 2,
  backgroundColor: Themes.currentTheme().textColour,
});

var needle = new UI.Circle({
  position: POSITION_MIDDLE,
  radius: 2,
  backgroundColor: Themes.currentTheme().textColour
});

var whatever = false;

function init(panel) {
  console.log("Call: Compass.init");
  panel.add(compass);
  panel.add(needle);
}

function updateCompass() {
  console.log("Call: Compass.updateCompass");
  if (!whatever) {
    needle.animate({position: FIXME});
    compass.size(32);
  }
  whatever = true;
  // todo
}

function clearCompass() {
  console.log("Call: Compass.clearCompass");
  if (whatever) {
    needle.animate({position: POSITION_MIDDLE});
    compass.size(2);
  }
  whatever = false;
}

function draw(what) {
  console.log("Call: Compass.draw");
  if (what) {
    updateCompass();
  } else {
    clearCompass();
  }
  console.log(whatever);
}

this.exports = {init: init, draw: draw};