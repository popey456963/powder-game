const Particle = require('./Particle.js')

class Block extends Particle {
    constructor(options) {
        super(options)

        this.type = 100
    }

    render() {
        return 0xFF887AFF
    }
}

module.exports = Block
