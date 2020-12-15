const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n').map(d => parseInt(d));
    input.push(0);

    let voltage = input.sort((a, b) => a - b);
    voltage.push(voltage[voltage.length - 1] + 3);
    
    //console.log(voltage);
    let operations = [];
    operations.push(0);

    for (let i = 1; i < voltage.length; i++) {
        let operation = 0;
        //console.log(voltage[i] + 3, voltage[i + 3])
        if(voltage[i] + 3 === voltage[i + 3] && voltage[i] + 2 === voltage[i + 2] && voltage[i] + 1 === voltage[i + 1]) {
            operation = 3;
        } else if(voltage[i] + 2 === voltage[i + 2] && voltage[i] + 1 === voltage[i + 1]) {
            operation = 2;
        } else {
            operation = 1;
        }
        //console.log(operation)
        operations.push(operation);
    }

    let result = [];
    let index = 1;
    result.push(1);

    for(let i = operations.length - 1; i > -1; i--) {
        if(operations[i] === 1) {
            result.push(result[index - 1]);
        } else if(operations[i] === 2) {
            result.push(result[index - 1] + result[index - 2]);
        } else {
            result.push(result[index - 1] + result[index - 2] + result[index - 3])
        }
        index++;
    }
    console.log(result.reverse()[0]);
})