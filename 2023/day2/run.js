const fs = require('fs')
const process = require('process')

let total = 0

fs.readFile('./source.txt', 'utf8', (err, data) => {

    if(!err) {

        let line = data.split("\n")

        for(i=0; i<line.length; i++) {
            
            let red = 0
            let green = 0
            let blue = 0

            let game = line[i].substring(line[i].indexOf(': ')+2)
            let gameID = parseInt(line[i].substring(5, line[i].indexOf(': ')))

            let set = game.split('; ')
            for(s=0; s<set.length; s++) {

                let color = set[s].split(', ')
                for(c=0; c<color.length; c++) {

                    let number = parseInt(color[c].replace(/[a-z]/gi, '').replace(/\s/g, ''))

                    if(color[c].indexOf('red') > -1) {

                        if(red < number) { red = number }

                    } else if(color[c].indexOf('green') > -1) {

                        if(green < number) { green = number }

                    } else if(color[c].indexOf('blue') > -1) {

                        if(blue < number) { blue = number }
                    }
                }
            }

            // My setting game
            if(red <= 12 && green <= 13 && blue <= 14) {
                total += gameID
            }
            
        }

        console.log(total)

    } else { process.exit(1) }
})

