function distance(x, y) {
  var R = 6371e3; // Radius of the earth in km
  var dLat = deg2rad(y.latitude-x.latitude);  // deg2rad below
  var dLon = deg2rad(y.longitude-x.longitude); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(x.latitude)) * Math.cos(deg2rad(y.latitude)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

this.exports = {distance: distance};