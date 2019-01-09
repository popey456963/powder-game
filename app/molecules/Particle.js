const Utils = require('../modules/Utils')

class Particle {
    constructor(options) {
        this.options = options

        this.pos = this.options.pos
        this.inactive = true
        this.type = Utils.molecules.Particle
    }

    render() {
        return 0xFF800080
    }

    tick() {}
}

Particle.prototype.getMolecule = require('./attributes/getMolecule')
Particle.prototype.getType = require('./attributes/getType')
Particle.prototype.move = require('./attributes/move')
Particle.prototype.swap = require('./attributes/swap')

module.exports = Particle
