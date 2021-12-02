const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const data = input.split('\n')
    
    let x = 0;
    let y = 0;

    for(let i = 0; i < data.length; i++) {
        let count = parseInt(data[i].match(/\d+/g).map(Number));

        if(data[i][0] === 'f') {
            x += count;
        } else if(data[i][0] === 'd') {
            y += count;
        } else if(data[i][0] === 'u') {
            y -= count;
        }
    }
    console.log(x, y, x*y);
})