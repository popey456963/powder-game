const Particle = require('./Particle.js')

class Empty extends Particle {
    constructor(options) {
        super(options)

        this.type = Globals.molecules.Empty
        this.render = 0xFF000000
    }
}

module.exports = Empty
