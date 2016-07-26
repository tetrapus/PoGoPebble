var Vibe = require('ui/vibe');
var UI = require('ui');
var Vector2 = require('vector2');

var Geo = require('geo');

var Constants = require('constants');
var Settings = require('settings');

var Status = require('status');


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
  })
};

var pokemon = null;
var position = null;
var vibeHistory = [];

function init(panel) {
  console.log("Call: Tracker.init");
  panel.add(elements.pokemon);
  panel.on('click', 'select', function() {
    Status.rotate(position, pokemon);
  });
  Status.init(panel);
}

function updatePokemon(pos, new_pokemon) {
  position = pos;
  console.log("Call: Tracker.updatePokemon");
  if (pokemon === null || new_pokemon.id !== pokemon.id) {
    if (pokemon === null || pokemon.pokemonId !== new_pokemon.pokemonId) {
      if (Geo.distance(pos, new_pokemon) < Settings.option('vibration_range') &&
         Settings.option('vibrate' + new_pokemon.pokemonId) &&
         vibeHistory.indexOf(new_pokemon.id) === -1
      ) {
        Vibe.vibrate();
        vibeHistory.push(new_pokemon.id);
        if (vibeHistory.length > 64) {
          vibeHistory.shift();
        }
      }
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

  Status.draw(position, pokemon);
}

function clearPokemon() {
  console.log("Call: Tracker.clearPokemon");
  if (pokemon !== null) {
    elements.pokemon.image('images/main_0.png');
    elements.pokemon.position(new Vector2(0, 0));
    pokemon = null;
    Status.draw(position, pokemon);
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


this.exports = {
  draw: draw,
  init: init
};
