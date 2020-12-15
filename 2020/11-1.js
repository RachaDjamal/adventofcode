const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let original = input.split('\n');
    
    function checkFinalState(previous, current) {
        for(let i = 0; i < previous.length; i++) {
            if (previous[i] !== current[i]) return false;
        }
        return true;
    }

    function countEmptyAdjacent(i, j, map) {
        let count = 0;
        if(i === 0) {
            count += 3;
            if(map[i][j - 1] !== '#')count++;
            if(map[i][j + 1] !== '#')count++;
            if(map[i + 1][j] !== '#')count++;
            if(map[i + 1][j - 1] !== '#')count++;
            if(map[i + 1][j + 1] !== '#')count++;
            return count;
        } else if(i === map.length - 1) {
            count += 3;
            if(map[i][j - 1] !== '#')count++;
            if(map[i][j + 1] !== '#')count++;
            if(map[i - 1][j] !== '#')count++;
            if(map[i - 1][j - 1] !== '#')count++;
            if(map[i - 1][j + 1] !== '#')count++;
            return count;
        } else {
            if(map[i - 1][j - 1] !== '#')count++;
            if(map[i - 1][j] !== '#')count++;
            if(map[i - 1][j + 1] !== '#')count++;
            if(map[i][j - 1] !== '#')count++;
            if(map[i][j + 1] !== '#')count++;
            if(map[i + 1][j - 1] !== '#')count++;
            if(map[i + 1][j] !== '#')count++;
            if(map[i + 1][j + 1] !== '#')count++;
            return count;
        }
    }

    function newState(previous) {
        let newState = [];
        for(let i = 0; i < previous.length; i++) {
            let newString = '';
            for(let j = 0; j < previous[i].length; j++) {
                if(previous[i][j] === 'L' && countEmptyAdjacent(i, j, previous) === 8) {
                    newString += '#';
                } else if(previous[i][j] === '#' && countEmptyAdjacent(i, j, previous) < 5) {
                    newString += 'L';
                } else {
                    newString += previous[i][j];
                }
            }
            newState.push(newString);
        }
        return newState;
    }

    function recursiveChange(current) {
        let newMap = newState(current);
        if(checkFinalState(current, newMap) === true) {
            let result = 0;
            for(const line of newMap) {
                for(const seat of line) {
                    if(seat === '#')result++
                }
            }
            return result;
        } else {
            return recursiveChange(newState(newMap));
        }
    }
    
    console.log(recursiveChange(original));
})