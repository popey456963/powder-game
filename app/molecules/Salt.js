const Powder = require('./Powder')
const Water = require('./Water')

class Salt extends Powder {
    constructor(options) {
        super(options)

        this.type = 204
    }

    render() {
        return 0xDDDD11FF
    }

    tick() {
        before = this.pos
        super.tick()
        if (before === this.pos) {
            //console.log(this.getType(0, 1))
            if (this.getType(0, 1) == Globals.molecules.Snow) {
                console.log("Snow")
                Globals.grid.setMolecule(new Water({ pos: this.pos + Globals.width.x }), true)
                this.getMolecule(0, 1).tick(); 
            }
        }
    }
}

module.exports = Salt
