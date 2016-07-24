var UI = require('ui');
var Vector2 = require('vector2');
var Constants = require('constants');

var Themes = require('themes');
var Geo = require('geo');


var POSITION_MIDDLE = new Vector2(Constants.SCREEN_WIDTH >> 1, Constants.SCREEN_HEIGHT >> 1);
var NEEDLE_RADIUS = 40;

var compass = new UI.Circle({
  position: POSITION_MIDDLE,
  radius: 32,
  backgroundColor: Themes.currentTheme().highlightColor,
});

var innerRing = new UI.Circle({
  position: POSITION_MIDDLE,
  radius: 12,
  backgroundColor: Themes.currentTheme().backgroundColor,
});

var innerCircle = new UI.Circle({
  position: POSITION_MIDDLE,
  radius: 8,
  backgroundColor: Themes.currentTheme().highlightColor
});

var negativeLine = new UI.Rect({
  position: new Vector2(0, (Constants.SCREEN_HEIGHT >> 1) - 32),
  size: new Vector2(Constants.SCREEN_WIDTH, 64),
  backgroundColor: Themes.currentTheme().backgroundColor,
});

var needle = new UI.Circle({
  position: POSITION_MIDDLE,
  radius: 2,
  backgroundColor: Themes.currentTheme().textColor
});

var teamIcon = new UI.Image({
  position: new Vector2(0, 0),
  size: new Vector2(Constants.SCREEN_WIDTH, Constants.SCREEN_HEIGHT),
  compositing: 'set',
  image: Themes.currentTheme().logo
});

var state = {
  blank: true
};


function init(panel) {
  console.log("Call: Compass.init");
  Themes.watchUpdate(updateTheme);
  panel.add(compass);
  panel.add(negativeLine);
  panel.add(innerRing);
  panel.add(innerCircle);
  panel.add(needle);
  panel.add(teamIcon);
}

function updateCompass(pos, pokemon) {
  console.log("Call: Compass.updateCompass");
  if (state.blank && Themes.currentTheme().logo) {
    negativeLine.animate({
      position: new Vector2(0, (Constants.SCREEN_HEIGHT >> 1) - 3),
      size: new Vector2(Constants.SCREEN_WIDTH, 6),
    });
    teamIcon.animate('position', new Vector2(0, Constants.SCREEN_HEIGHT));
  }
  state.blank = false;
  var bearing = Geo.bearing(pos, pokemon) - Math.PI / 2;
  var needlePos = new Vector2(
    POSITION_MIDDLE.x + NEEDLE_RADIUS * Math.cos(bearing),
    POSITION_MIDDLE.y + NEEDLE_RADIUS * Math.sin(bearing)
  );
  // TODO: circular animation
  needle.animate({position: needlePos});
}

function clearCompass() {
  console.log("Call: Compass.clearCompass");
  if (!state.blank) {
    needle.animate({position: POSITION_MIDDLE});
    if (Themes.currentTheme().logo) {
      teamIcon.animate('position', new Vector2(0, 0));
      negativeLine.animate({
        position: new Vector2(0, (Constants.SCREEN_HEIGHT >> 1) - 33),
        size: new Vector2(Constants.SCREEN_WIDTH, 66),
      });
    }
  }
  state.blank = true;
}

function draw(pos, pokemon) {
  console.log("Call: Compass.draw");
  if (pokemon.length) {
    updateCompass(pos.coords, pokemon[0]);
  } else {
    clearCompass();
  }
}

function updateTheme(theme) {
  compass.backgroundColor(theme.highlightColor);
  innerCircle.backgroundColor(theme.highlightColor);
  innerRing.backgroundColor(theme.backgroundColor);
  negativeLine.backgroundColor(theme.backgroundColor);
  needle.backgroundColor(theme.textColor);
  teamIcon.image(theme.logo);
  if (state.blank && theme.logo) {
    teamIcon.animate('position', new Vector2(0, 0));
    negativeLine.animate({
      position: new Vector2(0, (Constants.SCREEN_HEIGHT >> 1) - 33),
      size: new Vector2(Constants.SCREEN_WIDTH, 66),
    });
  } else {
      negativeLine.animate({
      position: new Vector2(0, (Constants.SCREEN_HEIGHT >> 1) - 3),
      size: new Vector2(Constants.SCREEN_WIDTH, 6),
    });
    teamIcon.animate('position', new Vector2(0, Constants.SCREEN_HEIGHT));
  }
}

this.exports = {init: init, draw: draw};