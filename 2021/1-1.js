const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const data = input.split('\n');
    
    let result = 0;
    for(let i = 0; i < data.length - 1; i++){
        if(parseInt(data[i]) < parseInt(data[i+1])){
            result++;
        }
    }
    console.log(result);

})