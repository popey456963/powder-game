class Coords {
    constructor() {}

    static toXY(item, width) {
        return { y: Math.floor(item / width), x: item % width }
    }

    static toSingle({x, y}, width) {
        return y * width + x
    }
}

module.exports = Coords