const Block = require('./Block.js')
const Utils = require('../modules/Utils')

class Concrete extends Block {
    constructor(options) {
        super(options)

        this.type = Utils.molecules.Concrete
        this.render = 0xFFBBBBBB
        this.resistance = 0.95
    }
}

module.exports = Concrete
