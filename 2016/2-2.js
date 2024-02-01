const fs = require('fs');

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err;

    const data = input.split('\n').map(line => line.trim());
    const pavé = [
        ['0', '0', '1', '0', '0'],
        ['0', '2', '3', '4', '0'],
        ['5', '6', '7', '8', '9'],
        ['0', 'A', 'B', 'C', '0'],
        ['0', '0', 'D', '0', '0']
    ];

    let password = '';
    let x = 2; // Initial X position for '5'
    let y = 0; // Initial Y position for '5'

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            let newX = x;
            let newY = y;

            if (data[i][j] === 'U') newX = Math.max(newX - 1, 0);
            else if (data[i][j] === 'D') newX = Math.min(newX + 1, 4);
            else if (data[i][j] === 'L') newY = Math.max(newY - 1, 0);
            else if (data[i][j] === 'R') newY = Math.min(newY + 1, 4);

            // Check if the new position is a valid key (not '0')
            if (pavé[newX][newY] !== '0') {
                x = newX;
                y = newY;
            }
        }
        password += pavé[x][y];
    }

    console.log(password); // Expected output: 5DB3
});
