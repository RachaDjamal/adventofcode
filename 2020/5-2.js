const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let data = input.split('\n');
    

    class Seat {
        constructor(data) {
            this.defineRow(data);
            this.defineColumn(data);
            this.seatID();
        }
        defineRow(data) {
            let range = {
                min : 0,
                max : 127
            };
            for(let i = 0; i < 7; i++) {
                if(data[i] === 'F') {
                    range.max = Math.floor(range.max - ((range.max - range.min) / 2));
                } else if (data[i] === 'B') {
                    range.min = Math.round(range.min + ((range.max - range.min) / 2));
                }
            }
            this.row = range.min;
        }
        defineColumn(data) {
            let range = {
                min : 0,
                max : 7
            };
            for(let i = 7; i < data.length; i++) {
                if(data[i] === 'L') {
                    range.max = Math.floor(range.max - ((range.max - range.min) / 2));
                } else if (data[i] === 'R') {
                    range.min = Math.round(range.min + ((range.max - range.min) / 2));
                }
            }
            this.column = range.min;
        }
        seatID() {
            this.id = this.row * 8 + this.column;
        }

    }

    let IDs = [];

    for(let i = 0; i < data.length; i++) {
        let boardingPass = new Seat(data[i]);
        //console.log(boardingPass.id)
        IDs.push(boardingPass.id);
    }
    const byValue = (a,b) => a - b;
    const sorted = [...IDs].sort(byValue);

    // for(let i = 0; i < sorted.length; i++) {
    //     if(sorted[i] + 1 !== sorted[i+1]) console.log(i);
    // }
    console.log(sorted[568]);
    console.log(sorted[569]);
    console.log(sorted[570]);
})
