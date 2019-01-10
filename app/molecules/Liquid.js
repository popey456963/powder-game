const Particle = require('./Particle.js')
const Utils = require('../modules/Utils')

class Liquid extends Particle {
    constructor(options) {
        super(options)

        this.type = Utils.molecules.Liquid
        this.lastMove = 0
        this.requiredMoves = 5
    }

    render() {
        return 0xFFFF00FF;
    }

    get resistance() {
        return 0.5
    }

    tick() {
        if (this.floating()) {
            this.fall()
        } else if (this.lastMove > this.requiredMoves) {
            const left = this.getType(-1, 0) === Utils.molecules.Empty
            const right = this.getType(1, 0) === Utils.molecules.Empty

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
