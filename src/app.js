/**
 * Pokemon Go compass
 */

var UI = require('ui');
var ajax = require('ajax');

var Distance = require('distance');

var View = require('render');
var Constants = require('constants');
var Themes = require('themes');

var panel = new UI.Window();

var position = null;
var pokemon = [];

var options = {debug: false};

function setPosition(pos) {
  console.log("Call: setPosition");
  // Ignore location updates under 10m
  if (position === null || Distance.distance(position, pos) > 10) {
    position = pos;
    pokemon.sort(function(a, b) {
      return Distance.distance(position.coords, a) - Distance.distance(position.coords, b);
    });
    View.draw(panel, position, pokemon);
  }
}

var seed = 1292;
function random(max) {
  seed = (((seed * 214013 + 2531011) >> 16) & 32767);

  return seed % max;
}

function updatePokemon() {
  console.log("Call: updatePokemon");
  ajax(
    {
      url: options.debug? 'http://freelancer.com/api/memberships/0.1/packages' : 'https://pokevision.com/map/data/' + position.coords.latitude + '/' + position.coords.longitude,
      type: 'json'
    },
    function(data, status, req) {
      console.log('Debug: ' + options.debug);
      if (options.debug) {
        data = {pokemon: []};
        var num_pokemon = random(5);
        for (var i=0; i<num_pokemon; i++) {
          var id = random(151) + 1;
          data.pokemon.push(
            {id: id, pokemonId: id, latitude: position.coords.latitude + random(100)/10000, longitude: position.coords.longitude + random(100)/10000}
          );
        }
      }
      console.log(data.pokemon.length);
      pokemon = data.pokemon;
      pokemon.sort(function(a, b) {
        return Distance.distance(position.coords, a) - Distance.distance(position.coords, b);
      });
      
      View.draw(panel, position, pokemon);
    }
  );
}

Themes.init();
View.init(panel);

// Initialise vars
navigator.geolocation.getCurrentPosition(
  function(pos) {
    console.log("Initialised location");
    position = pos;
    updatePokemon();
  },
  function() { console.log('fetch location failed'); },
  Constants.Geolocation.OPTIONS
);

navigator.geolocation.watchPosition(
  setPosition,
  function() { console.log('fetch location failed'); },
  Constants.Geolocation.OPTIONS
);

setInterval(function() {
  if (position !== null && !options.debug) {
    updatePokemon();
  }
}, 60000);

panel.on('click', 'select', updatePokemon);
panel.on('longClick', 'select', function() { options.debug = !options.debug; updatePokemon(); });
