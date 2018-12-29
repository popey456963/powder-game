const Powder = require('./Powder.js')
const Constants = require('../modules/Constants')

class Snow extends Powder {
    constructor(coords, options) {
        if (typeof options === 'undefined') options = {}

        super(coords)

        this.type = Constants.molecules.Snow
        this.colour = 'white'

        if (options.draw) {
            this.draw()
        }
    }
}

module.exports = Snow