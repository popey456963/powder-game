const Block = require('./Block.js')
const Utils = require('../modules/Utils')

class Explosive extends Block {
    constructor(options) {
        super(options)

        this.type = Utils.molecules.Explosive
        //this.doExplosion = options.doExplosion
        this.doExplosion = true
        this.radius = 8
        this.render = 0xFFBBBBBB
        this.resistance = 0.95
    }

    tick() {
        super.tick()
        this.explosion(this.radius)
    }
}

Explosive.prototype.explosion = require('./attributes/explosion')

module.exports = Explosive
