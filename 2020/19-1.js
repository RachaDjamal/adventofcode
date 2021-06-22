const fs = require('fs');
fs.readFile('./test', 'utf8', (err, input) => {
    if (err) throw err

    let allRules = input.split('\n\n')[0].split('\n').sort((a, b) => a.match(/\d+/g)[0] - b.match(/\d+/g)[0]).map((elem) => elem.split(': ')[1]);
    // let messages = input.split('\n\n')[1].split('\n');

    let a = allRules.indexOf('\"a\"');
    let b = allRules.indexOf('\"b\"');
    allRules.splice(a, 1, 'a');
    allRules.splice(b, 1, 'b');
    allRules = replaceAllRules(allRules);
    // generatePossibilities(allRules)
    console.log(allRules)
    let numPossibilities = countPossibilities(0);

    // console.log(allRules);
    // generatePossibilities(0)

    // function generatePossibilities(index) {
    //     let temp = allRules[index].split(' ');
    //     for(let i = 0; i < numPossibilities; i++) {

    //     }
    // };

    function generatePossibilities(modifiedRules) {
        let numPossibilities = countPossibilities(0);
    }

    function replaceAllRules(allRules) {
        let modifiedRules = [];
        for(let i = 0; i < allRules.length; i++) {
            let temp = allRules[i].split(' ');
            if(containPipe(temp)) {
                let first = [];
                let second = [];
                let pipe = false;
                for(const elem of temp) {
                    if(elem === '|') {
                         pipe = true;
                         continue;
                    }

                    if(elem === a.toString() || elem === b.toString()) {
                        pipe === true ? elem === a.toString() ? second.push('a') : second.push('b') : elem === a.toString() ? first.push('a') : first.push('b');
                    } else pipe === true ? second.push(elem) : first.push(elem);
                }
                modifiedRules.push([first, second])
            } else {
                let rule = [];
                for(const elem of temp) {
                    if(elem === a.toString() || elem === b.toString()) {
                        elem === a.toString() ? rule.push('a') : rule.push('b');
                    } else rule.push(elem);
                }
                modifiedRules.push(rule);
            }
        }
        return modifiedRules;
    }

    function countPossibilities(index) {
        let temp = allRules[index];
        if(!temp[0][1]) ;
    };
    
    function needRecursive(array) {
        let result = false;
        for(const char of array) {
            if(char !== 'a' && char !== 'b' && char !== '|') result = true;
        }
        return result;  
    };

    function containPipe(array) {
        let result = false;
        if (array.includes('|')) result = true;
        return result;
    };
})