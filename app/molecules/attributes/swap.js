// Gives a particle the ability to swap with another.
module.exports = function swap(p, y) {
    if (typeof y !== 'undefined') p += y * Globals.width.x

    if (this.pos >= Globals.width.y) {
    	this.move(0, 1)
    }
    else {
	    const under = this.getMolecule(0, 1)
	    under.pos = this.pos
	    Globals.grid.setMolecule(under, true)

	    this.pos += Globals.width.x
	    Globals.grid.setMolecule(this, true)

	    this.inactive = true
	}
}
