const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n');

    let presents = [];
    for(const present of input) {
        let l = parseInt(present.split('x')[0]);
        let w = parseInt(present.split('x')[1]);
        let h = parseInt(present.split('x')[2]);

        presents.push({l, w, h});
    }

    let totalRibbon = 0;
    for(const present of presents) {
        let smallestPerimeter = determineSmallestPerimeter(present);
        let ribbon = present.l * present.w * present.h + smallestPerimeter;
        totalRibbon += ribbon;
    }

    console.log(totalRibbon);

    function determineSmallestPerimeter(present) {
        let perimeters = [(present.l * 2 + present.w * 2), (present.w * 2 + present.h * 2), (present.l * 2 + present.h * 2)];
        perimeters.sort((a, b) => a - b);
        return perimeters[0];
    }
})