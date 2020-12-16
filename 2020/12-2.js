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
        waypointX : 10,
        waypointY : 1,
        facing : 0
    };

    class Position {
        constructor(previous, instruction) {
            this.x = previous.x;
            this.y = previous.y;
            this.waypointX = previous.waypointX;
            this.waypointY = previous.waypointY;
            this.facing = previous.facing;
            this.executeInstruction(instruction);
        }
        executeInstruction(instruction) {
            if(instruction[0] === 'N' || instruction[0] === 'S' || instruction[0] === 'E' || instruction[0] === 'W') {
                if (instruction[0] === 'N') this.waypointY += instruction[1];
                else if(instruction[0] === 'S') this.waypointY -= instruction[1];
                else if(instruction[0] === 'E') this.waypointX += instruction[1];
                else if(instruction[0] === 'W') this.waypointX -= instruction[1];
            } else if(instruction[0] === 'L' || instruction[0] === 'R') {
                let times = instruction[1] / 90;
                console.log(times);
                if(instruction[0] === 'R') {
                    this.facing += instruction[1];
                    this.facing %= 360;
                    if(times % 2 === 0) {
                        this.waypointX *= -1;
                        this.waypointY *= -1;
                    } else {
                        if(times === 1) {
                            let temp = this.waypointX;
                            this.waypointX = this.waypointY;
                            this.waypointY = -temp;
                        } else {
                            let temp = this.waypointX;
                            this.waypointX = -this.waypointY;
                            this.waypointY = temp;
                        }
                    }
                } else if(instruction[0] === 'L') {
                    this.facing -= instruction[1];
                    this.facing < 0 ? this.facing += 360 : this.facing %= 360;
                    if(times % 2 === 0) {
                        this.waypointX *= -1;
                        this.waypointY *= -1;
                    } else {
                        if(times === 1) {
                            let temp = this.waypointX;
                            this.waypointX = -this.waypointY;
                            this.waypointY = temp;
                        } else {
                            let temp = this.waypointX;
                            this.waypointX = this.waypointY;
                            this.waypointY = -temp;
                        }
                    }
                }
            } else {
                for(let i = 0; i < instruction[1]; i++) {
                    this.x += this.waypointX;
                    this.y += this.waypointY;
                }
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


    console.log(allPositions);
    console.log(manhattanDistance(allPositions))
    
})