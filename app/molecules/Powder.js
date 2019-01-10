const Particle = require('./Particle.js')

class Powder extends Particle {
    constructor(options) {
        super(options)

        this.type = Globals.molecules.Powder
        this.render = 0xFFFF00FF
    }

    tick() {
        if (this.floating()) {
            this.fall()
        }

    	super.tick()
    }
}

Particle.prototype.floating = require('./attributes/floating')
Particle.prototype.fall = require('./attributes/fall')

module.exports = Powder
