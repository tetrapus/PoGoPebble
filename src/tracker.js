var Vibe = require('ui/vibe');
var UI = require('ui');
var Vector2 = require('vector2');

var Distance = require('distance');
var Themes = require('themes');

var Constants = require('constants');


// Elements
var elements = {
  pokemon: new UI.Image({
    position: new Vector2(0, 0),
    size: new Vector2(
      Constants.SCREEN_WIDTH * Constants.SPRITE_ELEMS,
      Constants.SCREEN_HEIGHT
    ),
    image: 'images/main_0.png',
    compositing: 'set'
  }),
  distance: new UI.Text({
    position: new Vector2(
      Constants.DISTANCE_HPAD,
      Constants.SCREEN_HEIGHT - Constants.DISTANCE_HEIGHT
    ),
    size: new Vector2(
      Constants.SCREEN_WIDTH - 2 * (Constants.DISTANCE_HPAD),
      Constants.DISTANCE_HEIGHT
    ),
    font: 'gothic-28-bold',
    textAlign: 'center'
  })
};

function init(panel) {
  console.log("Call: Tracker.init");
  panel.add(elements.pokemon);
  panel.add(elements.distance);
}


var pokemon = null;

function updatePokemon(pos, new_pokemon) {
  console.log("Call: Tracker.updatePokemon");
  if (pokemon === null || new_pokemon.id !== pokemon.id) {
    if (pokemon === null || pokemon.pokemonId !== new_pokemon.pokemonId) {
      Vibe.vibrate();
    }

    pokemon = new_pokemon;

    var sprite = 'images/main_' + Math.floor(pokemon.pokemonId / Constants.SPRITE_ELEMS) + '.png';
    var position = new Vector2(
      -Constants.SCREEN_WIDTH * (pokemon.pokemonId % Constants.SPRITE_ELEMS),
      0
    );
    console.log(sprite);
    console.log(pokemon.pokemonId);
    elements.pokemon.position(position);
    elements.pokemon.image(sprite);
  }
  
  console.log(Distance.distance(pos, pokemon) + "m");
  updateDistance(pos, pokemon);
}

function clearPokemon() {
  console.log("Call: Tracker.clearPokemon");
  if (pokemon !== null) {
    elements.pokemon.image('images/main_0.png');
    elements.pokemon.position(new Vector2(0, 0));
    pokemon = null;
    clearDistance(); 
  }
}

function updateDistance(pos, pokemon) {
  console.log("Call: Tracker.updateDistance");
  elements.distance.text(Math.round(Distance.distance(pos, pokemon)) + "m");
  elements.distance.color(Themes.currentTheme().textColour);
}

function clearDistance() {
  console.log("Call: Tracker.clearDistance");
  elements.distance.text('');
}

function draw(pos, pokemon) {
  console.log("Call: Tracker.draw");
  if (pokemon.length) {
    updatePokemon(pos.coords, pokemon[0]);
  } else {
    clearPokemon();
  }
}

this.exports = {
  draw: draw,
  init: init
};
