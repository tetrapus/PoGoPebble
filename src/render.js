var UI = require('ui');
var Vector2 = require('vector2');

var Compass = require('compass');
var Nearby = require('nearby');
var Tracker = require('tracker');

var Constants = require('constants');


function init(panel) {
  console.log("Call: View.init");
  var background = new UI.Rect({
    position: new Vector2(0, 0),
    size: new Vector2(
      Constants.SCREEN_WIDTH,
      Constants.SCREEN_HEIGHT
    ),
    backgroundColor: 'yellow',
  });
  panel.add(background);
  Compass.init(panel);
  Tracker.init(panel);
  Nearby.init(panel);
  panel.show();
}

function draw(panel, pos, pokemon) {
  console.log("Call: View.draw");
  Compass.draw(pokemon.length);
  Nearby.draw(panel, pokemon);
  Tracker.draw(pos, pokemon);
}


this.exports = {
  draw: draw,
  init: init
};