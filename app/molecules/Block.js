const Particle = require('./Particle.js')

class Block extends Particle {
    constructor(options) {
        super(options)

        this.type = Globals.molecules.Block
    }

    render() {
        return 0xFF887AFF
    }
}

module.exports = Block
