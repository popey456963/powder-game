const Powder = require('./Powder')

class Water extends Powder {
    constructor(options) {
        super(options)
        
        this.type = Globals.molecules.Water
    }

    render() {
        return 0xFFFF0000
    }

    tick() {
        super.tick()
    }
}

module.exports = Water
