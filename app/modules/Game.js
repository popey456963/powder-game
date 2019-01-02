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
        canvasContainer.setAttribute('height', Globals.width.y)

        const context = canvas.getContext('2d')

        Globals.grid = new Grid(context)
        Globals.grid.fill(Empty)
        Globals.Empty = Empty

        for (let i = 0; i < Globals.width.x; i++) {
            Globals.grid.setMolecule(new Block({ pos: i }))
            Globals.grid.setMolecule(new Block({ pos: (Globals.width.y - 1) * Globals.width.x + i }))
        }

        for (let i = 1; i < Globals.width.y; i++) {
            Globals.grid.setMolecule(new Block({ pos: Globals.width.x * i }))
            Globals.grid.setMolecule(new Block({ pos: Globals.width.x * i + Globals.width.x - 1 }))
        }
    }

    async loop(time) {
        Globals.grid.tick()
        Globals.grid.render()
        Globals.grid.draw()

        for (let i = 1; i < Globals.width.x - 1; i++) {
            if (Math.random() < 0.01) {
                Globals.grid.setMolecule(new Snow({ pos: i + Globals.width.x }))
            }
            else if (Math.random() > 0.99) {
                Globals.grid.setMolecule(new Sand({ pos: i + Globals.width.x }))
            }
        }

        // await Utils.pause(500)
        if (development) meter.tick()
        if (!this.stopped) window.requestAnimationFrame(this.loop.bind(this))
    }

    start() {
        this.stopped = false
        window.requestAnimationFrame(this.loop.bind(this))
    }

    stop() {
        this.stopped = true
    }

    tick() {
        this.stopped = true
        window.requestAnimationFrame(this.loop.bind(this))
    }

    restart() {
        Globals.grid.fill(Empty) 
    }
}

module.exports = Game
