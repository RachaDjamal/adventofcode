const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let data = input.split('\n');
    let result = [];
    
    for(let line of data){
        result.push(returnNumber(line))
    }
    console.log(result.reduce((a, b) => a + b))
    
    function returnNumber(line){
        let firstIndex = [];
        let lastIndex = [];
        const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        for(let i = 0; i < numbers.length; i++) {
            if(line.indexOf(numbers[i]) !== -1) firstIndex.push([line.indexOf(numbers[i]), i % 9])
            if(line.lastIndexOf(numbers[i]) !== -1) lastIndex.push([line.lastIndexOf(numbers[i]), i % 9])
            
        }
        const firstDigit = numbers[firstIndex.sort((a, b) => a[0] - b[0])[0][1]];
        const lastDigit = numbers[lastIndex.sort((a, b) => a[0] - b[0]).reverse()[0][1]]
        return parseInt(firstDigit + lastDigit)
    }
})