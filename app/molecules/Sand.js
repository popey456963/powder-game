const Powder = require('./Powder')

class Sand extends Powder {
    constructor(options) {
        super(options)
    }

    render() {
        // console.log('rendering snow')
        return 0xFF00FFFF
    }

    tick() {
        super.tick()
    }
}

module.exports = Sand
