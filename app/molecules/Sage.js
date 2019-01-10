const Powder = require('./Powder')
const Utils = require('../modules/Utils')

class Sage extends Powder {
    constructor(options) {
        super(options)

        this.type = Utils.molecules.Sage
        this.render = 0xFF00FF00
    }
}

module.exports = Sage
