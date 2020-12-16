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

    function checkVertical(direction, i, j, map) {
        if ((i === 0 && direction === -1) || (i === map.length - 1 && direction === 1)) {
            return true;
        } else {
            if(direction === -1) {
                for(let index = i + direction; index > -1; index--) {
                    if(map[index][j] !== '.') {
                        if(map[index][j] === '#') return false;
                        else return true;
                    }
                }
                return true;
            } else if(direction === 1) {
                for(let index = i + direction; index < map.length; index++) {
                    if(map[index][j] !== '.') {
                        if(map[index][j] === '#') return false;
                        else return true;
                    }
                }
                return true;
            }
        }
    }

    function checkHorizontal(direction, i, j, map) {
        if ((j === 0 && direction === -1) || (j === map[i].length - 1 && direction === 1)) {
            return true;
        } else {
            if(direction === 1) {
                for(let index = j + direction; index < map[i].length; index++) {
                    if(map[i][index] !== '.') {
                        if(map[i][index] === '#') return false;
                        else return true;
                    }
                }
                return true;
            } else if(direction === -1) {
                for(let index = j + direction; index > -1; index--) {
                    if(map[i][index] !== '.') {
                        if(map[i][index] === '#') return false;
                        else return true;
                    }
                }
                return true;
            }
        }
    }

    function checkDiagonalDescent(direction, i, j, map) {
        if(((i === 0 || j=== 0) && direction === -1) || ((i === map.length - 1 || j=== map[i].length - 1) && direction === 1)) {
            return true;
        } else {
            if(direction === -1) {
                i--;
                j--;
                while(i > -1 && j > -1) {
                    //console.log(i, j, map[i][j]);
                    if(map[i][j] !== '.') {
                        if(map[i][j] === '#') return false;
                        else return true;
                    }
                    i--;
                    j--;
                }
                return true;
            } else if(direction === 1) {
                i++;
                j++;
                while(i < map.length && j < map[i].length) {
                    //console.log(i, j, map[i][j]);
                    if(map[i][j] !== '.') {
                        if(map[i][j] === '#') return false;
                        else return true;
                    }
                    i++;
                    j++;
                }
                return true;
            }
        }
    }

    function checkDiagonalAscent(direction, i, j, map) {
        if(((i === map.length - 1 || j=== 0) && direction === -1) || ((i === 0 || j=== map[i].length - 1) && direction === 1)) {
            return true;
        } else {
            if(direction === -1) {
                i++;
                j--;
                while(i < map.length && j > - 1) {
                    if(map[i][j] !== '.') {
                        if(map[i][j] === '#') return false;
                        else return true;
                    }
                    i++;
                    j--;
                }
                return true;
            } else if(direction === 1) {
                i--;
                j++;
                while(i > -1 && j < map[i].length) {
                    //console.log(map[i][j])
                    if(map[i][j] !== '.') {
                        if(map[i][j] === '#') return false;
                        else return true;
                    }
                    i--;
                    j++;
                }
                return true;
            }
        }
    }

    function countEmptyAdjacent(i, j, map) {
        let count = 0;
        if(checkVertical(-1, i, j, map)) count++;
        if(checkVertical(1, i, j, map)) count++;
        if(checkHorizontal(-1, i, j, map)) count++;
        if(checkHorizontal(1, i, j, map)) count++;
        if(checkDiagonalAscent(-1, i, j, map)) count++;
        if(checkDiagonalAscent(1, i, j, map)) count++;
        if(checkDiagonalDescent(-1, i, j, map)) count++;
        if(checkDiagonalDescent(1, i, j, map)) count++;
        return count;
    }

    function newState(previous) {
        let newState = [];
        for(let i = 0; i < previous.length; i++) {
            let newString = '';
            for(let j = 0; j < previous[i].length; j++) {
                if(previous[i][j] === 'L' && countEmptyAdjacent(i, j, previous) === 8) {
                    newString += '#';
                } else if(previous[i][j] === '#' && (8 - countEmptyAdjacent(i, j, previous)) >= 5) {
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
    
    let test = newState(original);
    let test2 = newState(test);
    let test3 = newState(test2)
    
    console.log(recursiveChange(original));
    //console.log(original)
    // console.log(test);
    // console.log(test2); 
    // console.log(8 - countEmptyAdjacent(0, 3, test2));
    // console.log(checkDiagonalDescent(-1, 0, 3, test2), checkDiagonalDescent(1, 0, 3, test2));
    // console.log(checkVertical(-1, 0, 3, test2), checkVertical(1, 0, 3, test2));
    // console.log(checkHorizontal(-1, 0, 3, test2), checkHorizontal(1, 0, 3, test2));
    // console.log(checkDiagonalAscent(-1, 0, 3, test2), checkDiagonalAscent(1, 0, 3, test2))
    //console.log(test[3][9])
    // console.log(test3)   
})