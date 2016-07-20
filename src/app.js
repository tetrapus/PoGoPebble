/**
 * Pokemon Go compass
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var window = new UI.Window();

var circle = new UI.Circle({
  position: new Vector2(72, 84),
  radius: 25,
  backgroundColor: 'yellow',
});

function updatePokemon(window) {
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
          var pokemon = new UI.Text({
            position: new Vector2(0, 0),
            size: new Vector2(144, 168),
            text: data.pokemon.length
          });
          window.add(pokemon);
        }
      );
    },
    function() {},
    options
  );
}

window.add(circle);
window.show();

updatePokemon(window);
