const Powder = require('./Powder')

class Sand extends Powder {
    constructor(options) {
        super(options)

        this.type = 201
    }

    render() {
        return 0xFF00FFFF
    }

    tick() {
        super.tick()
    }
}

module.exports = Sand
