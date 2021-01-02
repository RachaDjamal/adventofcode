const fs = require('fs')
fs.readFile('./test', 'utf8', (err, input) => {
    if (err) throw err
    
    input = input.split('\n');

    let neighbors = [];
    for(let i = 0; i < input.split('\n').length; i++) {
        let filling = '';
        for(let j = 0; j < input.split('\n')[0].length; j++) {
            filling += '.';
        }
        neighbors.push(filling);
    }
    
    let initialState = [];
    for(let z = -1; z < 2; z++) {
        let dimension = [];
        if(z === 0) dimension = input;
        else dimension = neighbors;
        initialState.push({z, dimension});
    }

    
    console.log(initialState)
})