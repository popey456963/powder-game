const Empty = require('../molecules/Empty.js')
const Snow = require('../molecules/Snow.js')
const Sand = require('../molecules/Sand.js')
const Block = require('../molecules/Block.js')

const Utils = require('./Utils.js')
const Grid = require('./Grid.js')

class Game {
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

        Globals.grid.drawLine(Block, { x: 0, y: 0 }, { x: 0, y: Globals.width.y - 1 })
        Globals.grid.drawLine(Block, { x: 0, y: 0 }, { x: Globals.width.x - 1, y: 0 })
        Globals.grid.drawLine(Block, { x: Globals.width.x - 1, y: 0 }, { x: Globals.width.x - 1, y: Globals.width.y - 1 })
        Globals.grid.drawLine(Block, { x: 0, y: Globals.width.y - 1 }, { x: Globals.width.x - 1, y: Globals.width.y - 1 })

        canvas.addEventListener('mousedown', e => this.startSpawn(e), false)
        canvas.addEventListener('mouseup', e => this.stopSpawn(e), false)
        canvas.addEventListener('mouseout', e => this.stopSpawn(e), false)

        canvas.addEventListener('mousemove', e => this.updatePos(e), false)
        canvas.addEventListener('mouseenter', e => this.updatePos(e), false)

        this.canvas = canvas
        this.context = context

        this.x = 0
        this.y = 0
    }

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
        }

        // await Utils.pause(500)
        if (development) meter.tick()
        if (Globals.running) window.requestAnimationFrame(this.loop.bind(this))
    }

    getRelativeLocation(element, { clientX, clientY }) {
        const { left, top } = element.getBoundingClientRect()
        return {
            x: Math.round((clientX - left) / Globals.scale),
            y: Math.round((clientY - top) / Globals.scale)
        }
    }

    spawn(Molecule, center) {
        Globals.grid.drawPoint(Molecule, center)
    }

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

    start() {
        if (!Globals.running) {
            Globals.running = true
            window.requestAnimationFrame(this.loop.bind(this))
        }
    }

    stop() {
        Global.running = false
    }

    tick() {
        Globals.running = true
        window.requestAnimationFrame(this.loop.bind(this))
    }

    reset() {
        console.log('resetting grid')
        Globals.grid.fill(Empty) 
    }
}

module.exports = Game
