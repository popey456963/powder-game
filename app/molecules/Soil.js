const Powder = require('./Powder')
const Utils = require('../modules/Utils')

class Soil extends Powder {
    constructor(options) {
        super(options)

        this.type = Utils.molecules.Soil
    }

    render() {
        return 0xFF66A0CB
    }
}

module.exports = Soil
