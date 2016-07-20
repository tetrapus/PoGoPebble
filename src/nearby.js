var UI = require('ui');
var Vector2 = require('vector2');

var NAV_HEIGHT = 36;
var SHADOW_HEIGHT = 4;
var CORNER_RADIUS = SHADOW_HEIGHT - 1;
var SPRITE_WIDTH = 40;
var SCREEN_WIDTH = 144;

// Drawing functions

function draw(panel) {
  var nav = new UI.Rect({
    position: new Vector2(46, 0),
    size: new Vector2(122, NAV_HEIGHT),
    backgroundColor: 'white',
  });
  var nav_corner = new UI.Circle({
    position: new Vector2(46, NAV_HEIGHT - SHADOW_HEIGHT),
    radius: CORNER_RADIUS,
    backgroundColor: 'white'
  });
  var nav_side = new UI.Rect({
    position: new Vector2(42, 0),
    size: new Vector2(SHADOW_HEIGHT, NAV_HEIGHT - SHADOW_HEIGHT),
    backgroundColor: 'white',
  });
  var nav_shadow = new UI.Rect({
    position: new Vector2(46, NAV_HEIGHT),
    size: new Vector2(122, SHADOW_HEIGHT),
    backgroundColor: '#bbbbbb'
  });
  var nav_shadow_corner = new UI.Circle({
    position: new Vector2(46, NAV_HEIGHT),
    radius: CORNER_RADIUS,
    backgroundColor: '#bbbbbb'
  });
  panel.add(nav_shadow);
  panel.add(nav_shadow_corner);
  panel.add(nav);
  panel.add(nav_side);
  panel.add(nav_corner);
}

this.exports = {draw: draw};