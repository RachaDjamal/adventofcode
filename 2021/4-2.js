const fs = require('fs');
const { resourceLimits } = require('worker_threads');
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    const numbers = input.split('\n\n')[0].split(',').map(Number);
    
    const data = input.split('\n\n').splice(1);
    
    let grilles = fillGrilles(data);
    //console.log(grilles)
    
    let verifier = fillVerifier(grilles);
    //console.log(verifier)

    let winnings = new Set();

    for(let h = 0; h < numbers.length; h++) {
        for(let i = 0; i < grilles.length; i++) {
            for(let j = 0; j < grilles[i].length; j++) {
                for(let k = 0; k < grilles[i][j].length; k++) {
                    if(numbers[h] === grilles[i][j][k])verifier[i][j][k] = 1;
                    
                    if(checkColumnn(verifier[i], k) === true || checkLine(verifier[i][j]) === true) {
                        winnings.add(i);
                        if(winnings.size === grilles.length) return countResult(grilles[i], i, grilles[i][j][k])
                    }
                }
            }
        }
    }
    
    
    function countResult(grille, index, last) {
        let res = 0;
        for(let i = 0; i < grille.length; i++) {
            for(let j = 0; j < grille[i].length; j++) {
                if(verifier[index][i][j] === 0) res += grille[i][j];
            }
        }
        console.log(res, last, res*last)
    }

    function checkColumnn(grille, index) {
        let temp = [];
        for(let i = 0; i < grille[0].length; i++) {
            temp.push(grille[i][index]);
        }
        if (temp.includes(0)) return false;
        else return true;
    }

    function checkLine(line) {
        if(line.includes(0)) return false;
        else return true;
    }

    function fillVerifier(grilles) {
        let res = [];
        for(let i = 0; i < grilles.length; i++) {
            let grille = [];
            for(let j = 0; j < grilles[i].length; j++) {
                let line = [];
                for(let k = 0; k < grilles[i][j].length; k++) {
                    line.push(0);
                }
                grille.push(line)
            }
            res.push(grille);
        }
        return res;
    }

    function fillGrilles(data) {
        let grilles = [];
        
        for(let i = 0; i < data.length; i++) {
            let grille = [];
            let line = '';
            for(let j = 0; j < data[i].length; j++) {
                if(data[i][j] === '\n' || j === data[i].length - 1) {
                    let temp = line.split(' ').filter(d => d).map(Number);
                    grille.push(temp);
                    line = '';
                } else {
                    line += data[i][j];
                    if (j === data[i].length - 2) line += data[i][j + 1]
                }
            }
            grilles.push(grille)
        }
        return grilles;
    }

    
})