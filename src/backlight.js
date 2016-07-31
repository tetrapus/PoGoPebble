var Light = require('ui/light');

var Options = require('options');

var enabled = false;
var locked = false;


function onSettingChange() {
  if (Options.getFeatures().enable_backlight && locked && !enabled) {
    enabled = true;
    Light.on();
  } else if (enabled) {
    enabled = false;
    Light.auto();
  }
}

function init() {
  Options.watchUpdate(onSettingChange);
}

function enable() {
  locked = true;
  console.log("enable");
  if (Options.getFeatures().enable_backlight && !enabled) {
    enabled = true;
    console.log("light enabled");
    Light.on();
  }
}

function disable() {
  console.log("disable");
  locked = false;
  if (enabled) {
    console.log("light on auto");
    enabled = false;
    Light.auto();
  }
}

this.exports = {
  init: init,
  enable: enable,
  disable: disable
};
