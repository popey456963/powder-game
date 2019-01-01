const Particle = require('./Particle.js')

class Powder extends Particle {
    constructor(options) {
        super(options)
    }

    fall() {
        this.moveRelXY(0, 1)
    }

    render() {
    	return 0xFFFF00FF; 
    }

    floating() {
    	return false
    }

    tick() {
    	super.tick()
    }
}

module.exports = Powder
