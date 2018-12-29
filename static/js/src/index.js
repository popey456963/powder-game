import "babel-polyfill"

const Empty = require('./molecules/Empty')
const Snow = require('./molecules/Snow')

const Constants = require('./modules/Constants')
const Globals = require('./modules/Globals')
const Grid = require('./modules/Grid')
const Coords = require('./modules/Coords')

const pixelX = 520
const pixelY = 520

Globals.resolution = 2
Globals.widthX = pixelX / Globals.resolution
Globals.widthY = pixelY / Globals.resolution

const widthX = Globals.widthX

if (parseInt(Globals.widthX) !== Globals.widthX) throw 'Invalid resolution for X'
if (parseInt(Globals.widthY) !== Globals.widthY) throw 'Invalid resolution for Y'

function pad3(num) {
    return ('   ' + num).slice(-3)
}

async function pause(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}

function init() {
    $('#game').attr('height', Globals.widthY * Globals.resolution)
    $('#game').attr('width', Globals.widthX * Globals.resolution)

    Globals.canvas = document.getElementById('game').getContext('2d')
    Globals.grid = new Grid(Globals.widthX, Globals.widthY)
}

async function loop(timestamp) {
    const tickStart = performance.now()
    const slim = Globals.grid.slim
    const full = Globals.grid.full

    slim.map((item, index) => {
        if (item !== 1) {
            const { x, y } = Coords.toXY(index, widthX)
            const molecule = full[x][y]

            if (molecule.inactive) {
                molecule.inactive = false
                return
            }

            molecule.tick()
        }
    })

    const tickStop = performance.now()

    for (let x = 0; x < Globals.widthX; x++) {
        if (Math.random() > 0.95) {
            Globals.grid.set(new Snow({ x, y: 0 }, { draw: true }))
        }
    }

    console.log(`tick ${pad3(tickStop - tickStart)}ms`)// getFull ${pad3(getFullStop - getFullStart)}ms molecules ${pad3(moleculesStop - moleculesStart)}ms`)

    // TODO: remove
    window.requestAnimationFrame(loop)
}

init()
window.requestAnimationFrame(loop)