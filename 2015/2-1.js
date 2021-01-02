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

    let totalPaper = 0;
    for(const present of presents) {
        let smallestSide = determineSmallestSide(present);
        let paper = 2*present.l*present.w + 2*present.w*present.h + 2*present.h*present.l + smallestSide;
        totalPaper += paper;
    }

    console.log(totalPaper);

    function determineSmallestSide(present) {
        let sides = [present.l*present.w, present.w*present.h, present.h*present.l];
        sides.sort((a, b) => a - b);
        return sides[0];
    }
})