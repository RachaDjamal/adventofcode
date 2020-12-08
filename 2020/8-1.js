const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let instructions = input.split('\n');

    let validIndex = new Set();
    let acc = 0;

    function executeInstructions(index) {
        if(validIndex.has(index)) {
            return acc;
        } else {
            validIndex.add(index);
        }

        if(instructions[index].split(' ')[0] === 'nop') {
            executeInstructions(index + 1);
        } else if (instructions[index].split(' ')[0] === 'acc') {
            acc += parseInt(instructions[index].split(' ')[1]);
            executeInstructions(index + 1);
        } else {
            let jump = parseInt(instructions[index].split(' ')[1]);
            executeInstructions(index + jump);
        }
    }

    
    executeInstructions(0);
    console.log(acc)
});