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
var Settings = require('settings');
var Themes = require('themes');

var panel = new UI.Window();

var position = null;
var pokemon = [];

var dismissed = [];
var pokeLock = null;


function isPokemonShown(pokemon) {
  return pokemon.expiration_time > (Date.now() / 1000) &&
    Geo.distance(position.coords, pokemon) < Settings.option('shown_range') &&
    !Settings.option('hide' + pokemon.pokemonId) &&
    dismissed.indexOf(pokemon.id) === -1;
}

function cmpPokemon(articuno, zapdos) {
  if (pokeLock !== null) {
    if (pokeLock === articuno.id) return -1;
    if (pokeLock === zapdos.id) return 1;
  }
  var p1 = Settings.option("priority" + articuno.pokemonId);
  var p2 = Settings.option("priority" + zapdos.pokemonId);
  if (p1 === p2) {
    return Geo.distance(position.coords, articuno) - Geo.distance(position.coords, zapdos);
  } else {
    return p2 - p1;
  }
}

function updateLock() {
  if (pokeLock !== null) {
    if (pokemon.map(function(p) { return p.id; }).indexOf(pokeLock) === -1) {
      // Reset lock
      pokeLock = null;
      Status.rotate();
    }
  }
}

function updatePokemonState() {
  pokemon = pokemon.filter(isPokemonShown);
  updateLock();
  pokemon.sort(cmpPokemon);
  View.draw(panel, position, pokemon);
}

function setPosition(pos) {
  // Ignore location updates under 10m
  if (position === null || Geo.distance(position.coords, pos.coords) > 10) {
    console.log("setPosition");
    position = pos;
    updatePokemonState();
  }
}

var seed = Date.now();
function random(max) {
  seed = (((seed * 214013 + 2531011) >> 16) & 32767);

  return seed % max;
}

function updatePokemon() {
  console.log("Call: updatePokemon");
  ajax(
    {
      url: 'https://pokevision.com/map/data/' + position.coords.latitude + '/' + position.coords.longitude,
      type: 'json'
    },
    function(data, status, req) {
      if (Settings.option('debug')) {
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

Themes.watchUpdate(updatePokemonState);
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
    pokemon = pokemon.filter(isPokemonShown);
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
  if (position !== null && !Settings.option('debug')) {
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

panel.on('longClick', 'select', function() {
  if (pokemon.length) {
    Vibe.vibrate();
    dismissed.push(pokemon[0].id);
    updatePokemonState();
  }
});
Accel.on('tap', function () {
  if (pokeLock === null) {
    if (pokemon.length) {
      pokeLock = pokemon[0].id;
      Status.rotate();    }
  } else {
    // Clear pokelock
    pokeLock = null;
    Status.rotate();
    updatePokemonState();
  }
});
