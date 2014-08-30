function screen (neopixels, xDim, yDim) {

  this.x = xDim || 8;
  this.y = yDim || 8;
  this.frame = new Buffer(xDim * yDim * 3);
  this.frame.fill(0);

  this.neo = neopixels;
  return this;
};

function init(neopixels, xDim, yDim) {
  return new screen (neopixels, xDim, yDim);
};

screen.prototype.render = function () {
  this.neo.animate(this.frame.length / 3, this.frame);
};

screen.prototype.modern = function (intensity) {
  intensity = intensity || 30;
  for (var i = 0; i < this.frame.length; i++) {
    this.frame[i] = Math.random() * intensity;
  }
};

screen.prototype.party = function () {
  var self = this;
  self.modern();
  self.render();
  self.neo.once('end', function() {
    self.party();
  });
};

screen.prototype.setPixel = function (x, y, options, cb) {
  /*
  options
    r - 0-255
    g - 0-255
    b - 0-255
    o - 0-1.0
  */
  var err = null;
  if (x >= 0 && x <= this.x-1 && y >=0 && y <= this.y-1) {
    options.o = options.o || 1;
    this.frame[3 * (x + this.y * y)] =
      this.frame[3 * (x + this.y * y)] * (1 - options.o) +
      options.o * options.g;
    this.frame[3 * (x + this.y * y) + 1] =
      this.frame[3 * (x + this.y * y) + 1] * (1 - options.o) +
      options.o * options.r;
    this.frame[3 * (x + this.y * y) + 2] =
      this.frame[3 * (x + this.y * y) + 2] * (1 - options.o) +
      options.o * options.b;
  } else {
    err = new Error('invalid coordiantes');
  }
  cb && cb(err);
};

screen.prototype.hLine = function (options) {
  /*
  x
  y
  l
  r
  g
  b
  o
  */
  for (var i = 0; i < Math.abs(options.l); i++) {
    var pix = (options.x + (sign(options.l) * i));
    if ( pix >= 0 && pix <= (this.x - 1)) {
      this.setPixel(pix, options.y, options);
    } else {
      break;
    }
  }
};

screen.prototype.vLine = function (options) {
  /*
  x
  y
  l
  r
  g
  b
  o
  */
  for (var i = 0; i < Math.abs(options.l); i++) {
    var pix = (options.y + (sign(options.l) * i));
    if ( pix >= 0 && pix <= (this.y - 1)) {
      this.setPixel(options.x, pix, options);
    } else {
      break;
    }
  }
};

screen.prototype.fade = function (options) {
  options.percent = options.percent || 0.05;
  for (var i = 0; i < this.frame.length; i++) {
    this.frame[i] = this.frame[i] * (1.0-options.percent);
  }
}

screen.prototype.line = function (options) {
  /*
  options
    r  - 0-255
    g  - 0-255
    b  - 0-255
    o  - 0-1.0
    x1 - 0-this.x
    y1 - 0-this.x
    x2 - 0-this.y
    y2 - 0-this.y
  */
  var x1 = options.x1;
  var x2 = options.x2;
  var y1 = options.y1;
  var y2 = options.y2;
  if (options.x1 > options.x2) {
    x1 = options.x2;
    x2 = options.x1;
    y1 = options.y2;
    y2 = options.y1;
  }
  var slope = (y2 - y1) / (x2 - x1);
  var theta = Math.atan(slope);

  var x0 = Math.floor(x1);
  var y0 = Math.floor(y1);
  var xf = Math.ciel(x2);
  var yf = Math.ciel(y2);

  for (var x = x0; x < xf; x++) {
    for (var y = y0; y < yf; y++) {
      this.setPixel(x, y, options);
    }
  }

}

function sign (x) {
  if (isNaN(x)) {
    return NaN;
  } else if (x === 0) {
    return x;
  } else {
    return (x > 0 ? 1 : -1);
  }
};

exports.screen = screen;
exports.init = init;
