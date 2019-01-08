// Gives a particle the ability to move.
module.exports = function move(p, y) {
    if (typeof y !== 'undefined') p += y * Globals.width.x

    Globals.grid.setMolecule(new Globals.Empty({ pos: this.pos }))

    this.pos += p

    Globals.grid.setMolecule(this)
    this.inactive = true
}
