const Block = require('./Block.js')
const Utils = require('../modules/Utils')
const Water = require('./Water')

class Spout extends Block {
    constructor(options) {
        super(options)

        this.type = Utils.molecules.Spout
        this.render = 0xFFEBBD5A
        this.resistance = 0.95
        this.lastMove = 0
        this.requiredMoves = 7
    }

    tick() {
    	super.tick()
    	if (this.lastMove > this.requiredMoves) {
    		Globals.grid.setMolecule(new Water({ pos: this.pos + Globals.width.x }), false)
    		this.lastMove = 0
    	}
    	this.lastMove++
    }
}

module.exports = Spout
