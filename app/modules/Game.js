// Imports 
const Empty = require('../molecules/Empty.js')
const Snow = require('../molecules/Snow.js')
const Sand = require('../molecules/Sand.js')
const Sage = require('../molecules/Sage.js')
const Oil = require('../molecules/Oil.js')
const Salt = require('../molecules/Salt.js')
const Water = require('../molecules/Water.js')
const Block = require('../molecules/Block.js')

const Particle = require('../molecules/Particle.js')
const Powder = require('../molecules/Powder.js')
const Liquid = require('../molecules/Liquid.js')

const Utils = require('./Utils.js')
const Grid = require('./Grid.js')

const queryString = require('query-string')

// The main game class 
class Game {
    // The constructor to setup the game 
    constructor(target) {
        const canvas = document.getElementById(target)
        this.parseQuery()

        canvas.setAttribute('height', Globals.width.y)
        canvas.setAttribute('width', Globals.width.x)

        const context = canvas.getContext('2d')

        this.sizes = this.calculateSizes()

        Globals.grid = new Grid(context)
        Globals.grid.fill(Empty)
        Globals.Empty = Empty

        Globals.grid.drawLine(Block, { x: 0, y: 0 }, { x: 0, y: Globals.width.y - 1 }, true)
        Globals.grid.drawLine(Block, { x: 0, y: 0 }, { x: Globals.width.x - 1, y: 0 }, true)
        Globals.grid.drawLine(Block, { x: Globals.width.x - 1, y: 0 }, { x: Globals.width.x - 1, y: Globals.width.y - 1 }, true)
        Globals.grid.drawLine(Block, { x: 0, y: Globals.width.y - 1 }, { x: Globals.width.x - 1, y: Globals.width.y - 1 }, true)

        canvas.addEventListener('mousedown', e => this.startSpawn(e), false)    
        canvas.addEventListener('mouseup', e => this.stopSpawn(e), false)
        document.addEventListener('mouseup', e => this.stopSpawn(e), false)

        canvas.addEventListener('mousemove', e => this.updatePos(e), false)
        canvas.addEventListener('mouseenter', e => this.updatePos(e), false)

        window.addEventListener('resize', e => this.resizeCanvas(this.calculateSizes()), false)

        this.canvas = canvas
        this.context = context

        this.resizeCanvas(this.calculateSizes())
        console.log("The canvas sizes are: " + String(Globals.width.x) + " by " + String(Globals.width.y) + "; the scale is: " + String(Globals.scale) + ". ")

        this.x = 0
        this.y = 0

        this.generate = true

        window.requestAnimationFrame(this.loop.bind(this))
    }

    // The main game loop 
    async loop(time) {
        let tick = Globals.tick
        if (Globals.running || Globals.tick) { Globals.grid.tick(); Globals.tick = false }
        Globals.grid.render()
        Globals.grid.draw()

        for (let i = 1; i < Globals.width.x - 1; i++) {
            const random = Math.random()
            const pos = i + Globals.width.x

            if (this.generate && (Globals.running || tick)) {
                if (random < 0.001) Globals.grid.setMolecule(new Snow({ pos }))
                if (random < 0.002) Globals.grid.setMolecule(new Sand({ pos }))
                if (random < 0.003) Globals.grid.setMolecule(new Salt({ pos }))
                if (random < 0.004) Globals.grid.setMolecule(new Oil({ pos }))
                if (random < 0.005) Globals.grid.setMolecule(new Sage({ pos }))
            }
        }

        if (development) meter.tick()
        window.requestAnimationFrame(this.loop.bind(this))
    }

    // Parse the size given in the URL bar 
    parseQuery() {
        canvasSizes = queryString.parse(window.location.search)
        if (canvasSizes.x != null && canvasSizes.x != undefined && canvasSizes.x != "") {
            if (isNaN(canvasSizes["x"]) == false) {
                Globals.width.x = parseInt(canvasSizes.x)
            }
        }
        if (canvasSizes.y != null && canvasSizes.y != undefined && canvasSizes.y != "") {
            if (isNaN(canvasSizes["y"]) == false) {
                Globals.width.y = parseInt(canvasSizes.y)
            }
        }
        if (canvasSizes.t != null && canvasSizes.t != undefined && canvasSizes.t != "") {
            if (isNaN(canvasSizes["t"]) == false) {
                Globals.spawning.type = parseInt(canvasSizes.t)
            }
        }
        if (canvasSizes.r != null && canvasSizes.r != undefined && canvasSizes.r != "") {
            if (isNaN(canvasSizes["r"]) == false) {
                Globals.spawning.radius = parseInt(canvasSizes.r)
            }
        }
        document.getElementById(Globals.ids.sizesForm + "x").value = Globals.width.x
        document.getElementById(Globals.ids.sizesForm + "y").value = Globals.width.y
        document.getElementById(Globals.ids.types).value = Globals.spawning.type
    }

    // Get the relative x and y coordinates of an element 
    getRelativeLocation(element, { clientX, clientY }) {
        const { left, top } = element.getBoundingClientRect()
        return {
            x: Math.round((clientX - left) / Globals.scale),
            y: Math.round((clientY - top) / Globals.scale)
        }
    }

    // Calculate and set the canvas size 
    calculateSizes() {
        let rect = document.getElementById(Globals.ids.innerWrapper).getBoundingClientRect()
        return {
            innerWidth: Math.floor(rect.width),
            width: window.innerWidth,
            innerHeight: Math.floor(rect.height),
            height: window.innerHeight,
            x: Math.ceil(rect.x), 
            y: Math.ceil(rect.y)
        }
    }

    resizeCanvas(sizes) {
        const widthRatio = (sizes.innerWidth - Globals.sizeOffset) / Globals.width.x
        const heightRatio = (sizes.height - sizes.y - Globals.sizeOffset) / Globals.width.y

        if (widthRatio > heightRatio) {
            // Display the menu off to the side.
            this.canvas.style.width = `${Globals.width.x * heightRatio}px`
            this.canvas.style.height = `${Globals.width.y * heightRatio}px`

            Globals.scale = heightRatio
            console.log("hr")
        } else {
            // Display the menu off to the bottom.
            this.canvas.style.width = `${Globals.width.x * widthRatio}px`
            this.canvas.style.height = `${Globals.width.y * widthRatio}px`

            Globals.scale = widthRatio
            console.log("wr")
        }
    }

    // Get molecule from id
    moleculeFromId(id) {
        if (id === Globals.molecules.Particle) {
            return Particle
        }
        else if (id === Globals.molecules.Empty) {
            return Empty
        }
        else if (id === Globals.molecules.Block) {
            return Block
        }
        else if (id === Globals.molecules.Powder) {
            return Powder
        }
        else if (id === Globals.molecules.Sage) {
            return Sage
        }
        else if (id === Globals.molecules.Salt) {
            return Salt
        }
        else if (id === Globals.molecules.Sand) {
            return Sand
        }
        else if (id === Globals.molecules.Snow) {
            return Snow
        }
        else if (id === Globals.molecules.Liquid) {
            return Liquid
        }
        else if (id === Globals.molecules.Water) {
            return Water
        }
        else if (id === Globals.molecules.Oil) {
            return Oil
        }
        else {
            return Empty
        }
    }

    // Add a molecule 
    spawn(Molecule, center, radius) {
        Globals.grid.drawPoint(Molecule, center, radius)
    }

    // Spawn particles on click 
    startSpawn() {
        if (this.clickInterval) {
            clearInterval(this.clickInterval)
            this.clickInterval = null
        }

        this.clickInterval = setInterval(() => {
            this.spawn(this.moleculeFromId(Globals.spawning.type), { x: this.x, y: this.y }, Globals.spawning.radius)
        })
    }

    stopSpawn() {
        clearInterval(this.clickInterval)
        this.clickInterval = null
    }

    updatePos(event) {
        const location = this.getRelativeLocation(this.canvas, event)

        this.x = location.x
        this.y = location.y
    }

    // Buttons 
    start() {
        if (!Globals.running) {
            Globals.running = true
        }
    }

    stop() {
        if (Globals.running) {
            Globals.running = false
        }
    }

    tick() {
        Globals.running = false
        Globals.tick = true
    }

    reset() {
        console.log('Resetting Grid')
        Globals.grid.fill(Empty) 
    }

    makeFloor() {
        Globals.grid.drawLine(Block, { x: 0, y: Globals.width.y - 1 }, { x: Globals.width.x - 1, y: Globals.width.y - 1 }, true)
    }

    removeFloor() {
        Globals.grid.drawLine(Empty, { x: 1, y: Globals.width.y - 1 }, { x: Globals.width.x - 2, y: Globals.width.y - 1 }, true)
    }

    startGenerate() {
        if (!this.generate) {
            this.generate = true
        }
    }

    stopGenerate() {
        if (this.generate) {
            this.generate = false
        }
    }

    setSpawnType() {
        try {
            Globals.spawning.type = parseInt(document.getElementById(Globals.ids.types).value)
        }
        catch {}
    }
}

// Exports 
module.exports = Game
