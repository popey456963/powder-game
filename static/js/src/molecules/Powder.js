const Particle = require('./Particle.js')
const Globals = require('../modules/Globals.js')
const Constants = require('../modules/Constants')
const Empty = require('./Empty.js')

const empty = { type: Constants.molecules.Empty }

class Powder extends Particle {
    constructor(coords) {
        super(coords)

        this.speed = { x: 0, y: 1 }
        this.type = Constants.molecules.Powder
        this.colour = 'yellow'
        this.gravity = 0
    }

    // TODO
    floating() {
        return true
    }
    
    fall() {
        this.move(this.speed.x, this.speed.y)
        this.speed.y += this.gravity
    }

    move(relativeX, relativeY) {
        // ADD EMPTY
        empty.coords = this.coords
        Globals.grid.set(empty)

        Globals.canvas.fillStyle = 'black'
        Globals.canvas.fillRect(empty.coords.x * Globals.resolution, empty.coords.y * Globals.resolution, Globals.resolution, Globals.resolution)

        // ADD SELF
        this.coords = { x: this.coords.x + relativeX, y: this.coords.y + relativeY }

        if (this.coords.y < Globals.widthY) {
            Globals.grid.set(this)
            this.inactive = true
            this.draw()
        } else {
            delete this
        }
    }

    tick() {
        if (this.floating()) {
            this.fall()
        }

        super.tick()
    }

    draw() {
        super.draw()
    }
}

module.exports = Powder