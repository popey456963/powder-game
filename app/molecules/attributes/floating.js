

// Gives a particle the ability to work out if it's floating or not.
module.exports = (materials) => {
    return function() {
        return materials.includes(this.getType(0, 1))
    }
}
