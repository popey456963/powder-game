const Particle = require('./Particle.js')
const Utils = require('../modules/Utils')

class Block extends Particle {
    constructor(options) {
        super(options)

        this.type = Utils.molecules.Block
        this.render = 0xFF887AFF
    }
}

module.exports = Block
