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

        if (x < 1 || x > Globals.width.x - 2) return false
        if (y < 1 || y > Globals.width.y - 2) return false

        return true
    }
}

module.exports = Coord

