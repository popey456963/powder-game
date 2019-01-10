const Liquid = require('./Liquid')
const Utils = require('../modules/Utils')

class Oil extends Liquid {
    constructor(options) {
        super(options)

        this.type = Utils.molecules.Oil
        this.render = 0xFF0000FF
    }
}

module.exports = Oil
