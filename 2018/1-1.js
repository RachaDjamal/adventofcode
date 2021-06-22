const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
	if (err) throw err
    
    let data = [];
    for(let i = 0; i < input.split('\n').length; i++) {
        data.push(parseInt(input.split('\n')[i]));
    }
    //console.log(data)
    let res = 0;

    for(let i = 0; i < data.length; i++) {
        res += data[i];
    }

    console.log(res);

})