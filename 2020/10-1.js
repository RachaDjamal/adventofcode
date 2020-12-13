const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n').map(d => parseInt(d));
    input.push(0);

    let voltage = input.sort((a, b) => a - b);
    voltage.push(voltage[voltage.length - 1] + 3);
    

    let oneStep = 0;
    let threeSteps = 0;

    for(let i = 0; i < input.length - 1; i++) {
        (input[i + 1] - input[i]) === 1 ? oneStep++ : threeSteps++;
    }

    console.log(oneStep, threeSteps)
    console.log(oneStep * threeSteps)

})