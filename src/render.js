var Background = require('background');
var Compass = require('compass');
var Nearby = require('nearby');
var Tracker = require('tracker');

var Themes = require('themes');


function init(panel) {
  console.log("Call: View.init");
  Background.init(panel);
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