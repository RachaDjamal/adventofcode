const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err
    
    const initialState = input.split('\n');
    let state = getActiveCube(initialState);
    for(let i = 0; i < 6; i++) {
        state = bootCycle(state);
    }
    console.log(state.size)

    function bootCycle(activeState) {
        const newCubes = new Set();
        const activationCounts = {};

        for(let cube of activeState) {
            const neighbors = getNeighbors(cube);
            let activeNeighborCount = 0;

            for(let neighbor of neighbors) {
                if (activeState.has(neighbor)) {
                    activeNeighborCount++;
                } else {
                    if(!(neighbor in activationCounts)) activationCounts[neighbor] = 0;
                    activationCounts[neighbor]++;
                }
            }

            if(activeNeighborCount === 2 || activeNeighborCount === 3) newCubes.add(cube);
        }

        for(let potentialCube in activationCounts) {
            if(activationCounts[potentialCube] === 3) newCubes.add(potentialCube);
        }

        return newCubes;
    };

    function getActiveCube(state) {
        const cubes = new Set();
        for(let x = 0; x < state.length; x++) {
            for(let y = 0; y < state[x].length; y++) {
                const char = state[x][y];
                if(char === '#') {
                    const cube = convertArrayToString([x, y, 0, 0]);
                    cubes.add(cube);
                }
            }
        }
        return cubes;
    };

    function getNeighbors(cube) {
        const [x, y, z, w] = cube.split(',').map(Number);
        const neighbors = new Set();

        for(let deltaX = -1; deltaX <= 1; deltaX++) {
            for(let deltaY = -1; deltaY <= 1; deltaY++) {
                for(let deltaZ = -1; deltaZ <= 1; deltaZ++) {
                    for(let deltaW = -1; deltaW <= 1; deltaW++) {
                        const neighbor = convertArrayToString([x + deltaX, y + deltaY, z + deltaZ, w + deltaW]);
                        neighbors.add(neighbor);
                    }
                }
            }
        }
        neighbors.delete(cube);
        return neighbors;
    };

    function convertArrayToString(array) {
        return array.join(',');
    };
})