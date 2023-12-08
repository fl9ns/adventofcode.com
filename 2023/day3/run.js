const fs = require('fs')
const process = require('process')

let total = 0

fs.readFile('./source.txt', 'utf8', (err, data) => {

    if(!err) {

        let line = data.split("\n")

        for(let l=0; l<line.length; l++) {

            let numberInThisLine =  getNumberOfThisLine(line[l])

            if(numberInThisLine.length > 0) {

                for(let n=0; n<numberInThisLine.length; n++) {

                    let keepThisNumber = false

                    if(l > 0) {

                        if(checkSymbolAdjacent(line[l-1], numberInThisLine[n].startAt, numberInThisLine[n].stopAt)) {
                            keepThisNumber = true
                        }
                    }
                    
                    if(checkSymbolAdjacent(line[l], numberInThisLine[n].startAt, numberInThisLine[n].stopAt)) {
                        keepThisNumber = true
                    }

                    if(l+1 < line.length) {

                        if(checkSymbolAdjacent(line[l+1], numberInThisLine[n].startAt, numberInThisLine[n].stopAt)) {
                            keepThisNumber = true
                        }
                    }

                    if(keepThisNumber) {
                        total += numberInThisLine[n].number
                    }
                   
                }
            }
        }

        console.log(total)

    } else { process.exit(1) }
})

function isNumeric(char) {

    switch(char) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9': return true
        default: return false
    }
}

function getNumberOfThisLine(text) {

    let result = []
    let startIndex = -1
    let number = ''

    for(let i=0; i<text.length; i++) {
        
        let char = text.charAt(i)

        while(isNumeric(char)) {

            if(startIndex == -1) {
                startIndex = i
            }
            
            number += char
            i++

            char = text.charAt(i)

        }

        if(number != '') {

            result.push({
                number: parseInt(number),
                startAt: startIndex,
                stopAt: startIndex + number.length
            })

            number = ''
            startIndex = -1

        }

    }

    return result
}

function checkSymbolAdjacent(text, start, stop) {

    let leftLimit = start - 1
    let rightLimmit = stop + 1

    let section = text.substring(leftLimit, rightLimmit)
                      .replace(/[0-9]/g, '')
                      .replace(/\./g, '')

    return section.length > 0

}
