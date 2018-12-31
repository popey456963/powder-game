const Particle = require('./Particle.js')

class Powder extends Particle {
    constructor(options) {
        super(options)
    }

    fall() {
        this.moveRelXY(0, 1)
    }
}

module.exports = Powder