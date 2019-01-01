const Powder = require('./Powder')

class Snow extends Powder {
    constructor(options) {
        super(options)
    }

    render() {
        // console.log('rendering snow')
        return 0xFFFFFFFF
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
