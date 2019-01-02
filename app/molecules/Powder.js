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
    	return this.getRelXY(0, 1).constructor.name === 'Empty'
    }

    tick() {
        if (this.floating()) {
            this.fall()
        }

    	super.tick()
    }
}

module.exports = Powder
