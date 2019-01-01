const Particle = require('./Particle.js')

class Empty extends Particle {
    constructor(options) {
        super(options)
    }

    render() {
        return 0b11111111000000000000000000000000
    }
}

module.exports = Empty
