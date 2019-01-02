// Allows us to use Promises, Symbols, etc.
import "babel-polyfill"

const Game = require('./modules/Game')

const game = new Game(Globals.canvas)
game.start()

document.getElementById('start').onclick = function() { game.start() }
document.getElementById('stop').onclick = function() { game.stop() }
document.getElementById('tick').onclick = function() { game.tick() }