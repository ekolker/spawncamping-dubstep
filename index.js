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

screen.prototype.party = function () {
  var self = this;
  self.modern();
  self.render();
  self.neo.once('end', function() {
    self.party();
  });
}

screen.prototype.setPixel = function (x, y, options, cb) {
  /*
  options
    r - 0-255
    g - 0-255
    b - 0-255
    a - 0-1.0
  */
  options.a = options.a || 1;
  this.frame[3 * (x + this.y * y)] =
    this.frame[3 * (x + this.y * y)] * (1 - options.a) +
    options.a * options.g;
  this.frame[3 * (x + this.y * y) + 1] =
    this.frame[3 * (x + this.y * y) + 1] * (1 - options.a) +
    options.a * options.r;
  this.frame[3 * (x + this.y * y) + 2] =
    this.frame[3 * (x + this.y * y) + 2] * (1 - options.a) +
    options.a * options.b;
  cb && cb();
}

exports.screen = screen;
exports.init = init;
