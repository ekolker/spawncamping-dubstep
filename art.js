var Neopixels = require('neopixels');
var art = require('./index.js')

// Make an instance of the strip
var neopixels = new Neopixels();

var s = art.init(neopixels, 8, 8);

s.party();
