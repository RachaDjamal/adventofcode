const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err 

    const data = input.split('\r\n');
    const pavé = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
    let password = '';

    let x = 1;
    let y = 1;
    // console.log(data)
    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++) {
            if (data[i][j] === 'U') x === 0 ? x = 0 : x--;
            else if (data[i][j] === 'D') x === 2 ? x = 2 : x++;
            else if (data[i][j] === 'L') y === 0 ? y = 0 : y--;
            else if (data[i][j] === 'R') y === 2 ? y = 2 : y++;
        }
        password += pavé[x][y];
    }
    console.log(password)
})