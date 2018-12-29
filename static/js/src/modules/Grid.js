const Empty = require('../molecules/Empty.js')
const Constants = require('./Constants.js')
const Globals = require('./Globals.js')
const Coords = require('./Coords.js')

class Grid {
    constructor(widthX, widthY) {
        this.widthX = widthX
        this.slim = new Uint8Array(widthX * widthY)

        this.full = []

        for(let y = 0; y < widthY; y++) {
            let row = []

            for (let x = 0; x < widthX; x++) {
                row.push(new Empty({ x, y }, { draw: true }))
            }

            this.full.push(row)
        }

        // this.full = (new Array(widthX)).map((_, index) => this.emptyRow(index, widthY))
    }

    emptyRow(y, len) {
        return (new Array(len)).map((_, index) => new Empty({ y, x: index }, { draw: true }))
    }

    set(molecule) {
        this.full[molecule.coords.x][molecule.coords.y] = molecule
        this.slim[Coords.toSingle(molecule.coords, this.widthX)] = molecule.type
    }
}



module.exports = Grid