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

    let result = 0;

    function findColor(color, quantity){
        for(const rule of allRules) {
            //console.log(rule[0].includes(color))
            if (rule[0].includes(color)) {
                let temp = rule[1].split(', ');
                //console.log(temp)
                let count = 0;
                if (temp[0] !== 'no other bags.') {
                    for(let i = 0; i < temp.length; i++) {
                        let acc = 0;
                        let quantityBag = parseInt(temp[i]);
                        let colorBag = temp[i].match(/(\D)+/)[0].split(' bag')[0].trim();

                        acc = quantityBag + quantityBag*findColor(colorBag, quantityBag);
                        count += acc;
                    }
                    return count;
                }
                return 0;
            }
            //return 0;
        }
    }
    
    console.log(findColor('shiny gold'));

})