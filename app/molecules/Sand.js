const Powder = require('./Powder')
const Utils = require('../modules/Utils')

class Sand extends Powder {
    constructor(options) {
        super(options)

        this.type = Utils.molecules.Sand
    }

    render() {
        return 0xFF00FFFF
    }
}

module.exports = Sand
