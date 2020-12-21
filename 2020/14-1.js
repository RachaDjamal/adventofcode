const { time, assert } = require('console');
const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n');

    //Verify parsing :
    // let count = 0;
    // for(const line of input) {
    //     if(line.split(' = ')[0] === 'mask')count++;
    // }
    // console.log('count = ', count)
    
    //parse Data :
    function parseData(input) {
        let program = [];
        let index = 0;
        while(index < input.length) {
            let instruction = [];
            if(input[index].split(' = ')[0] === 'mask') {
                let memory = [];
                let mask = input[index].split(' = ')[1];
                index++;
                while(index < input.length && input[index].split(' = ')[0] !== 'mask') {
                    let mem = {
                        adress : input[index].split(' = ')[0].match(/([0-9]+)/g)[0],
                        value : input[index].split(' = ')[1]
                    };
                    memory.push(mem);
                    index++;
                }
                instruction.push(mask, memory);
            }
            program.push(instruction);
        }
        return program;
    }

    
    //Convert strings to base :
    function convertBase(base, number) {
        if(base === 2) {
            let power = 35;
            let value = parseInt(number);
            let result = '';
            while(power > -1) {
                if(value % 2**power !== value) {
                    value %= 2**power;
                    result += '1';
                } else {
                    result += '0';
                }
                power--;
            }
            return result;
        } else {
            let result = 0;
            for(let i = 0; i < number.length; i++) {
                let power = 35 - i;
                if(number[i] === '1') {
                    result += 2**power;
                }
            }
            return result.toString();
        }
    }

    function applyMask(instruction) {
        let mask = instruction[0];
        for(const mem of instruction[1]) {
            let binary = convertBase(2, mem.value);
            let result = '';
            for(let i = 0; i < mask.length; i++) {
                if(mask[i] !== 'X') {
                    mask[i] === '1' ? result += '1' : result += '0';
                } else {
                    result += binary[i];
                }
            }
            mem.value = convertBase(10, result);
        }
        return instruction;
        
    }

    let program = parseData(input);

    //Applymask to all program :
    for(const instruction of program) {
        applyMask(instruction);
    }

    //Parse by adresses :
    let allAdresses = [];
    for(const instruction of program) {
        for(const mem of instruction[1]) {
            let adress = {
                adress : mem.adress,
                value : mem.value
            };
            allAdresses.push(adress);
        }
    }


    //Sum result & avoid visited adresses :
    function sumValues(allAdresses) {
        let visited = new Set;
        let result = 0;
        for(let i = allAdresses.length -1; i > -1; i--) {
            if(visited.has(allAdresses[i].adress) === false) {
                result += parseInt(allAdresses[i].value);
                visited.add(allAdresses[i].adress);
            }
        }
        return result;
    }


    console.log(sumValues(allAdresses));
})