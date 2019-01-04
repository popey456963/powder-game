// Returns the points that make up certain shapes
const Coord = require('./Coord')

class Shape {
    constructor() {}

    static line(from, to, force = false) {
        let dx = Math.abs(to.x - from.x), sx = from.x < to.x ? 1 : -1;
        let dy = Math.abs(to.y - from.y), sy = from.y < to.y ? 1 : -1; 
        let err = ( dx > dy ? dx : -dy ) / 2;
        let points = []
       
        while (true) {
            if (force || Coord.limit(from)) points.push({ x: from.x, y: from.y })
            if (from.x === to.x && from.y === to.y) break;
            let e2 = err;
            if (e2 > -dx) { err -= dy; from.x += sx; }
            if (e2 < dy) { err += dx; from.y += sy; }
        }

        return points
    }

    static point(center, radius = 1, force = false) {
        const points = []

        for (let x = center.x - radius; x <= center.x + radius; x++) {
            const yRange = radius * Math.sin(Math.acos((center.x - x) / radius))
            for (let y = center.y - yRange; y <= center.y + yRange; y++) {
                if (force || Coord.limit(x, Math.round(y))) points.push({ x, y: Math.round(y) })
            }
        }

        return points
    }
}

// global.Globals = { width: { x: 120, y: 120 } }
// console.log(Shape.point({ x: 3, y: 3 }, 2))

module.exports = Shape

