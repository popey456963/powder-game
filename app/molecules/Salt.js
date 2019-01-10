const Powder = require('./Powder')
const Water = require('./Water')

class Salt extends Powder {
    constructor(options) {
        super(options)

        this.type = Globals.molecules.Salt
        this.render = 0xFFBBDDDD
    }

    tick() {
        const before = this.pos

        super.tick()

        if (before === this.pos) {
            if (this.getType(0, 1) == Globals.molecules.Snow) {
                Globals.grid.setMolecule(new Water({ pos: this.pos + Globals.width.x }), true)
            }
        }
    }
}

module.exports = Salt
