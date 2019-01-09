// Imports 
const Empty = require('../molecules/Empty.js')
const Snow = require('../molecules/Snow.js')
const Sand = require('../molecules/Sand.js')
const Sage = require('../molecules/Sage.js')
const Oil = require('../molecules/Oil.js')
const Salt = require('../molecules/Salt.js')
const Water = require('../molecules/Water.js')
const Block = require('../molecules/Block.js')

const Particle = require('../molecules/Particle.js')
const Powder = require('../molecules/Powder.js')
const Liquid = require('../molecules/Liquid.js')

const Utils = require('./Utils.js')
const Grid = require('./Grid.js')

const queryString = require('query-string')

// The main game class 
class Game {
    // The constructor to setup the game 
    constructor(target) {
        const canvas = document.getElementById(target)
        this.spawning = {
            radius: 2, 
            type: 100
        }
        this.generateables = [201, 202, 204, 205, 301]
        this.generateChance = 0.001
        this.parseQuery()

        canvas.setAttribute('height', Globals.width.y)
        canvas.setAttribute('width', Globals.width.x)

        const context = canvas.getContext('2d')

        this.sizes = this.calculateSizes()
        this.tick = false
        this.running = false
        this.sizeOffset = 100
        this.getGenerateables(this.generateables)

        Globals.grid = new Grid(context)
        Globals.grid.fill(Empty)

        Globals.grid.drawLine(Block, { x: 0, y: 0 }, { x: 0, y: Globals.width.y - 1 }, true)
        Globals.grid.drawLine(Block, { x: 0, y: 0 }, { x: Globals.width.x - 1, y: 0 }, true)
        Globals.grid.drawLine(Block, { x: Globals.width.x - 1, y: 0 }, { x: Globals.width.x - 1, y: Globals.width.y - 1 }, true)
        Globals.grid.drawLine(Block, { x: 0, y: Globals.width.y - 1 }, { x: Globals.width.x - 1, y: Globals.width.y - 1 }, true)

        canvas.addEventListener('mousedown', e => this.startSpawn(e), false)    
        canvas.addEventListener('mouseup', e => this.stopSpawn(e), false)
        document.addEventListener('mouseup', e => this.stopSpawn(e), false)

        canvas.addEventListener('mousemove', e => this.updatePos(e), false)
        canvas.addEventListener('mouseenter', e => this.updatePos(e), false)

        window.addEventListener('resize', e => this.resizeCanvas(this.calculateSizes()), false)

        this.canvas = canvas
        this.context = context

        this.resizeCanvas(this.calculateSizes())
        console.log("The canvas sizes are: " + String(Globals.width.x) + " by " + String(Globals.width.y) + "; the scale is: " + String(Globals.scale) + ". ")

        this.x = 0
        this.y = 0

        this.generate = true

        window.requestAnimationFrame(this.loop.bind(this))
    }

    // The main game loop 
    async loop(time) {
        let tick = this.tick
        if (this.running || this.tick) { Globals.grid.tick(); this.tick = false }
        Globals.grid.render()
        Globals.grid.draw()

        for (let i = 1; i < Globals.width.x - 1; i++) {
            const random = Math.random()
            const pos = i + Globals.width.x

            if (this.generate && (this.running || tick)) {
                
                for (let j = 0; j < this.generateables.length; j++) {
                    if (random < (this.generateChance * (j + 1))) {
                        Globals.grid.setMolecule(new this.generateables[j]({ pos }))
                    }
                }
                
                /*
                if (random < this.generateChance * 1) Globals.grid.setMolecule(new Snow({ pos }))
                if (random < this.generateChance * 2) Globals.grid.setMolecule(new Sand({ pos }))
                if (random < this.generateChance * 3) Globals.grid.setMolecule(new Salt({ pos }))
                if (random < this.generateChance * 4) Globals.grid.setMolecule(new Oil({ pos }))
                if (random < this.generateChance * 5) Globals.grid.setMolecule(new Sage({ pos }))
                */
            }
        }

        if (development) meter.tick()
        window.requestAnimationFrame(this.loop.bind(this))
    }

    // Parse the size given in the URL bar 
    parseQuery() {
        canvasSizes = queryString.parse(window.location.search)
        if (development) {
            console.log(canvasSizes)
        }
        if (canvasSizes[Utils.queryNames.xSize] != null && canvasSizes[Utils.queryNames.xSize] != undefined && canvasSizes[Utils.queryNames.xSize] != "") {
            if (isNaN(canvasSizes[Utils.queryNames.xSize]) == false) {
                Globals.width.x = parseInt(canvasSizes[Utils.queryNames.xSize])
            }
        }
        if (canvasSizes[Utils.queryNames.ySize] != null && canvasSizes[Utils.queryNames.ySize] != undefined && canvasSizes[Utils.queryNames.ySize] != "") {
            if (isNaN(canvasSizes[Utils.queryNames.ySize]) == false) {
                Globals.width.y = parseInt(canvasSizes[Utils.queryNames.ySize])
            }
        }
        if (canvasSizes[Utils.queryNames.type] != null && canvasSizes[Utils.queryNames.type] != undefined && canvasSizes[Utils.queryNames.type] != "") {
            if (isNaN(canvasSizes[Utils.queryNames.type]) == false) {
                this.spawning.type = parseInt(canvasSizes[Utils.queryNames.type])
            }
        }
        if (canvasSizes[Utils.queryNames.radius] != null && canvasSizes[Utils.queryNames.radius] != undefined && canvasSizes[Utils.queryNames.radius] != "") {
            if (isNaN(canvasSizes[Utils.queryNames.radius]) == false) {
                this.spawning.radius = parseInt(canvasSizes[Utils.queryNames.radius])
            }
        }
        if (canvasSizes[Utils.queryNames.generate] != null && canvasSizes[Utils.queryNames.generate] != undefined && canvasSizes[Utils.queryNames.generate] != "") {
            this.generateables = canvasSizes[Utils.queryNames.generate].split(",")
        }
        if (canvasSizes[Utils.queryNames.generateChance] != null && 
            canvasSizes[Utils.queryNames.generateChance] != undefined && canvasSizes[Utils.queryNames.generateChance] != "") {
            if (isNaN(canvasSizes[Utils.queryNames.generateChance]) == false) {
                this.generateChance = parseFloat(canvasSizes[Utils.queryNames.generateChance])
            }
        }
        document.getElementById(Utils.ids.sizesForm + "x").value = Globals.width.x
        document.getElementById(Utils.ids.sizesForm + "y").value = Globals.width.y
        document.getElementById(Utils.ids.types).value = this.spawning.type
        document.getElementById(Utils.ids.typesRadius).value = this.spawning.radius
        if (development) {
            console.log(this.generateables)
            console.log(this.generateChance)
        }
    }

    // Get the molecules to generate 
    getGenerateables(ids) {
        molecules = []
        for (let i = 0; (i < ids.length) && (i * this.generateChance < 1); i++) {
            molecules.push(this.moleculeFromId(ids[i]))
        }
        this.generateables = molecules
    }

    // Get the relative x and y coordinates of an element 
    getRelativeLocation(element, { clientX, clientY }) {
        const { left, top } = element.getBoundingClientRect()
        return {
            x: Math.round((clientX - left) / Globals.scale),
            y: Math.round((clientY - top) / Globals.scale)
        }
    }

    // Calculate and set the canvas size 
    calculateSizes() {
        let rect = document.getElementById(Utils.ids.innerWrapper).getBoundingClientRect()
        return {
            innerWidth: Math.floor(rect.width),
            width: window.innerWidth,
            innerHeight: Math.floor(rect.height),
            height: window.innerHeight,
            x: Math.ceil(rect.x), 
            y: Math.ceil(rect.y)
        }
    }

    resizeCanvas(sizes) {
        const widthRatio = (sizes.innerWidth - this.sizeOffset) / Globals.width.x
        const heightRatio = (sizes.height - sizes.y - this.sizeOffset) / Globals.width.y
        if (development) {
            console.log(String(widthRatio) + " || " + String(heightRatio))
        }

        if (widthRatio > heightRatio) {
            // Use the height ratio 
            // Display the menu off to the side.
            this.canvas.style.width = `${Globals.width.x * heightRatio}px`
            this.canvas.style.height = `${Globals.width.y * heightRatio}px`

            Globals.scale = heightRatio
            if (development) {
                console.log("hr")
            }
        } else {
            // Use the width ratio 
            // Display the menu off to the bottom.
            this.canvas.style.width = `${Globals.width.x * widthRatio}px`
            this.canvas.style.height = `${Globals.width.y * widthRatio}px`

            Globals.scale = widthRatio
            if (development) {
                console.log("wr")
            }
        }
    }

    // Get molecule from id
    moleculeFromId(id) {
        id = String(id)
        if (id === String(Utils.molecules.Particle)) {
            return Particle
        }
        else if (id === String(Utils.molecules.Empty)) {
            return Empty
        }
        else if (id === String(Utils.molecules.Block)) {
            return Block
        }
        else if (id === String(Utils.molecules.Powder)) {
            return Powder
        }
        else if (id === String(Utils.molecules.Sage)) {
            return Sage
        }
        else if (id === String(Utils.molecules.Salt)) {
            return Salt
        }
        else if (id === String(Utils.molecules.Sand)) {
            return Sand
        }
        else if (id === String(Utils.molecules.Snow)) {
            return Snow
        }
        else if (id === String(Utils.molecules.Liquid)) {
            return Liquid
        }
        else if (id === String(Utils.molecules.Water)) {
            return Water
        }
        else if (id === String(Utils.molecules.Oil)) {
            return Oil
        }
        else {
            return Empty
        }
    }

    // Add a molecule 
    spawn(Molecule, center, radius) {
        Globals.grid.drawPoint(Molecule, center, radius)
    }

    // Spawn particles on click 
    startSpawn() {
        if (this.clickInterval) {
            clearInterval(this.clickInterval)
            this.clickInterval = null
        }

        this.clickInterval = setInterval(() => {
            this.spawn(this.moleculeFromId(this.spawning.type), { x: this.x, y: this.y }, this.spawning.radius)
        })
    }

    stopSpawn() {
        clearInterval(this.clickInterval)
        this.clickInterval = null
    }

    updatePos(event) {
        const location = this.getRelativeLocation(this.canvas, event)

        this.x = location.x
        this.y = location.y
    }

    // Buttons 
    start() {
        if (!this.running) {
            this.running = true
        }
    }

    stop() {
        if (this.running) {
            this.running = false
        }
    }

    tick() {
        this.running = false
        this.tick = true
    }

    reset() {
        console.log('Resetting Grid')
        Globals.grid.fill(Empty) 
    }

    makeFloor() {
        Globals.grid.drawLine(Block, { x: 0, y: Globals.width.y - 1 }, { x: Globals.width.x - 1, y: Globals.width.y - 1 }, true)
    }

    removeFloor() {
        Globals.grid.drawLine(Empty, { x: 1, y: Globals.width.y - 1 }, { x: Globals.width.x - 2, y: Globals.width.y - 1 }, true)
    }

    startGenerate() {
        if (!this.generate) {
            this.generate = true
        }
    }

    stopGenerate() {
        if (this.generate) {
            this.generate = false
        }
    }

    setSpawnType() {
        try {
            this.spawning.type = parseInt(document.getElementById(Utils.ids.types).value)
            this.spawning.radius = parseInt(document.getElementById(Utils.ids.typesRadius).value)
        }
        catch {}
    }

    setGenerationChance() {
        try {
            this.generateChance = parseInt(document.getElementById(Utils.ids.generateChance).value)
        }
        catch {}
    }
}

// Exports 
module.exports = Game
