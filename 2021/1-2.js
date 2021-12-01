const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const data = input.split('\n');
    
    let newData = [];
    for(let i = 0; i < data.length - 2; i++){
        const res = parseInt(data[i]) + parseInt(data[i+1]) + parseInt(data[i+2]);
        newData.push(res);
    }

    let result = 0;
    for(let i = 0; i < newData.length - 1; i++){
        if(newData[i] < newData[i+1]){
            result++;
        }
    }
    console.log(result);
})