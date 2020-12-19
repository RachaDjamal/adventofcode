const { time } = require('console');
const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let data = input.split('\n')[1].split(',');

    let buses = [];

    for(let index = 0; index < data.length; index++) {
        if(data[index] !== "x") {
            let ID = parseInt(data[index]);
            buses.push({index, ID});
        }
    }

    buses.sort((a, b) => b.ID - a.ID);

    let t = buses[0].ID - buses[0].index;

    let step = buses[0].ID;

    for(let i = 1; i < buses.length; i++) {
        while((t + buses[i].index) % buses[i].ID !==0) {
            t += step;
        }
        step = step * buses[i].ID;
    }

    console.log(t);
})