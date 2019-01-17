const Coords = require('../../modules/Coords.js')
const Utils = require('../../modules/Utils.js')

// Cause an explosion 
module.exports = function spreadFire(radius) {
	let pos = Coords.toXY(this.pos)
    for (let i = -(radius + 1); i < radius; i++) {
    	for (let j = (-radius + 1); j < radius; j++) {
    		if ((i == 0) && (j == 0)) continue
    		if (((i + j * Globals.width.x) < 0) ||  ((i + j * Globals.width.x) >= Globals.width.x * Globals.width.y)) continue
    		if (this.getType(i, j) === Utils.molecules.Wax) {
	    		if (this.getMolecule(i, j).combustChance > Math.random()) {
	    			this.getMolecule(i, j).combust(radius, i > j ? i : j)
	    		}
    		}
    		else if (this.getType(i, j) === Utils.molecules.Explosive) {
    			if (this.getMolecule(i, j).combustChance > Math.random()) {
    				this.getMolecule(i, j).doExplosion = true
    			}
    		}
    	}
    }
}




