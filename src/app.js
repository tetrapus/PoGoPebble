/**
 * Pokemon Go compass
 */

var UI = require('ui');
var ajax = require('ajax');

var Distance = require('distance');

var View = require('render');
var Constants = require('constants');


var panel = new UI.Window();

var position = null;
var pokemon = [];


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

var seed = 100;
function random(max) {
  seed = (((seed * 214013 + 2531011) >> 16) & 32767);

  return seed % max;
}

function updatePokemon() {
  console.log("Call: updatePokemon");
  ajax(
    {
      url: 'https://pokevision.com/map/data/' + position.coords.latitude + '/' + position.coords.longitude,
      //type: 'json'
    },
    function(data, status, req) {
      data = {pokemon: []};
      for (var i=0; i<random(5); i++) {
        var id = random(151) + 1;
        data.pokemon.push(
          {id: id, pokemonId: id, latitude: position.coords.latitude + random(100)/100, longitude: position.coords.longitude + random(100)/100}
        );
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


panel.on('click', 'select', updatePokemon);

