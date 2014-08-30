var Neopixels = require('neopixels');
var art = require('./index.js')

// Make an instance of the strip
var neopixels = new Neopixels();

var s = art.init(neopixels, 8, 8);

// s.party();

s.setPixel(0, 1, {x:0, y:1, r:10, g:10, b:200});
s.setPixel(0, 1, {x:0, y:1, r:200, g:0, b:0, o:0.3});
s.hLine({x:1, y:2, l:5, r:10, g:90, b:10, o:0.9});
s.vLine({x:2, y:4, l:-4, r:10, g:15, b:150, o:0.3});

var turn = false;

setInterval(function () {
  var op = {
    x:Math.floor(Math.random() * 8),
    y:Math.floor(Math.random() * 8),
    l:Math.floor(2 + Math.random() * 6) * sign(Math.random() - 0.5),
    r:Math.random() * 40 + 3,
    g:Math.random() * 40 + 3,
    b:Math.random() * 40 + 3,
    o:Math.random()
  };
  s.fade({percent:0.02});
  if (turn) {
    s.hLine(op);
  } else {
    s.vLine(op);
  }
  turn = !turn;
  s.render();
}, 200);

// setInterval( function () {
//   var op = {
//     x:Math.floor(Math.random() * 8),
//     y:Math.floor(Math.random() * 8),
//     l:Math.floor(2 + Math.random() * 6) * sign(Math.random() - 0.5),
//     r:Math.random() * 40 + 3,
//     g:Math.random() * 40 + 3,
//     b:Math.random() * 40 + 3,
//     o:Math.random()
//   };
// }, 500);

function sign (x) {
  if (isNaN(x)) {
    return NaN;
  } else if (x === 0) {
    return x;
  } else {
    return (x > 0 ? 1 : -1);
  }
};
