class Particle {
    constructor(options) {
        this.options = options

        this.pos = this.options.pos
        this.inactive = true
        this.type = 0
    }

    render() {
        return 0xFF800080
    }

    tick() {}

    move(p, y) {
        if (typeof y !== 'undefined') p += y * Globals.width.x

        Globals.grid.setMolecule(new Globals.Empty({ pos: this.pos }))
        
        this.pos += p

        Globals.grid.setMolecule(this)
        this.inactive = true
    }

    getMolecule(p, y) {
        if (typeof y !== 'undefined') p += y * Globals.width.x

        return Globals.grid.getMolecule(this.pos + p)
    }

    getType(p, y) {
        if (typeof y !== 'undefined') p += y * Globals.width.x

        return Globals.grid.getType(this.pos + p)
    }
}

module.exports = Particle
