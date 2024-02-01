const fs = require('fs')
fs.readFile('./example', 'utf8', (err, input) => {
    if (err) throw err 

    const regex = /\D+/g;
    let data = input.split('\n').map(str => str.replace(regex, ''));
    let res = data.map(str => parseInt(str[0]+str[str.length-1]))
    //console.log(res.reduce((a, b) => a + b))
})