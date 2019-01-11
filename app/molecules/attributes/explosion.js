const Coords = require('../../modules/Coords.js')

// Cause an explosion 
module.exports = function explosion(radius) {
	if (this.doExplosion === true) {
		let pos = Coords.toXY(this.pos)
	    for (let i = -(radius + 1); i < radius; i++) {
	    	for (let j = (-radius + 1); j < radius; j++) {
	    		if ((i == 0) && (j == 0)) continue
	    		if (((i + j * Globals.width.x) < 0) ||  ((i + j * Globals.width.x) >= Globals.width.x * Globals.width.y)) continue
	    		this.getMolecule(i, j).explode(radius, i > j ? i : j)
	    	}
	    }
	    Globals.grid.setEmpty(this.pos)
	}
}




