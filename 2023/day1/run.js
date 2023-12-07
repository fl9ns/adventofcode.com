const fs = require('fs')
const process = require('process')

let total = 0

fs.readFile('./source.txt', 'utf8', (err, data) => {

    if(!err) {

        let line = data.split("\n")

        for(i=0; i<line.length; i++) {
            let onlyNumber = line[i].replace(/[a-z]/gi, '')
            let first = onlyNumber.substring(0,1)
            let last = onlyNumber.substring(onlyNumber.length-1)
            let number = parseInt(`${first}${last}`)
            total += number
        }

        console.log(total)

    } else { process.exit(1) }
})

