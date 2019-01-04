const Powder = require('./Powder')

class Snow extends Powder {
    constructor(options) {
        super(options)

        this.type = Globals.molecules.Snow
    }

    render() {
        return 0xFFFFFFFF
    }

    tick() {
        super.tick()
    }
}

module.exports = Snow
