const Block = require('./Block.js')
const Utils = require('../modules/Utils')

class Indestructible extends Block {
    constructor(options) {
        super(options)

        this.type = Utils.molecules.Indestructible
        this.resistance = 1
    }

    get resistance() {
        return 1
    }
}

module.exports = Indestructible
