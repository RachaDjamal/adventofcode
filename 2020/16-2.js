const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let tempFields = input.split('\n\n')[0].split('\n');
    let myTicket = input.split('\n\n')[1].split('\n')[1].split(',').map((a) => parseInt(a));
    let tempNearbyTickets = input.split('\n\n')[2].split(':\n')[1].split('\n');
    
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
    
    //Parse nearby tickets with only valid ones
    let nearbyTickets = [];
    for (const tempTicket of tempNearbyTickets) {
        const ticket = tempTicket.split(',').map((a) => parseInt(a));
        if(isValidTicket(ticket, fields) === true) nearbyTickets.push(ticket);
    }
    

    //Verify validity of value
    function isValidValue(value, fields) {
        for(const field of fields) {
            for(const ranges of field.ranges) {
                for(const range of ranges) {
                    if(range.min <= value && range.max >= value) return true;
                }
            }
        }
        return false;
    }

    //Verify validity of ticket
    function isValidTicket(ticket, fields) {
        for(const value of ticket) {
            if(isValidValue(value, fields) === false) return false;
        }
        return true;
    }
    
    //Arrange arguments by position to test fields
    let fieldOrder = [];
    for(let i = 0; i < nearbyTickets[0].length; i++) {
        let ticketField = [];
        ticketField.push(myTicket[i]);
        for(const ticket of nearbyTickets) {
            ticketField.push(ticket[i]);
        }
        fieldOrder.push(ticketField);
    }

    function isFieldValid(arguments, field) {
        for(const ranges of field.ranges) {
            // console.log(ranges);
            for(const number of arguments) {
                if(!((number >= ranges[0].min && number <= ranges[0].max) || (number >= ranges[1].min && number <= ranges[1].max))) return false;
            }
            return true;
        }
    }

    function countValidFields(argument, fields) {
        let count = 0;
        for(const field of fields) {
            if(isFieldValid(argument, field) === true) count++;
        }
        return count;
    }
    
    let cloneArguments = JSON.parse(JSON.stringify(fieldOrder));
    let orderedFields = new Array(20);
    let count = 0;
    while(count < 20) {
        for(let j = 0; j < cloneArguments.length; j++) {
            for(let i = 0; i < fields.length; i++) {
                if(countValidFields(cloneArguments[j], fields) === 1 && isFieldValid(cloneArguments[j], fields[i]) === true) {
                    orderedFields[j] = fields[i];
                    count++
                    fields.splice(i, 1);
                    // cloneArguments.splice(j, 1);
                }
            }
        }
    }
    // console.log(fields)
    // console.log(orderedFields)
    
    let toMultiply = [];
    for(let i = 0; i < orderedFields.length; i++) {
        let str = orderedFields[i].type;
        if(str.search('departure') !== -1) toMultiply.push(i);
    }

    let result = [];
    for(let i = 0; i < toMultiply.length; i++) {
        result.push(myTicket[toMultiply[i]])
    }

    let res = result.reduce((acc, curr) => acc * curr);
    console.log(res, result)
})