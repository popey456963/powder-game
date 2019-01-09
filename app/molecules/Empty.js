const Particle = require('./Particle.js')
const Utils = require('../modules/Utils')

class Empty extends Particle {
    constructor(options) {
        super(options)

        this.type = Utils.molecules.Empty
    }

    render() {
        return 0xFF000000
    }
}

module.exports = Empty
