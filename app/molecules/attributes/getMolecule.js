// Gives a particle the ability to get surrounding molecules.
module.exports = function getMolecule(p, y) {
    if (typeof y !== 'undefined') p += y * Globals.width.x

    return Globals.grid.getMolecule(this.pos + p)
}
