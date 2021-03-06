var geocoder = require('geocoder');
var axios = require('axios');
var key = require('../config.js');
key = key;

//For the most part, this function works, but notice comments below

var apiHelper = function(locationInformation, callback) {
  geocoder.geocode(locationInformation, function(err, data, key) {
    var lat = data.results[0].geometry.location.lat;
    lat = lat.toString();
    var long = data.results[0].geometry.location.lng;
    long = long.toString();
    callback(lat, long);
  });
};

module.exports = apiHelper;
