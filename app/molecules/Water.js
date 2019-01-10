const Liquid = require('./Liquid')

class Water extends Liquid {
    constructor(options) {
        super(options)
        
        this.type = Globals.molecules.Water
        this.render = 0xFFFF0000
    }
}

module.exports = Water
