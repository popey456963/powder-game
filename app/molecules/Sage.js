const Powder = require('./Powder')

class Sage extends Powder {
    constructor(options) {
        super(options)

        this.type = Globals.molecules.Sage
    }

    render() {
        return 0x99999999
    }

    tick() {
        super.tick()
    }
}

module.exports = Sage
