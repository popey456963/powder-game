const Empty = require('../molecules/Empty.js')

const Grid = require('./Grid.js')

class Game {
    constructor(target) {
        const canvas = document.getElementById(target)

        canvas.setAttribute('height', Globals.width.y)
        canvas.setAttribute('width', Globals.width.x)

        const context = canvas.getContext('2d')

        Globals.grid = new Grid(context)
        Globals.grid.fill(Empty)
    }

    loop(time) {
        Globals.grid.tick()
        Globals.grid.render()
        Globals.grid.draw()

        meter.tick()
        window.requestAnimationFrame(this.loop.bind(this))
    }

    start() {
        window.requestAnimationFrame(this.loop.bind(this))
    }
}

module.exports = Game