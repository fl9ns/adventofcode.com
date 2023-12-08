const fs = require('fs')
const process = require('process')

let total = 0

fs.readFile('./source.txt', 'utf8', (err, data) => {

    if(!err) {

        let line = data.split("\n")

        for(l=0; l<line.length; l++) {
            
            let winNumber = getWinningNumber(line[l])
            let myNumber = getMyCardNumber(line[l])
            let point = 0

            for(n=0; n<myNumber.length; n++) {

                if(winNumber.includes(myNumber[n])) {

                    if(point == 0) { point = 1 }
                    else { point *= 2 }
                    
                }
            }

            total += point
        }

        console.log(total)

    } else { process.exit(1) }
})

function getWinningNumber(text) {

    let number = text.substring(text.indexOf(': ')+1, text.indexOf('|'))
    number = number.split(' ')
    number = number.filter((str) => str !== '')
    number = number.map((str) => parseInt(str))

    return number
}

function getMyCardNumber(text) {

    let number = text.substring(text.indexOf('| ')+1)
    number = number.split(' ')
    number = number.filter((str) => str !== '')
    number = number.map((str) => parseInt(str))

    return number
}
