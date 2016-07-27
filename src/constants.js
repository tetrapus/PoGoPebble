var Feature = require('platform/feature');

var filemap = {
  WATCHFACE: {
    EVENTS: 'events_wf'
  },
  WATCHAPP: {
    EVENTS: 'events_wa'
  }
};

this.exports = {
  MODULES: filemap.WATCHFACE,
  Geolocation: {
    OPTIONS: {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 10000
    }
  },
  Navbar: {
    
  },
  COMPASS: {
    BODY_RADIUS: 32,
    NEEDLE_RADIUS: 2,
    NEEDLE_DISTANCE: 6,
    RING_WIDTH: 4,
    CENTER_RADIUS: 8,
    RADIUS_BUFFER: 2,
    TIME_HEIGHT: 36,
    PARTITION_WIDTH: 6,
  },
  SPRITE_ELEMS: 2,
  SCREEN_WIDTH: Feature.resolution().x,
  SCREEN_HEIGHT: Feature.resolution().y,
  DISTANCE_HPAD: 4,
  DISTANCE_HEIGHT: 38
};