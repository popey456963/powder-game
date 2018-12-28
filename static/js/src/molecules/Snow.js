const Powder = require('./Powder.js')

class Snow extends Powder {
    constructor(coords) {
        super(coords)

        this.type = 'Snow'
        this.colour = 'white'
    }

    tick() {
        super.tick()
    }
}

module.exports = Snow