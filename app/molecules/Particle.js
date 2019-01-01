class Particle {
    constructor(options) {
        this.options = options

        this.pos = this.options.pos
        this.inactive = true
    }

    render() {
        return 0b11111111100000000000000010000000
    }

    tick() {}

    moveAbs(pos) {
        Globals.grid.set(new Globals.Empty({ pos: this.pos }))

        this.pos = pos

        Globals.grid.set(this)
        this.inactive = true
    }

    moveRel(pos) {
        return this.moveAbs(this.pos + pos)
    }

    moveRelXY(x, y) {
        return this.moveRel(y * Globals.width.x + x)
    }
}

module.exports = Particle
