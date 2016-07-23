var UI = require('ui');
var Vector2 = require('vector2');

var NAV_HEIGHT = 36;
var SHADOW_HEIGHT = 4;
var CORNER_RADIUS = SHADOW_HEIGHT - 1;
var SPRITE_WIDTH = 36;
var SCREEN_WIDTH = 144;

var SPRITE_SIZE = new Vector2(SPRITE_WIDTH, SPRITE_WIDTH);

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
      position: new Vector2(SCREEN_WIDTH, NAV_HEIGHT),
      size: new Vector2(SCREEN_WIDTH, SHADOW_HEIGHT),
      backgroundColor: '#bbbbbb'
    }),
    shadow_corner: new UI.Circle({
      position: new Vector2(SCREEN_WIDTH, NAV_HEIGHT),
      radius: CORNER_RADIUS,
      backgroundColor: '#bbbbbb'
    })
  }
};

var nearby = [];

function init(panel) {
  console.log("Call: Nearby.init");
  panel.add(elem.navbar.shadow_corner);
  panel.add(elem.navbar.shadow);
  panel.add(elem.navbar.background);
  panel.add(elem.navbar.overhang);
  panel.add(elem.navbar.corner);
}

function draw(panel, pokemon) {
  console.log("Call: Nearby.draw");
  var i;
  var new_nearby = [];
  for (i=1; i<pokemon.length && i < 5; i++) {
    new_nearby.unshift(pokemon[i]);
  }
  if (new_nearby.length === nearby.length) {
    var matches = 0;
    for (i=0; i<new_nearby.length; i++) {
      if (new_nearby[i].pokemonId === nearby[i].pokemonId) {
        matches++;
      }
    }
    if (matches === nearby.length) {
      return;
    }
  }

  drawBackground(nearby.length);

  for (i=0; i<elem.icons.length; ++i) {
    // temporary animation
    var element = elem.icons[i].element;
    element.animate({position: new Vector2(i * SPRITE_WIDTH, -SPRITE_WIDTH)}, 200);
    if (3 - i < nearby.length) {
      console.log(nearby[3-i]);
      drawPokemon(elem.icons[i], nearby[3-i]);
    }
  }
  nearby = new_nearby;
  drawPokemon(nearby);
}

function drawPokemon(icon, pokemon) {
  console.log("Call: Nearby.drawPokemon");
  console.log('images/pokemon'+pokemon.pokemonId+'.png');
  icon.element.queue(function (next) {
    icon.element.image('images/pokemon'+pokemon.pokemonId+'.png');
    next();
  }).animate(
    {position: new Vector2(icon.position * SPRITE_WIDTH, 0)},
    200
  );
}

function drawBackground(size) {
  console.log("Call: Nearby.drawBackground");
  if (size != elem.navbar.size) {
    var nav_start_x = SCREEN_WIDTH - (size * SPRITE_WIDTH);
    elem.navbar.background.animate({position: new Vector2(nav_start_x, 0)});
    elem.navbar.corner.animate({position: new Vector2(nav_start_x, NAV_HEIGHT - SHADOW_HEIGHT)});
    elem.navbar.overhang.animate({position: new Vector2(nav_start_x - SHADOW_HEIGHT, 0)});
    elem.navbar.shadow.animate({position: new Vector2(nav_start_x, NAV_HEIGHT)});
    elem.navbar.shadow_corner.animate({position: new Vector2(nav_start_x, NAV_HEIGHT)});
  }
}

this.exports = {
  draw: draw,
  init: init
};