const Particle = require('./Particle.js')

class Powder extends Particle {
    constructor(options) {
        super(options)

        this.type = Globals.molecules.Powder
    }

    fall() {
        this.move(0, 1)
    }

    render() {
    	return 0xFFFF00FF; 
    }

    floating() {
    	return this.getType(0, 1) === Globals.molecules.Empty
    }

    tick() {
        if (this.floating()) {
            this.fall()
        }

    	super.tick()
    }
}

module.exports = Powder
