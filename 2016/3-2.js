const fs = require('fs');
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err;

    const triangles = input.split('\r\n').map(a => a.trim().split(/\s+/g));
    
    let count = 0;


    for(let i = 0; i < triangles[i].length; i++) {
        for(let j = 0; j < triangles.length; j+=3) {
            const a = parseInt(triangles[j][i]);
            const b = parseInt(triangles[j + 1][i]);
            const c = parseInt(triangles[j + 2][i]);
            // console.log(a, b ,c)
            if(a + b > c && a + c > b && b + c > a) count++;
        }
    }
    console.log(count)
})