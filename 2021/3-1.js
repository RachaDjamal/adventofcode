const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const data = input.split('\n');
    //console.log(data)

    let gamma = '';
    let epsilon = '';

    for(let j = 0; j < data[0].length; j++) {
        let column = '';
        for(let i = 0; i < data.length; i++) {
            column += data[i][j];
        }
        let mostCommon = checkMostCommon(column);
        gamma += mostCommon;

    }

    epsilon = fillEpsilon(gamma);
    console.log(parseInt(gamma, 2)*parseInt(epsilon, 2))

    function fillEpsilon(gamma) {
        let res = '';
        for(let i = 0; i < gamma.length; i ++) {
            if(gamma[i] === '0') {
                res += '1';
            } else {
                res += '0';
            }
        }
        return res;
    }

    function checkMostCommon(str) {
        let one = 0;
        let zero = 0;
        for(let i = 0; i < str.length; i++) {
            if(str[i] === '0') {
                zero++;
            } else {
                one++;
            }
        }
        if(one < zero) {
            return '0';
        } else {
            return '1';
        }
    }
})