const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let res = 0;
    for(const char of input){
        if(char === '(') res++;
        else res--;
    }

    console.log(res);
})