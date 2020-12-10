const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n');

    let instructions = [];

    for (const instruction of input) {
        let obj = {
            type: instruction.split(' ')[0],
            offset: parseInt(instruction.split(' ')[1])
        };
        instructions.push(obj);
    }

    //console.log(instructions);

    let validIndex = new Set();
    let testedIndex = new Set();
    let stateChange = false;

    let change = {
        index: 0,
        acc: 0,
        type: ''
    };

    let acc = 0;

    function executeInstructions(index) {
        //console.log(index);
        if(instructions[index]) {
            if(validIndex.has(index)) {
                validIndex.clear();
                stateChange = false;
                instructions[change.index].type = change.type;
                acc = change.acc;
                return executeInstructions(change.index);
                //console.log('Nope');
                
            } else {
                validIndex.add(index);
                //console.log(validIndex.size)
            }

            //console.log(instructions[index].type !== 'acc', !stateChange, !testedIndex.has(index));
            if(instructions[index].type !== 'acc' && !stateChange && !testedIndex.has(index)) {
                change.index = index;
                change.acc = acc;
                change.type = instructions[index].type;
                console.log(change);
                stateChange = true;
                testedIndex.add(index);
                instructions[index].type = change.type === 'nop' ? 'jmp' : 'nop';
            }


            if(instructions[index].type === 'nop') {
                executeInstructions(index + 1);
            } else if (instructions[index].type === 'acc') {
                acc += instructions[index].offset;
                executeInstructions(index + 1);
            } else {
                let jump = instructions[index].offset;
                executeInstructions(index + jump);
            }

        } else {
            console.log('Yes');
            return acc;
        }
    }
    
    executeInstructions(0);
    
    console.log(acc)
});