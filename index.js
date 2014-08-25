var Neopixels = require('neopixels');

// Make an instance of the strip
var neopixels = new Neopixels();

// // When an animation completes
// neopixels.on('end', function() {
//   // Start the animation again
//   neopixels.animate(100, );
// });

var frame = new Buffer(64*3);
frame.fill(0);

for (var i = 0; i < frame.length; i++) {
  frame[i] = Math.random() * 30;
}

neopixels.animate(64, frame);
