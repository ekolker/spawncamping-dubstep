var Neopixels = require('neopixels');
var art = require('./index.js')

// Make an instance of the strip
var neopixels = new Neopixels();

var s = art.init(neopixels, 8, 8);

// s.party();

s.setPixel(0, 1, {x:0, y:1, r:10, g:10, b:200});
s.setPixel(0, 1, {x:0, y:1, r:200, g:0, b:0, o:0.3});
s.hLine({x:1, y:2, l:3, r:40, g:65, b:10});

s.render();
