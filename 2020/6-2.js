const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let groups = input.split('\n\n');

    //console.log(groups)
    let result = 0;

    function checkChar(seenChar, char) {
        if(seenChar === char) {
            return true;
        }
        return false;
    }

    for(let i = 0; i < groups.length; i++){
        let group = groups[i].split('\n');
        let answer = 0;
        if(group.length === 1) {
            result += group[0].length;
        }
        else {
            let seenChar = group[0];
            //console.log(seenChar)
            for(let j = 0; j < seenChar.length; j++) {
                let countChar = 1;
                for(let i = 1; i < group.length; i++) {
                    for(let k = 0; k < group[i].length; k++) {
                        if(checkChar(seenChar[j], group[i][k]) === true) countChar++;
                    }
                }
                //console.log(countChar);
                //console.log(group.length)
                if (countChar === group.length) {
                    result++;
                }
            }
            //result += answer;
        }
    }
    console.log(result)
})