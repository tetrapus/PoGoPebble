var UI = require('ui');
var Vector2 = require('vector2');

function draw(panel) {
  var nav = new UI.Rect({
    position: new Vector2(46, 0),
    size: new Vector2(122, 36),
    backgroundColor: 'white',
  });
  var nav_corner = new UI.Circle({
    position: new Vector2(46, 32),
    radius: 3,
    backgroundColor: 'white'
  });
  var nav_side = new UI.Rect({
    position: new Vector2(42, 0),
    size: new Vector2(4, 32),
    backgroundColor: 'white',
  });
  var nav_shadow = new UI.Rect({
    position: new Vector2(46, 36),
    size: new Vector2(122, 4),
    backgroundColor: '#bbbbbb'
  });
  var nav_shadow_corner = new UI.Circle({
    position: new Vector2(46, 36),
    radius: 3,
    backgroundColor: '#bbbbbb'
  });
  panel.add(nav_shadow);
  panel.add(nav_shadow_corner);
  panel.add(nav);
  panel.add(nav_side);
  panel.add(nav_corner);
}

this.exports = {draw: draw};