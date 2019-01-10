const Particle = require('./Particle.js')

class Block extends Particle {
    constructor(options) {
        super(options)

        this.type = Globals.molecules.Block
        this.render = 0xFF887AFF
    }
}

module.exports = Block
