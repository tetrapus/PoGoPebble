var UI = require('ui');
var Vector2 = require('vector2');
var Constants = require('constants');

var POSITION_MIDDLE = new Vector2(Constants.SCREEN_WIDTH >> 1, Constants.SCREEN_HEIGHT >> 1);
var FIXME = new Vector2(45, 52);

var body = new UI.Circle({
  position: POSITION_MIDDLE,
  radius: 2,
  backgroundColor: 'white',
});

var needle = new UI.Circle({
  position: POSITION_MIDDLE,
  radius: 2,
  backgroundColor: 'white'
});

var whatever = false;

function init(panel) {
  console.log("Call: Compass.init");
  panel.add(body);
  panel.add(needle);
}

function updateCompass() {
  if (!whatever) {
    needle.animate({position: FIXME});
    body.animate({radius: 32});
  }
  whatever = true;
  // todo
}

function clearCompass() {
  if (whatever) {
    needle.animate({position: POSITION_MIDDLE});
    body.animate({radius: 2});
  }
  whatever = false;
}

function draw(what) {
  if (what) {
    clearCompass();
  } else {
    updateCompass();
  }
}

this.exports = {init: init, draw: draw};