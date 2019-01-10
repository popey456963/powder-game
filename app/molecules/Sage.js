const Powder = require('./Powder')

class Sage extends Powder {
    constructor(options) {
        super(options)

        this.type = Globals.molecules.Sage
        this.render = 0xFF00FF00
    }
}

module.exports = Sage
