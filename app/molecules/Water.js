const Powder = require('./Powder')

class Water extends Powder {
    constructor(options) {
        super(options)
        console.log("Water")
        this.type = 205
    }

    render() {
        return 0x0000FFFF
    }

    tick() {
        super.tick()
    }
}

module.exports = Water
