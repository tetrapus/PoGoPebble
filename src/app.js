/**
 * Pokemon Go compass
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var Distance = require('distance');

var Nearby = require('nearby');
var Tracker = require('tracker');
var Compass = require('compass');

var panel = new UI.Window();

var background = new UI.Rect({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  backgroundColor: 'blue',
});

var geolocation_options = {
  enableHighAccuracy: true,
  maximumAge: 10000
};


function refreshData(panel, pos) {
  console.log('lat= ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
  ajax(
    {
      url: 'https://pokevision.com/map/data/' + pos.coords.latitude + '/' + pos.coords.longitude,
      type: 'json'
    },
    function(data, status, req) {
      console.log(data.pokemon.length);
      if (data.pokemon.length) {
        data.pokemon.sort(function(a, b) {
          return Distance.distance(pos.coords, a) - Distance.distance(pos.coords, b);
        });
        Tracker.setPokemon(panel, pos.coords, data.pokemon[0]);
      } else {
        Tracker.setPokemon(panel, pos.coords, null);
      }
    }
  );
}

function refreshLocation() {
  navigator.geolocation.getCurrentPosition(
    function(pos) { refreshData(panel, pos); },
    function() { console.log('fetch location failed'); },
    geolocation_options
  );
}

panel.add(background);
Compass.draw(panel);
Nearby.draw(panel, [1]);
panel.show();

refreshLocation();

panel.on('click', 'select', refreshLocation);
/*
navigator.geolocation.watchPosition(
  function(pos) { refreshData(panel, pos); },
  function() { console.log('fetch location failed'); },
  geolocation_options
);
*/
