/*
 * We have three different representations of the grid, each used for various
 * operations.  These are:
 *  - colours = Array of 8 bit pixel colour values
 *  - types = Array of 16 bit pixel types
 *  - full = Array of objects, describing metadata of each molecule
 */

const Shape = require('./Shape')

class Grid {
    constructor(context) {
        this.context = context
        
        this.imageData = this.context.createImageData(Globals.width.x, Globals.width.y)
        this.buf = new ArrayBuffer(this.imageData.data.length)
        this.buf8 = new Uint8ClampedArray(this.buf)
        this.colours = new Uint32Array(this.buf)

        this.types = new Uint16Array(Globals.width.x * Globals.width.y)

        this.grid = new Array(Globals.width.x * Globals.width.y)
    }

    getMolecule(p, y) {
        if (typeof y !== 'undefined') p += y * Globals.width.x
        return this.grid[p]
    }

    getType(p, y) {
        if (typeof y !== 'undefined') p += y * Globals.width.x
        return this.types[p]
    }

    setMolecule(molecule, force = false) {      
        if (molecule.type !== Globals.molecules.Empty && this.getType(molecule.pos) !== Globals.molecules.Empty && !force) {
            return false
        }

        this.grid[molecule.pos] = molecule
        this.types[molecule.pos] = molecule.type

        return true
    }

    drawLine(Molecule, start, end, force = false) {
        if (typeof start === 'number') start = Coords.toXY(start)
        if (typeof end === 'number') end = Coords.toXY(end)

        for (const point of Shape.line(start, end)) {
            this.setMolecule(new Molecule({ pos: point.y * Globals.width.x + point.x }), force)
        }
    }

    drawPoint(Molecule, center, radius = 2, force = false) {
        if (typeof center === 'number') center = Coords.toXY(center)

        for (const point of Shape.point(center, radius)) {
            this.setMolecule(new Molecule({ pos: point.y * Globals.width.x + point.x }), force)
        }
    }

    fill(Molecule) {
        const length = Globals.width.x * Globals.width.y

        for (let i = 0; i < length; i++) {
            this.setMolecule(new Molecule({ pos: i }))
        }
    }

    tick() {
        this.types.forEach((item, index) => {
            // Check area is not empty
            if (item !== 1) {
                const molecule = this.grid[index]

                if (molecule.inactive) {
                    molecule.inactive = false
                    return
                }

                molecule.tick()
            }
        })
    }

    render() {
        // Keep local references, significant speed up.
        const grid = this.grid
        const colours = this.colours

        grid.forEach((molecule, pos) => {
            if (!molecule) return

            const colour = molecule.render()

            colours[pos] = colour
            // colours[pos] =
            //     (colour.a << 24) | // alpha
            //     (colour.b << 16) | // blue
            //     (colour.g << 8 ) | // green
            //      colour.r          // red
        }) 
    }

    draw() {
        this.imageData.data.set(this.buf8)
        this.context.putImageData(this.imageData, 0, 0)
    }
}

module.exports = Grid
