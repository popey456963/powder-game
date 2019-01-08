const Liquid = require('./Liquid')

class Oil extends Liquid {
    constructor(options) {
        super(options)

        this.type = Globals.molecules.Oil
    }

    render() {
        return 0xFF0000FF
    }
}

module.exports = Oil
