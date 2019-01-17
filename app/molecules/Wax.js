const Block = require('./Block.js')
const Utils = require('../modules/Utils')

class Wax extends Block {
    constructor(options) {
        super(options)

        this.type = Utils.molecules.Wax
        this.render = 0xFFEED5BB
        this.combustChance = 0.8
    }
}

Wax.prototype.combust = require('./attributes/combust')

module.exports = Wax
