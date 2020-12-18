const { time } = require('console');
const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let timestamp = input.split('\n')[0];

    let data = input.split('\n')[1].match(/(\d+)/g);

    let buses = [];

    for (const bus of data) {
        buses.push(parseInt(bus));
    }

    let arrivals = [];

    for(const bus of buses) {
        let temp = timestamp;
        while(temp % bus !== 0) temp++;
        arrivals.push([temp, bus]);
    }

    let firstDeparture = arrivals.sort()[0];

    let waitingTime = firstDeparture[0] - timestamp;

    let result = waitingTime * firstDeparture[1];

    console.log(result)
})