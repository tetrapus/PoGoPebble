var UI = require('ui');
var Vector2 = require('vector2');

var NAV_HEIGHT = 36;
var SHADOW_HEIGHT = 4;
var CORNER_RADIUS = SHADOW_HEIGHT - 1;
var SPRITE_WIDTH = 36;
var SCREEN_WIDTH = 144;

// Drawing functions

var elements = [];

function draw(panel, pokemon) {
  var i;
  for (i=0; i<elements.length; i++) {
    panel.remove(elements[i]);
  }
  drawBackground(pokemon.length);
  drawPokemon(pokemon);
  for (i=0; i<elements.length; i++) {
    panel.add(elements[i]);
  }
}

function drawPokemon(pokemon) {
  for (var i=0; i<pokemon.length; i++) {
    var pokemonEl = new UI.Image({
      position: new Vector2(SCREEN_WIDTH - (SPRITE_WIDTH * (i + 1)), 0),
      size: new Vector2(SPRITE_WIDTH, SPRITE_WIDTH),
      image: 'images/pokemon'+pokemon[i].pokemonID+'.png',
      compositing: 'set'
    });
    elements.push(pokemonEl);
  }
}

function drawBackground(size) {
    var nav_start_x = SCREEN_WIDTH - (size * SPRITE_WIDTH);
  
    var nav = new UI.Rect({
    position: new Vector2(nav_start_x, 0),
    size: new Vector2(SCREEN_WIDTH, NAV_HEIGHT),
    backgroundColor: 'white',
  });
  var nav_corner = new UI.Circle({
    position: new Vector2(nav_start_x, NAV_HEIGHT - SHADOW_HEIGHT),
    radius: CORNER_RADIUS,
    backgroundColor: 'white'
  });
  var nav_side = new UI.Rect({
    position: new Vector2(nav_start_x - SHADOW_HEIGHT, 0),
    size: new Vector2(SHADOW_HEIGHT, NAV_HEIGHT - SHADOW_HEIGHT),
    backgroundColor: 'white',
  });
  var nav_shadow = new UI.Rect({
    position: new Vector2(nav_start_x, NAV_HEIGHT),
    size: new Vector2(SCREEN_WIDTH, SHADOW_HEIGHT),
    backgroundColor: '#bbbbbb'
  });
  var nav_shadow_corner = new UI.Circle({
    position: new Vector2(nav_start_x, NAV_HEIGHT),
    radius: CORNER_RADIUS,
    backgroundColor: '#bbbbbb'
  });
  elements.push(nav_shadow);
  elements.push(nav_shadow_corner);
  elements.push(nav);
  elements.push(nav_side);
  elements.push(nav_corner);
}

this.exports = {draw: draw};