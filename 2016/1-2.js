const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err 

    const instructions = input.split(', ');
    let position = [[0, 0]];
    let direction = 'N';

    for (let i = 0; i < instructions.length; i++){
        direction = getNewDir(direction, instructions[i]);
        let instruction = parseInt(instructions[i].substring(1));
        let y = position[position.length-1][1];
        let x = position[position.length-1][0];
        
        for(let j = 0; j < instruction; j++) {
            if(direction === 'N') y++;
            else if(direction === 'S') y--;
            else if(direction === 'O') x--;
            else if(direction === 'E') x++;
            position.push([x, y])
        }
    }

    // console.log(position)
    let visited =[];
    for(let j = 0; j < position.length; j++) {
        let current = position[j].toString();
        // console.log(current, j)
        if(!visited.includes(current)) visited.push(current);
        else return console.log(current, j, visited)
    }

    function getNewDir(currentDir, instruction) {
        const instruDir = instruction[0];
        if (currentDir === "N") {
            return instruDir === "R" ? 'E' : 'O';
        } else if (currentDir === "S") {
            return instruDir === "R" ? 'O' : 'E';
        } else if (currentDir === "O") {
            return instruDir === "R" ? 'N' : 'S';
        } else if (currentDir === "E") {
            return instruDir === "R" ? 'S' : 'N';
        }
    }
})