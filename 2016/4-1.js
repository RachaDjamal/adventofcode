const fs = require('fs');
fs.readFile('./input', 'utf8', (err, input) => {
    if (err) throw err;

    const rooms = input.split('\r\n');

    let res = 0;
    for (let room of rooms) {
        res += isRealRoom(room);
    }
    console.log(res);

    //console.log(isRealRoom(rooms[1]))

    function isRealRoom(room) {
        let ID = parseInt(room.match(/\d+/g));
        let checksum = room.trim().split(/\[|\]/g)[1];
        let name = room.trim().split(/\d+/g)[0].split('-').toSpliced(room.trim().split(/\d+/g)[0].split('-').length - 1);
        let count = [];
        for(let i = 0; i < checksum.length; i++){
            let num = 0;
            for(let j = 0; j < name.length; j++){
                for(let k = 0; k < name[j].length; k++){
                    if(name[j][k] === checksum[i]) num++;
                }
            }
            count.push([checksum[i], num])
        }
        let comp = count.toSorted((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        //console.log(comp, count)
        for(let i = 0; i < comp.length; i++) {
            if(comp[i] !== count[i]) return 0;
        }
        return ID;
    }
})