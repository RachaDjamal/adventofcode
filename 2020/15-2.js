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
        
        let current_spoken = input[input.length - 1];

        for (let turn = input.length; turn < end; turn++) {
            if (!said[current_spoken]) {
                said[current_spoken] = turn;
                current_spoken = 0;
            } else {
                let last_turn_was_spoken = said[current_spoken];
                said[current_spoken] = turn;
                current_spoken = turn - last_turn_was_spoken;
            }
        }
    
        return current_spoken;
    }

    // console.log(calculeNumber(2020));
    console.log(calculeNumber(30000000));
})