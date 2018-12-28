const Particle = require('./Particle.js')

class Empty extends Particle {
    constructor(coords) {
        super(coords)

        this.type = 'Empty'
        this.colour = 'black'
    }

    tick() {
        super.tick()
    }

    draw() {
        super.draw()
    }
}

module.exports = Empty