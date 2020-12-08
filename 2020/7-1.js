const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n');
    
    let allRules = [];

    for(const rule of input) {
        let container = rule.split(' bags contain ')[0];
        let contained = rule.split(' bags contain ')[1];
        allRules.push([container, contained]);
    }
    
    let valid = new Set();

    //console.log(allRules);

    function findColor(color) {
        for(const rule of allRules) {
            //console.log(rule[1].includes(color));
            if(rule[1].includes(color)) {
                valid.add(rule[0]);
                findColor(rule[0]);
            }
        }
    }

    findColor('shiny gold');
    console.log(valid.size);
})