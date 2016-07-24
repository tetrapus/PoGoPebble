var UI = require('ui');
var Vector2 = require('vector2');

var Geo = require('geo');
var leftPad = require('leftpad');

var Constants = require('constants');
var Themes = require('themes');
var Data = require('data');


var POSITION_LEFT = new Vector2(
  -Constants.SCREEN_WIDTH,
  Constants.SCREEN_HEIGHT - Constants.DISTANCE_HEIGHT
);
var POSITION_VISIBLE = new Vector2(
  Constants.DISTANCE_HPAD,
  Constants.SCREEN_HEIGHT - Constants.DISTANCE_HEIGHT
);
var POSITION_RIGHT = new Vector2(
  Constants.SCREEN_WIDTH,
  Constants.SCREEN_HEIGHT - Constants.DISTANCE_HEIGHT
);

var TEXT_SIZE = new Vector2(
  Constants.SCREEN_WIDTH - 2 * (Constants.DISTANCE_HPAD),
  Constants.DISTANCE_HEIGHT
);


var element = new UI.Text({
  position: POSITION_VISIBLE,
  size: TEXT_SIZE,
  font: 'gothic-24-bold',
  textAlign: 'center',
  color: Themes.currentTheme().textColor
});
    
var placeholder = new UI.Text({
  position: POSITION_LEFT,
  size: TEXT_SIZE,
  font: 'gothic-24-bold',
  textAlign: 'center',
  color: Themes.currentTheme().textColor
});

function getPokemonSummary(position, pokemon) {
  return getLocation(position, pokemon)+ ", " +
    getDespawn(position, pokemon);
}

function getLocation(position, pokemon) {
  return Math.round(Geo.distance(position, pokemon)) + "m " +
    Geo.direction(Geo.bearing(position, pokemon));
}

function getDespawn(position, pokemon) {
  var remaining = pokemon.expiration_time - (Date.now() / 1000);
  if (remaining >= 60) {
    return Math.floor(remaining / 60) + ':' + leftPad(Math.round(remaining % 60), 2, 0);
  } else {
    return Math.round(remaining % 60) + 's';
  }
}

function getTime(position, pokemon) {
  var date = new Date();
  return Data.months[date.getMonth()] + " " +
    date.getDate() + ", " +
    leftPad(date.getHours(), 2, 0) + ":" +
    leftPad(date.getMinutes(), 2, 0);
}

function getPokemonName(position, pokemon) {
  return Data.pokemon[pokemon.pokemonId];
}

var providers = [
  getPokemonSummary,
  getPokemonName,
  getTime,
];

function init(panel) {
  Themes.watchUpdate(updateTheme);
  if (localStorage.getItem("provider") === null) {
    localStorage.setItem("provider", 0);
  }
  panel.add(element);
  panel.add(placeholder);
}

function draw(position, pokemon) {
  if (pokemon === null) {
    clear();
  } else {
    update(position, pokemon);
  }
}

function rotate(position, pokemon) {
  localStorage.setItem(
    'provider',
    (parseInt(localStorage.getItem('provider')) + 1) % providers.length
  );
  if (pokemon !== null) {
    var temp = element;
    element = placeholder;
    placeholder = temp;
    update(position, pokemon);
    element.position(POSITION_RIGHT);
    placeholder.animate({position: POSITION_LEFT});
    element.animate({position: POSITION_VISIBLE});
  }
}
  
function update(position, pokemon) {
  var text = providers[localStorage.getItem('provider')](position, pokemon);
  element.text(text);
}

function clear() {
  element.text('');
}

function updateTheme(theme) {
  element.color(theme.textColor);
  placeholder.color(theme.textColor);
}


this.exports = {
  init: init,
  draw: draw,
  rotate: rotate,
};