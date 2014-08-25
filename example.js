// Import the neopixels library
var Neopixels = require('neopixels');

// Make an instance of the strip
var neopixels = new Neopixels();

// When an animation completes
neopixels.on('end', function() {
  // Start the animation again
  neopixels.animate(100, Buffer.concat(tracer(100)));
});

/*
* Start an animation!
* First argument is number of pixels per animation frame (usually the number of pixels in your strip)
* The second argument is the animation data
* The third optional argument is a callback on completion

* The library will automatically split the animation up
* into the appropriate number of animation frames
* based on the size of each frame (first argument)
*/
neopixels.animate(100, Buffer.concat(tracer(100)));


// An example animation
function tracer(numLEDs) {
  var trail = 5;
  var arr = new Array(numLEDs);
  for (var i = 0; i < numLEDs; i++) {
    var buf = new Buffer(numLEDs * 3);
    buf.fill(0);
    for (var col = 0; col < 3; col++){
      for (var k = 0; k < trail; k++) {
        buf[(3*(i+numLEDs*col/3)+col+1 +3*k)] = 0xFF*(trail-k)/trail;
      }
    }
    arr[i] = buf;
  }
  return arr;
}
