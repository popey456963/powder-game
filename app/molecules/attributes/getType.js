const Utils = require('../../modules/Utils')

// Gives a particle the ability to see the type of surrounding molecules.
module.exports = function getType(p, y) {
    if (typeof y !== 'undefined') p += y * Globals.width.x

    return Globals.grid.getType(this.pos + p) || Utils.molecules.Empty
}
