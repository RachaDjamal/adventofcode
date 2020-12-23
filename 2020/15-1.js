const { time, assert } = require('console');
const fs = require('fs')
fs.readFile('./test', 'utf8', (err, input) => {
    if (err) throw err

    let startingNumbers = input.split(',');

    //Fill allNumbers with startingNumbers
    let allNumbers = [];
    for(const [i, entry] of startingNumbers.entries()) {
        let turn = i + 1;
        let number = parseInt(entry);
        allNumbers.push({number, turn})
    }
    
    //Checking if lastSpoken is new
    function checkArray(lastSpoken) {
        for(let i = 0; i < lastSpoken.turn -1; i++) {
            if(allNumbers[i].number === lastSpoken.number) return false;
        }
        return true;
    }

    //Calculate the next number to be spoken
    function calculateNumber(lastSpoken) {
        for(let i = lastSpoken.turn - 2; i > -1; i--) {
            if(allNumbers[i].number === lastSpoken.number) {
                let result = (lastSpoken.turn - allNumbers[i].turn)
                return result;
            }
        }
    }

    //Setting end to 2020 to avoid infinite loop and have the result
    let end = 2020;
    for(let index = allNumbers.length; index < end; index++) {
        let turn = index + 1;
        let lastSpoken = allNumbers[index - 1];
        if(checkArray(lastSpoken) === true) {
            let number = 0;
            allNumbers.push({number, turn});
        } else {
            let number = calculateNumber(lastSpoken);
            allNumbers.push({number, turn});
        }
    }

    console.log(allNumbers[allNumbers.length - 1])
})