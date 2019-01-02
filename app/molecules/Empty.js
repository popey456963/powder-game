const Particle = require('./Particle.js')

class Empty extends Particle {
    constructor(options) {
        super(options)

        this.type = 1
    }

    render() {
        return 0xFF000000
    }
}

module.exports = Empty
