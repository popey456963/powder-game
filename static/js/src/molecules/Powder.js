const Particle = require('./Particle.js')
const Globals = require('../modules/Globals.js')
const Empty = require('./Empty.js')

class Powder extends Particle {
    constructor(coords) {
        super(coords)

        this.speed = { x: 0, y: 1 }
        this.type = 'Powder'
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
        const oldX = this.coords.x
        const oldY = this.coords.y

        const newX = this.coords.x + relativeX
        const newY = this.coords.y + relativeY

        // ADD SELF
        const self = Globals.grid[oldX][oldY]
        self.coords = { x: newX, y: newY }

        if (self.coords.y < Globals.widthY) {
            Globals.grid[newX][newY] = self
            Globals.grid[newX][newY].draw()
            Globals.grid[newX][newY].inactive = true
        } else {
            delete this
        }

        // ADD EMPTY
        const empty = new Empty({ x: oldX, y: oldY })
        Globals.grid[oldX][oldY] = empty
        Globals.grid[oldX][oldY].draw()
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