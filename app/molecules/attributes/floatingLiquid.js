// Gives a particle the ability to work out if it's floating or not.
module.exports = function floating() {
    return [
        Globals.molecules.Empty
    ].includes(this.getType(0, 1))
}
