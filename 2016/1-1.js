const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err 

    const instructions = input.split(', ');
    let position = [[0, 0]];
    let direction = 'N';

    for (let i = 0; i < instructions.length; i++){
        direction = getNewDir(direction, instructions[i]);
        let instruction = parseInt(instructions[i].substring(1));
        let y = position[i][1];
        let x = position[i][0];
        
        if(direction === 'N') y += instruction;
        else if(direction === 'S') y -= instruction;
        else if(direction === 'O') x -= instruction
        else if(direction === 'E') x += instruction

        position.push([x, y])
    }

    console.log(position)
    
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