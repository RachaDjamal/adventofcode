const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let x = 0;
    let y = 0;

    let visitedSanta = [];
    let visitedRobot = [];
    visitedRobot.push({x, y});
    visitedSanta.push({x, y});
    let uniques = [];
    uniques.push({x, y})

    for(let i = 0; i < input.length; i++) {
        if(i % 2 === 0) {
            let x = visitedSanta[visitedSanta.length - 1].x;
            let y = visitedSanta[visitedSanta.length - 1].y;

            if(input[i] === '<' || input[i] === '>') input[i] === '<' ? y-- : y++;
            else input[i] === '^' ? x++ : x--;

            let current = {x, y} 
            if(isUnique(uniques, current)) uniques.push(current)
            visitedSanta.push({x, y});
        } else {
            let x = visitedRobot[visitedRobot.length - 1].x;
            let y = visitedRobot[visitedRobot.length - 1].y;

            if(input[i] === '<' || input[i] === '>') input[i] === '<' ? y-- : y++;
            else input[i] === '^' ? x++ : x--;

            let current = {x, y} 
            if(isUnique(uniques, current)) uniques.push(current)
            visitedRobot.push({x, y});
        }
    }

    function isUnique(visited, current) {
        for(const entry of visited) {
            if(entry.x === current.x && entry.y === current.y) return false;
        }
        return true;
    }

    console.log(uniques)
    console.log(uniques.length)
})