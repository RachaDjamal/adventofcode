const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
	if (err) throw err

    let data = [];
    for(let i = 0; i < input.split('\n').length; i++) {
        data.push(parseInt(input.split('\n')[i]));
    }

    let currentFrequency = 0;
    let history = new Set;
    let i = 0;

    while(!history.has(currentFrequency)) {
        history.add(currentFrequency);
        currentFrequency += data[i];
        if (i === data.length - 1) i = 0;
        else i++;
    }

    console.log(currentFrequency)
})