//const data = require('./data.json');

let wires = [];

function position(x, y)  {
    this.x = x,
    this.y = y
};

wires.push(new position(0, 0));

console.log(wires)