const Block = require('./Block.js')
const Utils = require('../modules/Utils')

class Indestructible extends Block {
    constructor(options) {
        super(options)

        this.type = Utils.molecules.Indestructible
    }

    resistance() {
        return 0
    }
}

module.exports = Indestructible
