const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    input = input.split('\n');

    let instructions = [];

    for(const line of input) {
        let instruction = line.split('')[0];
        let value = parseInt(line.match(/\d+/));

        instructions.push([instruction, value]);
    }

    let origine = {
        x : 0,
        y : 0,
        facing : 0
    };

    class Position {
        constructor(previous, instruction) {
            this.x = previous.x;
            this.y = previous.y;
            this.facing = previous.facing;
            this.executeInstruction(instruction);
        }
        executeInstruction(instruction) {
            if(instruction[0] === 'N' || instruction[0] === 'S' || instruction[0] === 'E' || instruction[0] === 'W') {
                if (instruction[0] === 'N') this.y += instruction[1];
                else if(instruction[0] === 'S') this.y -= instruction[1];
                else if(instruction[0] === 'E') this.x += instruction[1];
                else if(instruction[0] === 'W') this.x -= instruction[1];
            } else if(instruction[0] === 'L' || instruction[0] === 'R') {
                if(instruction[0] === 'R') {
                    this.facing += instruction[1];
                    this.facing %= 360;

                } else if(instruction[0] === 'L') {
                    this.facing -= instruction[1];
                    this.facing < 0 ? this.facing += 360 : this.facing %= 360;
                }
            } else {
                if(this.facing < 0) {
                    this.facing += 360;
                }
                if(this.facing === 0) this.x += instruction[1];
                else if(this.facing === 90) this.y -= instruction[1];
                else if(this.facing === 180) this.x -= instruction[1];
                else if(this.facing === 270) this.y += instruction[1];
            }
        }
    }

    let allPositions = [];

    allPositions.push(origine);

    for(let i = 0; i < instructions.length; i++) {
        allPositions.push(new Position(allPositions[i], instructions[i]));
    }

    function manhattanDistance(allPositions) {
        let index = allPositions.length - 1;

        if(allPositions[index].x < 0 || allPositions[index].y < 0) {
            allPositions[index].x < 0 ? allPositions[index].x *= -1 : allPositions[index].y *= -1;
        }
        return (allPositions[index].x + allPositions[index].y);
    }

    //console.log(allPositions)
    console.log(manhattanDistance(allPositions))
    
})