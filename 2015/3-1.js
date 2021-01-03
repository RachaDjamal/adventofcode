const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let x = 0;
    let y = 0;

    let visited = [];
    visited.push({x, y});
    let uniques = [];
    uniques.push({x, y})

    for(const char of input) {
        let x = visited[visited.length - 1].x;
        let y = visited[visited.length - 1].y;

        if(char === '<' || char === '>') char === '<' ? y-- : y++;
        else char === '^' ? x++ : x--;

        let current = {x, y} 
        if(isUnique(visited, current)) uniques.push(current)
        visited.push({x, y});
    }

    function isUnique(visited, current) {
        for(const entry of visited) {
            if(entry.x === current.x && entry.y === current.y) return false;
        }
        return true;
    }
    
    console.log(uniques.length)
})