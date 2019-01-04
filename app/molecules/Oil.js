const Powder = require('./Powder')

class Oil extends Powder {
    constructor(options) {
        super(options)

        this.type = 203
    }

    render() {
        return 0xFF0000FF
    }

    tick() {
        super.tick()
    }
}

module.exports = Oil
