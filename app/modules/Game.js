// Imports 
const Empty = require('../molecules/Empty.js')
const Snow = require('../molecules/Snow.js')
const Sand = require('../molecules/Sand.js')
const Sage = require('../molecules/Sage.js')
const Oil = require('../molecules/Oil.js')
const Salt = require('../molecules/Salt.js')
const Water = require('../molecules/Water.js')
const Block = require('../molecules/Block.js')

const Utils = require('./Utils.js')
const Grid = require('./Grid.js')

// The main game class 
class Game {
    // The constructor to setup the game 
    constructor(target) {
        const canvas = document.getElementById(target)

        canvas.setAttribute('height', Globals.width.y)
        canvas.setAttribute('width', Globals.width.x)

        const context = canvas.getContext('2d')

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

        window.addEventListener('resize', e => this.resizeCanvas(), false)

        this.canvas = canvas
        this.context = context

        this.resizeCanvas()

        this.x = 0
        this.y = 0

        window.requestAnimationFrame(this.loop.bind(this))
    }

    // The main game loop 
    async loop(time) {
        if (Globals.running || Globals.tick) { Globals.grid.tick(); Globals.tick = false }
        Globals.grid.render()
        Globals.grid.draw()

        for (let i = 1; i < Globals.width.x - 1; i++) {
            const random = Math.random()
            const pos = i + Globals.width.x

            if (random < 0.001) Globals.grid.setMolecule(new Snow({ pos }))
            if (random < 0.002) Globals.grid.setMolecule(new Sand({ pos }))
            if (random < 0.003) Globals.grid.setMolecule(new Salt({ pos }))
            if (random < 0.004) Globals.grid.setMolecule(new Oil({ pos }))
            if (random < 0.005) Globals.grid.setMolecule(new Sage({ pos }))
        }

        // await Utils.pause(500)
        if (development) meter.tick()
        window.requestAnimationFrame(this.loop.bind(this))
    }

    // Get the relative x and y coordinates of an element 
    getRelativeLocation(element, { clientX, clientY }) {
        const { left, top } = element.getBoundingClientRect()
        return {
            x: Math.round((clientX - left) / Globals.scale),
            y: Math.round((clientY - top) / Globals.scale)
        }
    }

    resizeCanvas() {
        const widthRatio = window.innerWidth / Globals.width.x
        const heightRatio = window.innerHeight / Globals.width.y

        if (widthRatio > heightRatio) {
            // We can display the menu off to the side.
            this.canvas.style.width = `${window.innerHeight * Globals.width.x / Globals.width.y}px`
            this.canvas.style.height = `${window.innerHeight}px`

            Globals.scale = window.innerHeight / Globals.width.y
        } else {
            // We can display the menu off to the bottom.
            this.canvas.style.width = `${window.innerWidth}px`
            this.canvas.style.height = `${window.innerWidth * Globals.width.y / Globals.width.x}px`

            Globals.scale = window.innerWidth / Globals.width.x
        }
    }

    // Add a molecule 
    spawn(Molecule, center) {
        Globals.grid.drawPoint(Molecule, center)
    }

    // Spawn particles on click 
    startSpawn() {
        if (this.clickInterval) {
            clearInterval(this.clickInterval)
            this.clickInterval = null
        }

        this.clickInterval = setInterval(() => {
            this.spawn(Water, { x: this.x, y: this.y })
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
        console.log("Remove floor") 
        Globals.grid.drawLine(Empty, { x: 0, y: Globals.width.y - 1 }, { x: Globals.width.x - 1, y: Globals.width.y - 1 }, true)
    }
}

// Exports 
module.exports = Game
