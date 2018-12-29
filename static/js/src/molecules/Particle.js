const Globals = require('../modules/Globals.js')
const Constants = require('../modules/Constants')

class Particle {
    constructor(coords, options) {
        if (typeof options === 'undefined') options = {}
        
        this.coords = coords

        this.type = Constants.molecules.Particle
        this.colour = 'purple'
    }

    tick() {}

    draw() {
        // console.log(`Drawing ${this.colour} at ${this.coords.x} ${this.coords.y}`)
        // draw it with 'this.colour'
        Globals.canvas.fillStyle = this.colour
        Globals.canvas.fillRect(this.coords.x * Globals.resolution, this.coords.y * Globals.resolution, Globals.resolution, Globals.resolution)
    }
}

module.exports = Particle