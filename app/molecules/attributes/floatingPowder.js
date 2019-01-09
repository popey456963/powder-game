const Utils = require('../../modules/Utils')

// Gives a particle the ability to work out if it's floating or not.
module.exports = function floating() {
    return [
        Utils.molecules.Empty,
        Utils.molecules.Water,
        Utils.molecules.Oil
    ].includes(this.getType(0, 1))
}
