var Vibe = require('ui/vibe');
var UI = require('ui');
var Vector2 = require('vector2');

var Geo = require('geo');
var Themes = require('themes');

var Constants = require('constants');

var leftPad = require('leftpad');


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
    font: 'gothic-24-bold',
    textAlign: 'center',
    color: Themes.currentTheme().textColor
  }),
  despawn: new UI.Text({
    position: new Vector2(
      Constants.DISTANCE_HPAD,
      Constants.SCREEN_HEIGHT - Constants.DISTANCE_HEIGHT
    ),
    size: new Vector2(
      Constants.SCREEN_WIDTH - 2 * (Constants.DISTANCE_HPAD),
      Constants.DISTANCE_HEIGHT
    ),
    font: 'gothic-24-bold',
    textAlign: 'center',
    color: Themes.currentTheme().textColor
  })
};

var pokemon = null;
var position = null;

function init(panel) {
  console.log("Call: Tracker.init");
  Themes.watchUpdate(updateTheme);
  panel.add(elements.pokemon);
  panel.add(elements.distance);
  //panel.add(elements.despawn);
}


function updatePokemon(pos, new_pokemon) {
  position = pos;
  console.log("Call: Tracker.updatePokemon");
  if (pokemon === null || new_pokemon.id !== pokemon.id) {
    if (pokemon === null || pokemon.pokemonId !== new_pokemon.pokemonId) {
      Vibe.vibrate();
    }

    pokemon = new_pokemon;

    var sprite = 'images/main_' + Math.floor(pokemon.pokemonId / Constants.SPRITE_ELEMS) + '.png';
    var offset = new Vector2(
      -Constants.SCREEN_WIDTH * (pokemon.pokemonId % Constants.SPRITE_ELEMS),
      0
    );
    console.log(sprite);
    console.log(pokemon.pokemonId);
    elements.pokemon.position(offset);
    elements.pokemon.image(sprite);
  }
  
  console.log(Geo.distance(pos, pokemon) + "m");
  updateDistance();
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

function updateDistance() {
  console.log("Call: Tracker.updateDistance");
  elements.distance.text(
    Math.round(Geo.distance(position, pokemon)) + "m " +
    Geo.direction(Geo.bearing(position, pokemon)) + ", " +
    getDespawn()
  );
}

function clearDistance() {
  console.log("Call: Tracker.clearDistance");
  elements.distance.text('');
}

function getDespawn() {
  var remaining = pokemon.expiration_time - (Date.now() / 1000);
  if (remaining >= 60) {
    return Math.floor(remaining / 60) + ':' + leftPad(Math.round(remaining % 60), 2, 0);
  } else {
    return Math.round(remaining % 60) + 's';
  }
}

function draw(pos, pokemon) {
  console.log("Call: Tracker.draw");
  if (pokemon.length) {
    updatePokemon(pos.coords, pokemon[0]);
  } else {
    clearPokemon();
  }
}

function updateTheme(theme) {
  elements.distance.color(theme.textColor);
}

this.exports = {
  draw: draw,
  init: init,
  updateDistance: updateDistance
};
