const fs = require('fs')
fs.readFile('./example', 'utf8', (err, input) => {
    if (err) throw err

    let games = input.split('\r\n').map(a => a.split(': ')[1]);
    games.map(a => a.split('; '))
    console.log(games)
})