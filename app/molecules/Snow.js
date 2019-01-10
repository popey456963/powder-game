const Powder = require('./Powder')
const Water = require('./Water')
const Utils = require('../modules/Utils')

class Snow extends Powder {
    constructor(options) {
        super(options)

        this.type = Utils.molecules.Snow
    }

    render() {
        return 0xFFFFFFFF
    }

    tick () {
        const before = this.pos

        super.tick()

        if (before === this.pos) {
            if (this.getType(0, 1) == Utils.molecules.Salt) {
                Globals.grid.setMolecule(new Water({ pos: this.pos + Globals.width.x }), true)
            }
        }
    }
}

module.exports = Snow
