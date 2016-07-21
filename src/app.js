/**
 * Pokemon Go compass
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var Distance = require('distance');

var View = require('render');

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

var position = null;
var pokemon = [];

function setPosition(pos) {
  position = pos;
  pokemon.sort(function(a, b) {
    return Distance.distance(position.coords, a) - Distance.distance(position.coords, b);
  });
  View.draw(panel, position, pokemon);
}

function updatePokemon() {
  ajax(
    {
      url: 'https://pokevision.com/map/data/' + position.coords.latitude + '/' + position.coords.longitude,
      type: 'json'
    },
    function(data, status, req) {
      console.log(data.pokemon.length);
      pokemon = data.pokemon;
      pokemon.sort(function(a, b) {
        return Distance.distance(position.coords, a) - Distance.distance(position.coords, b);
      });
      
      panel.on('click', 'select', updatePokemon);
      
      navigator.geolocation.watchPosition(
        setPosition,
        function() { console.log('fetch location failed'); },
        geolocation_options
      );
      View.draw(panel, position, pokemon);
    }
  );
}

// Initialise vars
navigator.geolocation.getCurrentPosition(
  function(pos) {
    position = pos;
    updatePokemon();
  },
  function() { console.log('fetch location failed'); },
  geolocation_options
);

panel.add(background);
panel.show();

