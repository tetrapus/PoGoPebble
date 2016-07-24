/**
 * Pokemon Go compass
 */

var UI = require('ui');
var ajax = require('ajax');
var Accel = require('ui/accel');

var Geo = require('geo');

var View = require('render');
var Status = require('status');
var Constants = require('constants');
var Themes = require('themes');

var panel = new UI.Window();

var position = null;
var pokemon = [];

var options = {debug: false};

function updatePokemonState() {
  pokemon = pokemon.filter(function(p) { return p.expiration_time > (Date.now() / 1000); });
  pokemon.sort(function(a, b) {
    return Geo.distance(position.coords, a) - Geo.distance(position.coords, b);
  });
  View.draw(panel, position, pokemon);
}

function setPosition(pos) {
  console.log("Call: setPosition");
  // Ignore location updates under 10m
  if (position === null || Geo.distance(position, pos) > 10) {
    position = pos;
    updatePokemonState();
    View.draw(panel, position, pokemon);
  }
}

var seed = Date.now();
function random(max) {
  seed = (((seed * 214013 + 2531011) >> 16) & 32767);

  return seed % max;
}

function updatePokemon() {
  console.log("Call: updatePokemon");
  console.log(options.debug? 'http://freelancer.com/api/memberships/0.1/packages' : 'https://pokevision.com/map/data/' + position.coords.latitude + '/' + position.coords.longitude);
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
            {
              id: id,
              pokemonId: id,
              latitude: position.coords.latitude + (random(100) - 50)/10000,
              longitude: position.coords.longitude + (random(100) - 50)/10000,
              expiration_time: Date.now() / 1000 + random(300)
            }
          );
        }
      }
      console.log(data.pokemon.length);
      pokemon = data.pokemon;
      updatePokemonState();
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
  if (pokemon !== null && pokemon.length && position !== null) {
    var previous = pokemon.length;
    pokemon = pokemon.filter(function(p) { return p.expiration_time > (Date.now() / 1000); });
    if (previous !== pokemon.length) {
      // trigger a full redraw
      View.draw(panel, position, pokemon);
    } else {
      // we didn't lose any pokemon so just update text display
      Status.draw(position.coords, pokemon[0]);
    }
  }
}, 1000);

setInterval(function() {
  if (position !== null && !options.debug) {
    updatePokemon();
  }
}, 60000);

// idk what this is for but probably useful?
setInterval(function() {
  if (position !== null) {
    ajax({
      url: 'https://pokevision.com/map/scan/' + position.coords.latitude + '/' + position.coords.longitude,
      type: 'json'
    });
  }
}, 300000);

panel.on('longClick', 'select', function() { options.debug = !options.debug; updatePokemon(); });
Accel.on('tap', updatePokemon);
