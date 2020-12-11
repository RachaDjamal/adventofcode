const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n').map(d => parseInt(d));
    let preamble = [];
    let preambleSize = 25;
    let result = 0;

    for(let i = 0; i < preambleSize; i++){
        preamble.push(input[i]);
    }

    

    function isEntryValid(entry) {
        for(let i = 0; i < preamble.length - 1; i++) {
            for(let j = i + 1; j < preamble.length; j++) {
                if(preamble[i] + preamble[j] === entry) {
                    preamble.push(entry);
                    preamble.shift();
                    //console.log(preamble)
                    return true;
                }
            }
        }
        return false;
    }

    for(let entry = preambleSize; entry < input.length; entry++) {
        if(!isEntryValid(input[entry])) {
            result = input[entry];
            break;
        }
    }

    console.log({result});

});