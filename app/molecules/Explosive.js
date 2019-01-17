const Block = require('./Block.js')
const Utils = require('../modules/Utils')

class Explosive extends Block {
    constructor(options) {
        super(options)

        this.type = Utils.molecules.Explosive
        //this.doExplosion = options.doExplosion
        this.doExplosion = false
        this.radius = 8
        this.render = 0xFFBBBBBB
        this.resistance = 0.95
        this.combustChance = 0.3
    }

    tick() {
        super.tick()
        this.explosion(this.radius)
    }
}

Explosive.prototype.explosion = require('./attributes/explosion')

module.exports = Explosive
