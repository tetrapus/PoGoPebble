function distance(x, y) {
  var R = 6371e3; // Radius of the earth in km
  var dLat = radians(y.latitude-x.latitude);
  var dLon = radians(y.longitude-x.longitude); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(radians(x.latitude)) * Math.cos(radians(y.latitude)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function radians(n) {
  return n * (Math.PI / 180);
}

function bearing(here, there){
  var startLat = radians(here.latitude);
  var startLong = radians(here.longitude);
  var endLat = radians(there.latitude);
  var endLong = radians(there.longitude);

  var dLong = endLong - startLong;

  var dPhi = Math.log(Math.tan(endLat/2.0+Math.PI/4.0)/Math.tan(startLat/2.0+Math.PI/4.0));
  if (Math.abs(dLong) > Math.PI){
    if (dLong > 0.0)
       dLong = -(2.0 * Math.PI - dLong);
    else
       dLong = (2.0 * Math.PI + dLong);
  }

  return Math.atan2(dLong, dPhi);
}

function direction(bearing) {
  var idx = Math.floor(bearing / radians(22.5) + radians(0.5)) + 16;
  return ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"][idx % 16];
}

this.exports = {
  distance: distance,
  bearing: bearing,
  direction: direction
};
