var Compass = require('compass');
var Nearby = require('nearby');
var Tracker = require('tracker');

function draw(panel, pos, pokemon) {
  Compass.draw(panel);
  Nearby.draw(panel, pokemon);
  Tracker.draw(panel, pos, pokemon);
}

this.exports = {draw: draw};