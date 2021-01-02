const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let res = 0;
    let position = 1;
    for(const char of input){
        if(char === '(') res++;
        else res--;
        if(res === -1) console.log({position});
        position++;
    }
})