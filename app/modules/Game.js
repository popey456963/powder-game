// Imports 
const Empty = require('../molecules/Empty.js')
const Snow = require('../molecules/Snow.js')
const Sand = require('../molecules/Sand.js')
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
        const canvasContainer = document.getElementById(target + "Container")

        canvas.setAttribute('height', Globals.width.y)
        canvas.setAttribute('width', Globals.width.x)
        canvas.style.transform = `scale(${Globals.scale})`

        canvasContainer.setAttribute('height', Globals.width.y)

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


        this.canvas = canvas
        this.context = context

        this.x = 0
        this.y = 0
    }

    // The main game loop 
    async loop(time) {
        Globals.grid.tick()
        Globals.grid.render()
        Globals.grid.draw()

        for (let i = 1; i < Globals.width.x - 1; i++) {
            if (Math.random() < 0.005) {
                Globals.grid.setMolecule(new Snow({ pos: i + Globals.width.x }))
            }
            else if (Math.random() > 0.995) {
                Globals.grid.setMolecule(new Sand({ pos: i + Globals.width.x }))
            }
            else if (Math.random() > 0.993) {
                Globals.grid.setMolecule(new Oil({ pos: i + Globals.width.x }))
            }
            else if (Math.random() > 0.988) {
                Globals.grid.setMolecule(new Salt({ pos: i + Globals.width.x }))
            }
        }

        // await Utils.pause(500)
        if (development) meter.tick()
        if (Globals.running) window.requestAnimationFrame(this.loop.bind(this))
    }

    // Get the relative x and y coordinates of an element 
    getRelativeLocation(element, { clientX, clientY }) {
        const { left, top } = element.getBoundingClientRect()
        return {
            x: Math.round((clientX - left) / Globals.scale),
            y: Math.round((clientY - top) / Globals.scale)
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
            this.spawn(Snow, { x: this.x, y: this.y })
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
            window.requestAnimationFrame(this.loop.bind(this))
        }
    }

    stop() {
        if (Globals.running) {
            Globals.running = false
        }
    }

    tick() {
        Globals.running = false
        window.requestAnimationFrame(this.loop.bind(this))
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
