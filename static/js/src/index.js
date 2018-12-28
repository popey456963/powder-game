import "babel-polyfill"

const Empty = require('./molecules/Empty')
const Snow = require('./molecules/Snow')

const Globals = require('./modules/Globals')

const pixelX = 520
const pixelY = 520

Globals.resolution = 4
Globals.widthX = pixelX / Globals.resolution
Globals.widthY = pixelY / Globals.resolution

if (parseInt(Globals.widthX) !== Globals.widthX) throw 'Invalid resolution for X'
if (parseInt(Globals.widthY) !== Globals.widthY) throw 'Invalid resolution for Y'

async function pause(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}

function init() {
    $('#game').attr('height', Globals.widthY * Globals.resolution)
    $('#game').attr('width', Globals.widthX * Globals.resolution)

    Globals.canvas = document.getElementById('game').getContext('2d')
    Globals.grid = []

    for (let y = 0; y < Globals.widthY; y++) {
        let column = []
        for (let x = 0; x < Globals.widthX; x++) {
            column.push(new Empty({ x, y }))
            column[column.length - 1].draw()
        }
        Globals.grid.push(column)
    }

    // Globals.grid[2][0] = new Snow({ x: 2, y: 0 })
    // Globals.grid[3][5] = new Snow({ x: 3, y: 5 })
    // Globals.grid[4][10] = new Snow({ x: 4, y: 10 })
    // Globals.grid[5][15] = new Snow({ x: 5, y: 15 })
    // Globals.grid[6][20] = new Snow({ x: 6, y: 20 })

    console.log('Created snow')
}

async function loop(timestamp) {
    console.time('frame')
    for (let x in Globals.grid) {
        for (let y in Globals.grid[x]) {
            if (Globals.grid[x][y].inactive) {
                Globals.grid[x][y].inactive = false
                continue
            }

            if (Globals.grid[x][y].type === 'Snow') {
                Globals.grid[x][y].tick()
            }
        }
    }

    for (let x = 0; x < Globals.widthX; x++) {
        if (Math.random() > 0.999) {
            Globals.grid[x][0] = new Snow({ x, y: 0 })
            Globals.grid[x][0].draw()
        }
    }
    console.timeEnd('frame')

    // TODO: remove
    setTimeout(() => {
        window.requestAnimationFrame(loop)
    }, 2)
}

init()
window.requestAnimationFrame(loop)