window.PG = {}

class Globals {
    constructor() {}

    static get grid() {
        return window.PG.grid
    }

    static set grid(grid) {
        window.PG.grid = grid   
    }

    static get canvas() {
        return window.PG.canvas
    }

    static set canvas(canvas) {
        window.PG.canvas = canvas
    }

    static get widthX() {
        return window.PG.widthX
    }

    static set widthX(widthX) {
        window.PG.widthX = widthX
    }

    static get widthY() {
        return window.PG.widthY
    }

    static set widthY(widthY) {
        window.PG.widthY = widthY
    }

    static get resolution() {
        return window.PG.resolution
    }

    static set resolution(resolution) {
        window.PG.resolution = resolution
    }
}

module.exports = Globals