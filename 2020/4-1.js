const fs = require('fs')
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err

    let data = [];
    data = input.split('\n\n');

    class Passport {
        constructor(data) {
            this.parseData(data);
        }
        parseData(data) {
            let elements = [];
            elements = data.split(/ |\n/);
            this.obj = Object.fromEntries(elements.map(function(el){
                return el.split(':');
            }));
            //console.log(elements);
            this.verifyPassport();
        }
        verifyPassport() {
            this.valid = false;
            if(Object.keys(this.obj).length === 8 || (Object.keys(this.obj).length === 7 && this.obj.cid === undefined)) {
                //console.log(elements)
                this.valid = true;
            }
        }
    }
    
    let result = 0;
    for(let i = 0; i < data.length; i++) {
       let res = new Passport(data[i]);
       if(res.valid === true) result++;
    }
    console.log(result);
    
})