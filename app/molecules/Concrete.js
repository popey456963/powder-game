const Block = require('./Block.js')
const Utils = require('../modules/Utils')

class Concrete extends Block {
    constructor(options) {
        super(options)

        this.type = Utils.molecules.Concrete
    }

    render() {
        return 0xFFBBBBBB
    }

    resistance() {
        return 0.95
    }
}

module.exports = Concrete
