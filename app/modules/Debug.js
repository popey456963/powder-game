const Coords = require('./Coords')

class Debug {
    constructor() {

    }

    static grid(row, column) {
        let count = 0

        Globals.grid.grid.forEach((molecule, pos) => {
            const { x, y } = Coords.toXY(pos)
            if (typeof row !== 'undefined') if (row !== x) return
            if (typeof column !== 'undefined') if (column !== y) return

            count++

            if (count > 100) {
                return
            }

            const colours = []

            const keys = '(' + Object.keys(molecule).concat(['resistance'])
                .map(key => [key, molecule[key]])
                .filter(entry => !(['options'].includes(entry[0])))
                .map(([key, value]) => {
                    colours.push('')
                    colours.push('color: grey;')
                    
                    if (typeof value === 'number') {
                        colours.push('color: aquamarine;')
                        colours.push('')
                        return `%c${key}%c=%c${value}%c`
                    } else if (typeof value === 'boolean') {
                        colours.push('color: MediumOrchid;')
                        colours.push('')
                        return `%c${key}%c=%c${value}%c`  
                    } else {
                        colours.push('color: darkgrey;')
                        colours.push('')
                        return `%c${key}%c=%c'${value}'%c`
                    }
                })
                .join(', ') + ')'

            console.log(`[x=${x}, y=${y}] %c${molecule.constructor.name} ${keys}`, `font-weight: bold;`, ...colours)
        })

        if (count > 100) { console.log(`And %c${count - 100}%cmore molecules...`,  'color: aquamarine;') }
    }
}

module.exports = Debug
