var UI = require('ui');
var Vector2 = require('vector2');
var Constants = require('constants');

var Themes = require('themes');
var Geo = require('geo');

var C = Constants.COMPASS;


var POSITION_ORIGIN = new Vector2(0, 0);
var POSITION_MIDDLE = new Vector2(Constants.SCREEN_WIDTH >> 1, Constants.SCREEN_HEIGHT >> 1);
var NEEDLE_RADIUS = C.BODY_RADIUS + C.NEEDLE_DISTANCE + C.NEEDLE_RADIUS;

var PARTITION_STATES = {
  normal: {
    position: new Vector2(0, (Constants.SCREEN_HEIGHT - C.PARTITION_WIDTH) >> 1),
    size: new Vector2(Constants.SCREEN_WIDTH, C.PARTITION_WIDTH),
  },
  expanded: {
    position: new Vector2(0, POSITION_MIDDLE.y - C.BODY_RADIUS - C.RADIUS_BUFFER),
    size: new Vector2(Constants.SCREEN_WIDTH, 2 * (C.BODY_RADIUS + C.RADIUS_BUFFER))
  }
};

var compass = new UI.Circle({
  position: POSITION_MIDDLE,
  radius: C.BODY_RADIUS,
  backgroundColor: Themes.currentTheme().highlightColor,
});

var innerRing = new UI.Circle({
  position: POSITION_MIDDLE,
  radius: C.CENTER_RADIUS + C.RING_WIDTH,
  backgroundColor: Themes.currentTheme().backgroundColor,
});

var innerCircle = new UI.Circle({
  position: POSITION_MIDDLE,
  radius: C.CENTER_RADIUS,
  backgroundColor: Themes.currentTheme().highlightColor
});

var negativeLine = new UI.Rect({
  position: PARTITION_STATES.expanded.position,
  size: PARTITION_STATES.expanded.size,
  backgroundColor: Themes.currentTheme().backgroundColor,
});

var needle = new UI.Circle({
  position: POSITION_MIDDLE,
  radius: C.NEEDLE_RADIUS,
  backgroundColor: Themes.currentTheme().textColor
});

var teamIcon = new UI.Image({
  position: POSITION_ORIGIN,
  size: new Vector2(Constants.SCREEN_WIDTH, Constants.SCREEN_HEIGHT),
  compositing: 'set',
  image: Themes.currentTheme().logo
});

var timeText = new UI.TimeText({
  position: POSITION_ORIGIN,
  size: new Vector2(Constants.SCREEN_WIDTH, C.TIME_HEIGHT),
  text: "%I:%M %p",
  font: 'gothic-28-bold',
  textAlign: 'center',
  color: Themes.currentTheme().textColor
});

var state = {
  blank: true,
  locked: false
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
  panel.add(timeText);
  if (!Themes.currentTheme().logo) {
    negativeLine.position(PARTITION_STATES.normal.position);
    negativeLine.size(PARTITION_STATES.normal.size);
  }
}

function updateCompass(pos, pokemon) {
  console.log("Call: Compass.updateCompass");
  if (state.blank) {
    if (Themes.currentTheme().logo) {
      negativeLine.animate(PARTITION_STATES.normal);
      teamIcon.animate('position', new Vector2(0, Constants.SCREEN_HEIGHT));
    }
    timeText.animate({position: new Vector2(0, -C.TIME_HEIGHT)});
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
      teamIcon.animate('position', POSITION_ORIGIN);
      negativeLine.animate(PARTITION_STATES.expanded);
    }
    timeText.animate({position: POSITION_ORIGIN});
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

function lock() {
  compass.backgroundColor(Themes.currentTheme().lockColor);
  state.locked = true;
}

function unlock() {
  compass.backgroundColor(Themes.currentTheme().highlightColor);
  state.locked = false;
}

function updateTheme(theme) {
  if (state.locked) {
    compass.backgroundColor(theme.lockColor);
  } else {
    compass.backgroundColor(theme.highlightColor);
  }
  innerCircle.backgroundColor(theme.highlightColor);
  innerRing.backgroundColor(theme.backgroundColor);
  negativeLine.backgroundColor(theme.backgroundColor);
  needle.backgroundColor(theme.textColor);
  teamIcon.image(theme.logo);
  timeText.color(theme.textColor);
  if (state.blank && theme.logo) {
    teamIcon.animate('position', POSITION_ORIGIN);
    negativeLine.animate(PARTITION_STATES.expanded);
  } else {
    negativeLine.animate(PARTITION_STATES.normal);
    teamIcon.animate('position', new Vector2(0, Constants.SCREEN_HEIGHT));
  }
}

this.exports = {
  init: init,
  draw: draw,
  lock: lock,
  unlock: unlock
};
