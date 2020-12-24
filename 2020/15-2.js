const { time, assert } = require('console');
const fs = require('fs')
fs.readFile('./test', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split(',');

    function calculeNumber(end) {
        const said = Array(end);

        for (let i = 0; i < input.length - 1; i++) {
            let num = input[i];
            said[num] = i + 1;
        }
        
        let currentSpoken = input[input.length - 1];

        for (let turn = input.length; turn < end; turn++) {
            if (!said[currentSpoken]) {
                said[currentSpoken] = turn;
                currentSpoken = 0;
            } else {
                let lastSpoken = said[currentSpoken];
                said[currentSpoken] = turn;
                currentSpoken = turn - lastSpoken;
            }
        }
    
        return currentSpoken;
    }

    // console.log(calculeNumber(2020));
    console.log(calculeNumber(30000000));
})