const Particle = require('./Particle.js')

class Liquid extends Particle {
    constructor(options) {
        super(options)

        this.type = Globals.molecules.Liquid
        this.lastMove = 0
        this.requiredMoves = 5
    }

    render() {
        return 0xFFFF00FF;
    }

    tick() {
        if (this.floating()) {
            this.fall()
        } else if (this.lastMove > this.requiredMoves) {
            const left = this.getType(-1, 0) === Globals.molecules.Empty
            const right = this.getType(1, 0) === Globals.molecules.Empty

            if (left && right) {
                if (Math.random() > 0.5) this.move(-1, 0)
                else this.move(1, 0)
            } else if (left) {
                this.move(-1, 0)
            } else if (right) {
                this.move(1, 0)
            }

            this.lastMove = 0
        }

        this.lastMove++
        super.tick()
    }
}

Liquid.prototype.floating = require('./attributes/floatingLiquid')
Liquid.prototype.fall = require('./attributes/fall')

module.exports = Liquid
