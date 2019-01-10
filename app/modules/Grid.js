/*
 * We have three different representations of the grid, each used for various
 * operations.  These are:
 *  - colours = Array of 8 bit pixel colour values
 *  - types = Array of 16 bit pixel types
 *  - full = Array of objects, describing metadata of each molecule
 */

const Empty = require('../molecules/Empty.js')
const Coords = require('./Coords')
const Shape = require('./Shape')
const Utils = require('./Utils')

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
        if (molecule.type !== Utils.molecules.Empty && this.getType(molecule.pos) !== Utils.molecules.Empty && !force) {
            return false
        }

        this.grid[molecule.pos] = molecule
        this.types[molecule.pos] = molecule.type

        return true
    }

    setEmpty(position, force = false) {
        this.setMolecule(new Empty({ pos: position }), force)
    }

    drawLine(Molecule, start, end, force = false) {
        console.log(typeof start, typeof end)
        if (typeof start === 'number') start = Coords.toXY(start)
        if (typeof end === 'number') end = Coords.toXY(end)

        for (const point of Shape.line(start, end, force)) {
            this.setMolecule(new Molecule({ pos: point.y * Globals.width.x + point.x }), force)
        }
    }

    drawPoint(Molecule, center, radius = 2, force = false) {
        console.log(typeof center)
        if (typeof center === 'number') center = Coords.toXY(center)

        for (const point of Shape.point(center, radius, force)) {
            this.setMolecule(new Molecule({ pos: point.y * Globals.width.x + point.x }), force)
        }
    }

    drawBoundaries(Molecule, width = 1, force = false) {
        for (let i = 0; i < width; i++) {
            this.drawLine(Molecule, { x: 0 + i, y: 0 + i }, { x: 0 + i, y: Globals.width.y - 1 - i }, force)
            this.drawLine(Molecule, { x: 0 + i, y: 0 + i }, { x: Globals.width.x - 1 - i, y: 0 + i }, force)
            this.drawLine(Molecule, { x: Globals.width.x - 1 - i, y: 0 + i }, { x: Globals.width.x - 1 - i, y: Globals.width.y - 1 - i }, force)
            this.drawLine(Molecule, { x: 0 + i, y: Globals.width.y - 1 - i}, { x: Globals.width.x - 1 - i, y: Globals.width.y - 1 - i }, force)
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

            colours[pos] = molecule.render
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

    getSaveData() {
        out = String(Globals.width.x) + "|" + String(Globals.width.y) + "|"
        for (let i = 0; i < this.grid.length; i++) {
            out += String(this.getType(i)) + ":" + String(this.grid[i].render()) + ";"
        }

        return out.substr(0, out.length - 1)
    }
}

module.exports = Grid
