function screen (neopixels, xDim, yDim) {

  this.x = xDim || 8;
  this.y = yDim || 8;
  this.frame = new Buffer(xDim * yDim * 3);
  this.frame.fill(0);

  this.neo = neopixels;
  return this;
}

function init(neopixels, xDim, yDim) {
  return new screen (neopixels, xDim, yDim);
}

screen.prototype.render = function () {
  this.neo.animate(this.frame.length / 3, this.frame);
}

screen.prototype.modern = function (intensity) {
  intensity = intensity || 30;
  for (var i = 0; i < this.frame.length; i++) {
    this.frame[i] = Math.random() * intensity;
  }
}

screen.prototype.setPixel = function (x, y, options, cb) {

}

exports.screen = screen;
exports.init = init;
