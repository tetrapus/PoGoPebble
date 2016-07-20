/**
 * Pokemon Go compass
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var Nearby = require('nearby');
var Tracker = require('tracker');

var panel = new UI.Window();

var background = new UI.Rect({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  backgroundColor: 'blue',
});

var circle = new UI.Circle({
  position: new Vector2(72, 84),
  radius: 32,
  backgroundColor: 'white',
});

function refreshData(panel) {
  var options = {
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  };
  navigator.geolocation.getCurrentPosition(
    function(pos) {
      console.log('lat= ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
      ajax(
        {
          url: 'https://pokevision.com/map/data/' + pos.coords.latitude + '/' + pos.coords.longitude,
          type: 'json'
        },
        function(data, status, req) {
          console.log(data.pokemon.length);
          if (data.pokemon.length) {
            Tracker.setPokemon(panel, pos.coords, data.pokemon[0]);
          } else {
            Tracker.setPokemon(panel, pos.coords, null);
          }
        }
      );
    },
    function() {},
    options
  );
}

panel.add(background);
panel.add(circle);
Nearby.draw(panel);
panel.show();

refreshData(panel);

panel.on('click', 'select', function() {
  refreshData(panel);
});
