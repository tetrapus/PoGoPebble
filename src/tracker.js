var Vibe = require('ui/vibe');
var UI = require('ui');
var Vector2 = require('vector2');

var Distance = require('distance');


// Elements
var pokemonEl = null;
var distanceEl = null;

var pokemon = null;

function updatePokemon(panel, pos, new_pokemon) {
  if (new_pokemon !== null && (pokemon === null || new_pokemon.id !== pokemon.id)) {
    Vibe.vibrate();
  }
  if (pokemonEl !== null) {
    panel.remove(pokemonEl);
  }
  if (new_pokemon !== null) {
    pokemonEl = new UI.Image({
      position: new Vector2(0, 0),
      size: new Vector2(144, 168),
      image: 'images/main93.png',
      compositing: 'set'
    });
    pokemon = new_pokemon;
    console.log(Distance.distance(pos, new_pokemon) + "m");
    panel.add(pokemonEl);
    updateDistance(panel, pos);
  } else {
    pokemon = null;
    pokemonEl = null;
    clearDistance(panel);
  }
}

function updateDistance(panel, pos) {
  if (distanceEl !== null) {
    panel.remove(distanceEl);
  }
  distanceEl = new UI.Text({
    text: Math.round(Distance.distance(pos, pokemon)) + "m",
    position: new Vector2(12, 130),
    size: new Vector2(120, 44),
    font: 'gothic-28-bold',
    textAlign: 'center'
  });
  panel.add(distanceEl);
}

function clearDistance(panel) {
  if (distanceEl !== null) {
    panel.remove(distanceEl);
  }
  distanceEl = null;
}

function draw(panel, pos, pokemon) {
  if (pokemon.length) {
    updatePokemon(panel, pos, pokemon[0]);
  } else {
    updatePokemon(panel, pos, null);
  }
}

this.exports = {
  draw: draw
};
