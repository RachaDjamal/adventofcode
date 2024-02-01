const fs = require('fs');

fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err;

    const triangles = input.split('\r\n').map(a => a.trim().split(/\s+/g));
    
    let count = 0;
    for(let triangle of triangles) {
        const a = parseInt(triangle[0]);
        const b = parseInt(triangle[1]);
        const c = parseInt(triangle[2]);

        if(a + b > c && a + c > b && b + c > a) count++;
    }
    console.log(count)
})