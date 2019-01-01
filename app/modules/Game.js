const Empty = require('../molecules/Empty.js')
const Snow = require('../molecules/Snow.js')
const Sand = require('../molecules/Sand.js')

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
    }

    async loop(time) {
        Globals.grid.tick()
        Globals.grid.render()
        Globals.grid.draw()

        for (let i = 0; i < Globals.width.x; i++) {
            if (Math.random() < 0.01) {
                Globals.grid.set(new Snow({ pos: i }))
            }
            else if (Math.random() > 0.99) {
                Globals.grid.set(new Sand({ pos: i }))
            }
        }

        if (development) { meter.tick() }
        window.requestAnimationFrame(this.loop.bind(this))
    }

    start() {
        window.requestAnimationFrame(this.loop.bind(this))
    }
}

module.exports = Game
