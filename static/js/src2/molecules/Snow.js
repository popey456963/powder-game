const Powder = require('./Powder')

class Snow extends Powder {
    constructor(options) {
        super(options)
    }

    render() {
        // console.log('rendering snow')
        return 0b11111111111111111111111111111111
    }

    floating() {
        return true
    }

    tick() {
        if (this.floating()) {
            this.fall()
        }

        super.tick()
    }
}

module.exports = Snow
