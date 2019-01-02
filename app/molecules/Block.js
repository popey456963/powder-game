const Particle = require('./Particle.js')

class Block extends Particle {
    constructor(options) {
        super(options)
    }

    render() {
        return 0xFF887A6C
    }
}

module.exports = Block