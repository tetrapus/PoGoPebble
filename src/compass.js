var UI = require('ui');
var Vector2 = require('vector2');

var body = new UI.Circle({
  position: new Vector2(72, 84),
  radius: 32,
  backgroundColor: 'white',
});
/*
var needle = new UI.Circle({
  position: new Vector2(45, 52),
  radius: 2,
  backgroundColor: 'white'
});*/

function draw(panel) {
  panel.add(body);
  // panel.add(needle); 
}

this.exports = {draw: draw};