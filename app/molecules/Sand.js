const Powder = require('./Powder')

class Sand extends Powder {
    constructor(options) {
        super(options)

        this.type = Globals.molecules.Sand
        this.render = 0xFF00FFFF
    }
}

module.exports = Sand
