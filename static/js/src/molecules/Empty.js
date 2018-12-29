const Particle = require('./Particle.js')
const Constants = require('../modules/Constants')

class Empty extends Particle {
    constructor(coords, options) {
        if (typeof options === 'undefined') options = {}

        super(coords)

        this.type = Constants.molecules.Empty
        this.colour = 'black'

        if (options.draw) {
            this.draw()
        }
    }

    tick() {
        super.tick()
    }

    draw() {
        super.draw()
    }
}

module.exports = Empty