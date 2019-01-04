class Coord {
    constructor() {}

    static toXY(p) {
        return { x: Math.floor(p / Globals.width.x), y: p % Globals.width.x }
    }

    static toPos(x, y) {
        return y * Globals.width.x + x
    }

    static limit(x, y) {
        if (typeof x === 'object') {
            y = x.y
            x = x.x
        }

        if (x < 0 || x > Globals.width.x - 1) return false
        if (y < 0 || y > Globals.width.y - 1) return false

        return true
    }
}

module.exports = Coord

