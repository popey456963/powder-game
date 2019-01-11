
// Calculate the chance of removing this block if it is within an explosion radius
// Radius is the explosion radius; distance is the distance from the explosion. 
module.exports = function explode(radius, distance) {
    if (calculateEffectiveResistance(radius, distance, this.resistance) < Math.random()) {
    	Globals.grid.setEmpty(this.pos)
    }
}

function calculateEffectiveResistance(radius, distance, resistance) {
	if (distance > radius) return 1
	return (1-Math.exp(-distance/radius)*resistance)
}
