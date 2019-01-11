const Coord = require('../../modules/Coords')

module.exports = function explode(p, y) {
	if (typeof y === 'undefined') {
		point = Coord.toXY(p)
		x = point.x
		y = point.y
	}
	distance = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5)

    if (this.resistance < Math.random()) {
    	Globals.grid.setEmpty(this.pos)
    }
}
