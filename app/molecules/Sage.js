const Powder = require('./Powder')
const Utils = require('../modules/Utils')

class Sage extends Powder {
    constructor(options) {
        super(options)

        this.type = Utils.molecules.Sage
    }

    render() {
        return 0xFF00FF00
    }
}

module.exports = Sage
