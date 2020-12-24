const { time, assert } = require('console');
const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let tempFields = input.split('\n\n')[0].split('\n');
    let myTicket = input.split('\n\n')[1].split('\n')[1].split(',').map((a) => parseInt(a));
    let tempNearbyTickets = input.split('\n\n')[2].split(':\n')[1].split('\n');
    
    //Parse nearby tickets
    let nearbyTickets = [];
    for (const ticket of tempNearbyTickets) {
        for(const value of ticket.split(',')) {
            nearbyTickets.push(value);
        }
    }
    

    //Parse fields.
    let fields = [];
    for(const field of tempFields) {
        let ranges = [];
        let type = field.split(': ')[0]
        let tempRanges = field.split(': ')[1].split('\n');
        for(const tempRange of tempRanges) {
            let temp = tempRange.split(' or ');
            let range = [];
            for(const elem of temp) {
                let min = elem.split('-')[0];
                let max = elem.split('-')[1];
                range.push({min, max});
            }
            ranges.push(range)
        }
        fields.push({type, ranges});
    }

    //Verify validity of value
    function isValid(value, fields) {
        for(const field of fields) {
            for(const ranges of field.ranges) {
                for(const range of ranges) {
                    if(range.min <= value && range.max >= value) return true;
                }
            }
        }
        return false;
    }
    
    //Stock all invalidValues to sum up.
    let invalidValues = [];
    for(const value of nearbyTickets) {
        let num = parseInt(value);
        if(isValid(num, fields) === false) invalidValues.push(num);
    }

    //Apply addition
    let result = invalidValues.reduce((acc, curr) => acc + curr);

    
    console.log(result)
})