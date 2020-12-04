const { verify } = require('crypto');
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
            elements = elements.sort();
            this.obj = Object.fromEntries(elements.map(function(el){
                return el.split(':');
            }));
            //console.log(elements);
            this.verifyPassport();
        }
        verifyPassport() {
            this.valid = false;
            delete this.obj.cid;
            //console.log(this.obj);
            if(Object.keys(this.obj).length > 6 && this.verifyKeys() === true) {
                this.valid = true;
            }
        }
        verifyKeys() {
            if(this.verifyBirthYear() === true && this.verifyIssueYear() === true && this.verifyExpYear() === true && this.verifyHeight() === true && this.verifyEyeColor() && this.verifyPassID() === true && this.verifyHairColor() === true) {
                return true;
            }
            console.log(this.obj)
            return false;
        }
        verifyBirthYear() {
            if(this.obj.byr > 1919 && this.obj.byr < 2003) return true;
            return false;
        }
        verifyIssueYear() {
            if(this.obj.iyr > 2009 && this.obj.iyr < 2021) return true;
            return false;
        }
        verifyExpYear() {
            if(this.obj.eyr > 2019 && this.obj.eyr < 2031) return true;
            return false;
        }
        verifyHeight() {
            let unit = this.obj.hgt[this.obj.hgt.length - 2] + this.obj.hgt[this.obj.hgt.length - 1];
            let number = parseInt(this.obj.hgt);
            //console.log(number);
            if(unit === 'cm' && (number > 149 && number < 194)) return true;
            if(unit === 'in' && (number > 58 && number < 77)) return true;

            return false;
        }
        verifyEyeColor() {
            let color = this.obj.ecl;
            if(color === 'amb' || color === 'blu' || color === 'brn' || color === 'gry' || color === 'grn' || color === 'hzl' || color === 'oth') return true;

            return false;
        }
        verifyPassID() {
            let count = 0;
            for(let i = 0; i < this.obj.pid.length; i++) {
                if(this.obj.pid[i] >= '0' && this.obj.pid[i] <= '9') {
                    count++;
                } else {
                    return false;
                }
            }
            if(count === 9) return true;
            return false;
        }
        verifyHairColor() {
            let count = 0;
            if(this.obj.hcl[0] !== '#') return false;
            for(let i = 1; i < this.obj.hcl.length; i++) {
                if((this.obj.hcl[i] >= '0' && this.obj.hcl[i] <= '9') || (this.obj.hcl[i] >= 'a' && this.obj.hcl[i] <= 'f')) {
                    count++;
                } else {
                    return false;
                }
            }
            if(count === 6) return true;
            return false;
        }
    }
    
    let result = 0;
    for(let i = 0; i < data.length; i++) {
       let res = new Passport(data[i]);
       if(res.valid === true) result++;
    }
    console.log(result);
    
    //console.log(new Passport(data[0]));
})