// Allows us to use Promises, Symbols, etc.
import "babel-polyfill"
import "query-string"
import "../styles/css/style.scss"

const Game = require('./modules/Game')
const Utils = require('./modules/Utils')

const game = new Game(Utils.ids.canvas)
game.start()

document.getElementById(Utils.ids.start).onclick = function() { game.start() }
document.getElementById(Utils.ids.stop).onclick = function() { game.stop() }
document.getElementById(Utils.ids.tick).onclick = function() { game.tick() }
document.getElementById(Utils.ids.reset).onclick = function() { game.reset() }

document.getElementById(Utils.ids.makeFloor).onclick = function() { game.makeFloor() }
document.getElementById(Utils.ids.removeFloor).onclick = function() { game.removeFloor() } 

document.getElementById(Utils.ids.startGenerate).onclick = function() { game.startGenerate() }
document.getElementById(Utils.ids.stopGenerate).onclick = function() { game.stopGenerate() } 

document.getElementById(Utils.ids.typesButton).onclick = function() { game.setSpawnType() }

document.getElementById(Utils.ids.generateButton).onclick = function() { game.setGenerationChance() }

