const Particle = require('./Particle.js')
const Utils = require('../modules/Utils')

class Block extends Particle {
    constructor(options) {
        super(options)

        this.type = Utils.molecules.Block
    }

    render() {
        return 0xFF887AFF
    }
}

module.exports = Block
