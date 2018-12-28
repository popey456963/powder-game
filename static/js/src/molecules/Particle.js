const Globals = require('../modules/Globals.js')

class Particle {
    constructor(coords) {
        this.coords = coords

        this.type = 'Particle'
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