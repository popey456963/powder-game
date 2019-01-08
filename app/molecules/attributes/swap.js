// Gives a particle the ability to swap with another.
module.exports = function swap(p, y) {
    if (typeof y !== 'undefined') p += y * Globals.width.x

    // return this.move(p)

    const under = this.getMolecule(0, 1)
    under.pos = this.pos
    Globals.grid.setMolecule(under, true)

    this.pos += Globals.grid.x
    Globals.grid.setMolecule(this, true)

    this.inactive = true
}