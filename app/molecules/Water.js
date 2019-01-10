const Liquid = require('./Liquid')
const Utils = require('../modules/Utils')

class Water extends Liquid {
    constructor(options) {
        super(options)
        
        this.type = Utils.molecules.Water
        this.render = 0xFFFF0000
    }
}

module.exports = Water
