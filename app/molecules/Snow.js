const Powder = require('./Powder')

class Snow extends Powder {
    constructor(options) {
        super(options)
    }

    render() {
        // console.log('rendering snow')
        return 0xFFFFFFFF
    }

    tick() {
        super.tick()
    }
}

module.exports = Snow
