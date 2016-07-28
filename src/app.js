/**
 * Pokemon Go compass
 */

var UI = require('ui');
var ajax = require('ajax');
var Accel = require('ui/accel');
var Vibe = require('ui/vibe');

var Geo = require('geo');

var View = require('render');
var Status = require('status');
var Compass = require('compass');
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
    pokemon.distance < Settings.option('shown_range') &&
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
    return articuno.distance - zapdos.distance;
  } else {
    return p2 - p1;
  }
}

function updateLock() {
  if (pokeLock !== null) {
    if (pokemon.map(function(p) { return p.id; }).indexOf(pokeLock) === -1) {
      // Reset lock
      pokeLock = null;
      Status.rotate(position.coords, pokemon[0]);
      Compass.unlock();
    }
  }
}

function updateDistance(pokemon) {
  pokemon.distance = Geo.distance(position.coords, pokemon);
}

function updatePokemonState() {
  pokemon.map(updateDistance);
  pokemon = pokemon.filter(isPokemonShown);
  updateLock();
  pokemon.sort(cmpPokemon);
  View.draw(panel, position, pokemon);
}

function nextPokemon() {
  if (pokeLock === null) {
    if (pokemon.length > 1) {
      pokeLock = pokemon[1].id;
      Compass.lock();
      updatePokemonState();
    }
  } else {
    // 0 is locked pokemon
    pokeLock = null; // temp clear for cmp
    for (var i=1; i<pokemon.length && i < 5; i++) {
      if (cmpPokemon(pokemon[i], pokemon[0]) > 0) {
        pokeLock = pokemon[i].id;
        break;
      }
    }
    if (pokeLock === null) {
      pokeLock = pokemon[0].id; // already at the end
    }
    updatePokemonState();
  }
}

function previousPokemon() {
  if (pokeLock !== null && pokemon.length > 1) {
    pokeLock = null; // temp clear for cmp
    for (var i=Math.min(pokemon.length-1, 4); i > 0; i--) {
      if (cmpPokemon(pokemon[i], pokemon[0]) < 0) {
        pokeLock = pokemon[i].id;
        break;
      }
    }
    if (pokeLock === null) {
      pokeLock = pokemon[0].id; // already at the end
    }
    updatePokemonState();
  }
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
      var i;
      if (Settings.option('debug')) {
        data = {pokemon: []};
        var num_pokemon = random(5);
        for (i=0; i<num_pokemon; i++) {
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
      // Remove duplicates
      var duplicated = {};
      var keys = [];
      for (i=0; i<data.pokemon.length; i++) {
        var p = data.pokemon[i];
        p.unique_key = p.pokemonId + ":" + p.latitude + ":" + p.longitude;
        if (!duplicated[p.unique_key]) keys.push(p.unique_key);
        if (!duplicated[p.unique_key] || duplicated[p.unique_key].id > p.id) {
          duplicated[p.unique_key] = p;
        }
      }
      data.pokemon = keys.map(function(k) { return duplicated[k]; });
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
      updateLock();
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

if (Constants.type === 'watchapp') {
  panel.on('click', 'select', function() {
    if (pokeLock === null) {
      if (pokemon.length) {
        pokeLock = pokemon[0].id;
        Compass.lock();
      }
    } else {
      pokeLock = null;
      Compass.unlock();
      updatePokemonState();
    }
  });

  panel.on('longClick', 'select', function() {
    if (pokemon.length) {
      Vibe.vibrate();
      dismissed.push(pokemon[0].id);
      updatePokemonState();
    }
  });

  panel.on('click', 'up', nextPokemon);

  panel.on('click', 'down', previousPokemon);

  panel.on('longClick', 'up', function() {
    if (pokemon.length) {
      Vibe.vibrate();
      var key = 'priority' + pokemon[0].pokemonId;
      Settings.option(key, Math.min(Settings.option(key) + 1, 10));
      updatePokemonState();
    }
  });

  panel.on('longClick', 'down', function() {
    if (pokemon.length) {
      Vibe.vibrate();
      var key = 'priority' + pokemon[0].pokemonId;
      Settings.option(key, Math.max(Settings.option(key) - 1, 0));
      updatePokemonState();
    }
  });

  Accel.on('tap', function() {
    Status.rotate(position.coords, pokemon[0]);
  });
} else {
  Accel.on('tap', function () {
    if (position === null) return;
    if (pokeLock === null) {
      if (pokemon.length) {
        pokeLock = pokemon[0].id;
        Status.rotate(position.coords, pokemon[0]);
        Compass.lock();
      }
    } else {
      // Clear pokelock
      pokeLock = null;
      Status.rotate(position.coords, pokemon[0]);
      Compass.unlock();
      updatePokemonState();
    }
  });
}
