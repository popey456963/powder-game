// Allows us to use Promises, Symbols, etc.
import "babel-polyfill"

const Game = require('./modules/Game')

const game = new Game(Globals.canvas)
game.start()