var UI = require('ui');
var Vector2 = require('vector2');

var Settings = require('settings');
var Constants = require('constants');

var NAV_HEIGHT = 32;
var SHADOW_HEIGHT = 3;
var CORNER_RADIUS = SHADOW_HEIGHT - 1;
var SPRITE_WIDTH = 36;
var SCREEN_WIDTH = Constants.SCREEN_WIDTH;

var SPRITE_SIZE = new Vector2(SPRITE_WIDTH, NAV_HEIGHT);

// Drawing functions
var elem = {
  icons: [
    {
      pokemon: null,
      position: 0,
      element: new UI.Image({
        position: new Vector2(SPRITE_WIDTH * 0, -SPRITE_WIDTH),
        size: SPRITE_SIZE,
        compositing: 'set'
      })
    },
    {
      pokemon: null,
      position: 1,
      element: new UI.Image({
        position: new Vector2(SPRITE_WIDTH * 1, -SPRITE_WIDTH),
        size: SPRITE_SIZE,
        compositing: 'set'
      })
    },
    {
      pokemon: null,
      position: 2,
      element: new UI.Image({
        position: new Vector2(SPRITE_WIDTH * 2, -SPRITE_WIDTH),
        size: SPRITE_SIZE,
        compositing: 'set'
      })
    },
    {
      pokemon: null,
      position: 3,
      element: new UI.Image({
        position: new Vector2(SPRITE_WIDTH * 3, -SPRITE_WIDTH),
        size: SPRITE_SIZE,
        compositing: 'set'
      })
    },
  ],
  navbar: {
    size: 0,
    background: new UI.Rect({
      position: new Vector2(SCREEN_WIDTH, 0),
      size: new Vector2(SCREEN_WIDTH, NAV_HEIGHT),
      backgroundColor: 'white',
    }),
    corner: new UI.Circle({
      position: new Vector2(SCREEN_WIDTH, NAV_HEIGHT - SHADOW_HEIGHT),
      radius: CORNER_RADIUS,
      backgroundColor: 'white'
    }),
    overhang: new UI.Rect({
      position: new Vector2(SCREEN_WIDTH - SHADOW_HEIGHT, 0),
      size: new Vector2(SHADOW_HEIGHT, NAV_HEIGHT - SHADOW_HEIGHT),
      backgroundColor: 'white',
    }),
    shadow: new UI.Rect({
      position: new Vector2(SCREEN_WIDTH, 0),
      size: new Vector2(SCREEN_WIDTH, NAV_HEIGHT + SHADOW_HEIGHT),
      backgroundColor: '#bbbbbb'
    }),
    shadow_corner: new UI.Circle({
      position: new Vector2(SCREEN_WIDTH, NAV_HEIGHT),
      radius: CORNER_RADIUS,
      backgroundColor: '#bbbbbb'
    }),
    shadow_overhang: new UI.Rect({
      position: new Vector2(SCREEN_WIDTH - SHADOW_HEIGHT, 0),
      size: new Vector2(SHADOW_HEIGHT, NAV_HEIGHT),
      backgroundColor: '#bbbbbb',
    }),
  }
};

var nearby = [];
var offset = 0;

function init(panel) {
  console.log("Call: Nearby.init");
  panel.add(elem.navbar.shadow);
  panel.add(elem.navbar.shadow_overhang);
  panel.add(elem.navbar.shadow_corner);
  panel.add(elem.navbar.background);
  panel.add(elem.navbar.overhang);
  panel.add(elem.navbar.corner);
  for (var i=0; i<elem.icons.length; i++) {
    panel.add(elem.icons[i].element);
  }
}

function draw(panel, pokemon) {
  console.log("Call: Nearby.draw");
  var i;
  var new_nearby = [];
  var new_offset = 0;
  var p1 = pokemon.length? Settings.option("priority" + pokemon[0].pokemonId) : null;
  for (i=1; i<pokemon.length && i < 5; i++) {
    var p2 = Settings.option("priority" + pokemon[i].pokemonId);
    new_nearby.unshift(pokemon[i]);
    if (p2 > p1 || (p2 === p1 && pokemon[0].distance > pokemon[i].distance)) {
      new_offset++;
    }
  }

  if (new_nearby.length === nearby.length) {
    var matches = 0;
    for (i=0; i<new_nearby.length; i++) {
      if (new_nearby[i].pokemonId === nearby[i].pokemonId) {
        matches++;
      }
    }
    if (matches === nearby.length) {
      if (offset !== new_offset) {
        drawBackground(nearby.length, new_offset);
      }
      return;
    }
  }

  nearby = new_nearby;
  drawBackground(nearby.length, new_offset);
  for (i=0; i<elem.icons.length; ++i) {
    // temporary animation
    var icon = elem.icons[i];
    if (3 - i < nearby.length) {
      console.log("drawing");
      drawPokemon(icon, nearby[3-i]);
    } else {
      icon.pokemon = null;
      icon.element.animate({position: new Vector2(i * SPRITE_WIDTH, -SPRITE_WIDTH)}, 200);
    }
  }
}

function drawPokemon(icon, pokemon) {
  console.log("Call: Nearby.drawPokemon");
  if (icon.pokemon === pokemon.pokemonId) return;
  icon.pokemon = pokemon.pokemonId;
  icon.element.animate({position: new Vector2(icon.position * SPRITE_WIDTH, -SPRITE_WIDTH)}, 200);
  icon.element.queue(function (next) { icon.element.image('images/pokemon'+pokemon.pokemonId+'.png'); next(); });
  icon.element.animate({position: new Vector2(icon.position * SPRITE_WIDTH, 0)}, 200);
}

function drawBackground(size, new_offset) {
  console.log("Call: Nearby.drawBackground");
  if (size != elem.navbar.size || offset != new_offset) {
    var nav_start_x = SCREEN_WIDTH - (size * SPRITE_WIDTH);
    var nav_offset_x = nav_start_x + (new_offset * SPRITE_WIDTH);
    elem.navbar.background.animate({position: new Vector2(nav_offset_x, 0)});
    elem.navbar.corner.animate({position: new Vector2(nav_offset_x, NAV_HEIGHT - SHADOW_HEIGHT)});
    elem.navbar.overhang.animate({position: new Vector2(nav_offset_x - SHADOW_HEIGHT, 0)});
    elem.navbar.shadow.animate({position: new Vector2(nav_start_x, 0)});
    elem.navbar.shadow_corner.animate({position: new Vector2(nav_start_x, NAV_HEIGHT)});
    elem.navbar.shadow_overhang.animate({position: new Vector2(nav_start_x - SHADOW_HEIGHT, 0)});
    elem.navbar.size = size;
    offset = new_offset;
  }
}

this.exports = {
  draw: draw,
  init: init
};
