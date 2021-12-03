const fs = require('fs');
const { connect } = require('http2');
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const data = input.split('\n');

    let oxygen = getOxygen([...data]);
    let co2 = getCo2([...data]);

    function getOxygen(arr){
        //console.log(arr)
        for(let j = 0; j < arr[0].length; j++) {
            let column = getColumn([...arr], j);
            let mostCommon = checkMostCommon(column);
            for(let i = 0; i < arr.length; i++) {
                if(arr[i][j] != mostCommon && arr.length > 1) {
                    arr.splice(i, 1);
                    i--;
                }
            }
        }
        return arr
    }

    function getCo2(arr){
        //console.log(arr)
        for(let j = 0; j < arr[0].length; j++) {
            let column = getColumn([...arr], j);
            let mostCommon = checkMostCommon(column);
            for(let i = 0; i < arr.length; i++) {
                if(arr[i][j] === mostCommon && arr.length > 1) {
                    arr.splice(i, 1);
                    i--;
                }
            }
        }
        return arr
    }

    console.log(parseInt(oxygen, 2), parseInt(co2, 2), parseInt(oxygen, 2)* parseInt(co2, 2))

    function getColumn(arr, index) {
        let column = '';
        for(let i = 0; i < arr.length; i++) {
            column += arr[i][index];
        }
        return column
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
        if(zero <= one) {
            return '1';
        } else {
            return '0';
        }
    }
})