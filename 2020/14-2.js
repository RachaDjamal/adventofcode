const { time, assert } = require('console');
const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n');
    
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

    //Count number of floating bits
    function countFloating(mask) {
        let count = 0;
        for(const char of mask) {
            if(char === 'X')count++;
        }
        return count;
    }

    function reverseString(str) {
        let temp = str.split('');
        temp.reverse();
        let res = temp.join('');
        return res;
    }

    //Apply mask to adress
    function applyMask(mask, adress) {
        let binary = convertBase(2, adress);
        let result = '';
        for(let i = 0; i < binary.length; i++) {
            if(mask[i] === 'X') result += 'X';
            else if(mask[i] === '1') result += '1';
            else result += binary[i];
        }
        return result;
    }

    function generateWays(floatingBits) {
        let ways = [];
        for(let i = 0; i < 2 ** floatingBits; i++) {
            let way = [];
            for(let j = 0; j < floatingBits; j++) {
                let step = 2 ** j;
                let result = i;
                let iteration = Math.trunc(result / step) % 2;
                way.push(iteration.toString())
            }
            ways.push(way);
        }
        return ways;
    }

    let allAdresses = [];
    //Create all new memory adresses
    function generateAdresses(instruction) {
        let mask = instruction[0];
        let floatingBits = countFloating(mask);
        let ways = generateWays(floatingBits);
        // console.log(ways);
        for(const adresses of instruction[1]) {
            let value = adresses.value;
            let tempAdress = applyMask(mask, adresses.adress);
            for(let i = 0; i < 2 ** floatingBits; i++) {
                let result = '';
                let index = 0;
                for(let j = tempAdress.length - 1; j > -1; j--) {
                    if(tempAdress[j] === 'X') {
                        result += ways[i][index];
                        index++;
                    } else {
                        result += tempAdress[j];
                    }
                }
                result = reverseString(result);
                // console.log(convertBase(10, result));
                let adress = convertBase(10, result);
                // console.log(adress)
                allAdresses.push({adress, value});
            }
        }
    }

    let program = parseData(input);

    // console.log(allAdresses);
    
    for(const instruction of program) {
        generateAdresses(instruction);
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