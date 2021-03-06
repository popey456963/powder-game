const Particle = require('./Particle.js')
const Utils = require('../modules/Utils')

class Powder extends Particle {
    constructor(options) {
        super(options)

        this.type = Utils.molecules.Powder
        this.render = 0xFFFF00FF
        this.resistance = 0
    }

    tick() {
        if (this.floating()) {
            this.fall()
        }

    	super.tick()
    }
}

Particle.prototype.floating = require('./attributes/floating')([Utils.molecules.Empty, Utils.molecules.Water, Utils.molecules.Oil])
Particle.prototype.fall = require('./attributes/fall')

module.exports = Powder
