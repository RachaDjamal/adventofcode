const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let data = input.split('\n\n');

    //console.log(data);

    let numberAnswer = 0;

    function checkChar(seenChar, char) {
        for(let i = 0; i < seenChar.length; i++){
            if(seenChar[i] === char || char === '\n') return 1;
        }
        return 0;
    }

    for(const group of data){
        let seenChar = [];
        for (let i = 0; i < group.length; i++) {
            if(checkChar(seenChar, group[i]) === 0) seenChar.push(group[i])
        }
        //console.log(seenChar);
        numberAnswer += seenChar.length;
    }

    console.log(numberAnswer);
})