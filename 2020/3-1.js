const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    
    let data = [];
    data = input.split('\n');
    //console.log(data);

    let positions = [];
    let dataSize = data.length;
    let sizeLine = data[0].length;
    
    class Position {
        constructor(previousX, previousY) {
            this.x = previousX;
            this.y = previousY;
            this.nextPos();
        }
        nextPos() {
            this.x += 1; //Don't forget to change value according to the Slope you need.
            this.y += 2; //Don't forget to change value according to the Slope you need.
        }
    }

    let origin = new Position(-1, -2); //Don't forget to change value according to the Slope you need.
    positions.push(origin);

    for(let i = 0; i < data.length; i++){
        positions.push(new Position(positions[i].x, positions[i].y));
    }

    function verifyTree(data, position) {
        let tree = false;
        //console.log(position.x);
        if(position.y > dataSize) return false;

        if(data[position.y][position.x % sizeLine] === '#') tree = true;
        return tree;
    }

    let count = 0;

    for(let k = 0; k < data.length; k++) {
        if(verifyTree(data, positions[k]) === true) count++;
    }

    console.log(count);
    //console.log(data.length, positions.length);
})