// Allows us to use Promises, Symbols, etc.
import "babel-polyfill"
import "query-string"
import "../styles/css/style.scss"

const Game = require('./modules/Game')

const game = new Game(Globals.ids.canvas)
game.start()

document.getElementById(Globals.ids.start).onclick = function() { game.start() }
document.getElementById(Globals.ids.stop).onclick = function() { game.stop() }
document.getElementById(Globals.ids.tick).onclick = function() { game.tick() }
document.getElementById(Globals.ids.reset).onclick = function() { game.reset() }

document.getElementById(Globals.ids.makeFloor).onclick = function() { game.makeFloor() }
document.getElementById(Globals.ids.removeFloor).onclick = function() { game.removeFloor() } 

document.getElementById(Globals.ids.startGenerate).onclick = function() { game.startGenerate() }
document.getElementById(Globals.ids.stopGenerate).onclick = function() { game.stopGenerate() } 

document.getElementById(Globals.ids.typesButton).onclick = function() { game.setSpawnType() }
