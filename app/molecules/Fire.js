const Block = require('./Block.js')
const Utils = require('../modules/Utils')

class Fire extends Block {
    constructor(options) {
        super(options)

        this.type = Utils.molecules.Fire
        this.renderIndex = 0
        this.resistance = 0
        this.lastMove = 0
        this.requiredMoves = 15
        this.deathChance = 0.001
        this.radius = 3
    }

    get render() {
        return [0xFF0000FF, 0xFF0044FF, 0xFF0088FF, 0xFF00CCFF, 0xFF00FFFF][this.renderIndex]
    }

    tick() {
        this.spreadFire(this.radius)
        if (Math.random() < this.deathChance) {
            Globals.grid.setEmpty(this.pos)
        }
        else if (this.lastMove > this.requiredMoves) {
            this.renderIndex = (this.renderIndex + 1) % 5
            this.lastMove = 0
        }
        this.lastMove++
        super.tick()
    }
}

Fire.prototype.spreadFire = require('./attributes/spreadFire')

module.exports = Fire
