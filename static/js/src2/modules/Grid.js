/*
 * We have three different representations of the grid, each used for various
 * operations.  These are:
 *  - colours = Array of 8 bit pixel colour values
 *  - types = Array of 16 bit pixel types
 *  - full = Array of objects, describing metadata of each molecule
 */

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

    abs(pos) {
        return this.grid[pos]
    }

    absXY(x, y) {
        return this.abs(y * Globals.width.x + x)
    }

    rel(pos, diff) {
        // TODO: Add in safety checks
        return this.abs(pos + diff)
    }

    relXY(pos, x, y) {
        // TODO: Add in safety checks
        return this.rel(pos, y * Globals.width.x + x)
    }

    fill(Molecule) {
        const length = Globals.width.x * Globals.width.y

        for (let i = 0; i < length; i++) {
            this.set(new Molecule({ pos: i }), i)
        }
    }

    set(molecule, pos) {
        this.grid[pos] = molecule
        this.types[pos] = molecule.type
    }

    setXY(molecule, x, y) {
        return this.set(molecule, y * Globals.width.x + x)
    }

    tick() {
        const grid = this.grid
        const types = this.types

        types.forEach((item, index) => {
            // Check area is not empty
            if (item !== 1) {
                const molecule = grid[index]

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