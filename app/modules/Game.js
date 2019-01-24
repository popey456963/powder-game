const Molecule = require('./Molecule')
const Utils = require('./Utils')
const Grid = require('./Grid')

const queryString = require('query-string')

// The main game class 
class Game {
    // The constructor to setup the game 
    constructor(target) {
        // Set the initial values 
        const canvas = document.getElementById(target)
        this.spawning = {
            radius: 2, 
            type: 100
        }
        this.generateableIds = [201, 202, 204, 205, 301]
        this.generateChance = 0.001
        this.generate = true
        this.boundaryWidth = 1
        this.data = ""
        this.parseQuery()

        canvas.setAttribute('height', Globals.width.y)
        canvas.setAttribute('width', Globals.width.x)

        // Get the canvas context 
        const context = canvas.getContext('2d')

        // Get the 'second level' values 
        this.sizes = this.calculateSizes()
        this.tick = false
        this.running = false
        this.sizeOffset = {
            width: 100, 
            height: 100
        }
        this.getGenerateables(this.generateableIds)

        // Instantiate and fill the grid 
        Globals.grid = new Grid(context)
        if (this.parseStartData()) Globals.grid.fill(Molecule.Empty)

        // Draw the boundaries 
        Globals.grid.drawBoundaries(Molecule.Indestructible, this.boundaryWidth, true)

        // Add event listeners 
        canvas.addEventListener('mousedown', e => this.startSpawn(e), false)    
        canvas.addEventListener('mouseup', e => this.stopSpawn(e), false)
        document.addEventListener('mouseup', e => this.stopSpawn(e), false)

        canvas.addEventListener('mousemove', e => this.updatePos(e), false)
        canvas.addEventListener('mouseenter', e => this.updatePos(e), false)

        window.addEventListener('resize', e => this.resizeCanvas(this.calculateSizes()), false)

        // Store the canvas and context 
        this.canvas = canvas
        this.context = context

        // Set the canvas size 
        this.resizeCanvas(this.calculateSizes())
        console.log("The canvas sizes are: " + String(Globals.width.x) + " by " + String(Globals.width.y) + "; the scale is: " + String(Globals.scale) + ". ")

        // Set mouse position 
        this.x = 0
        this.y = 0

        // Start animation 
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
                if (random < this.generateChance * 4) Globals.grid.setMolecule(new Oil ({ pos }))
                if (random < this.generateChance * 5) Globals.grid.setMolecule(new Sage({ pos }))
                */
            }
        }

        if (development) meter.tick()
        window.requestAnimationFrame(this.loop.bind(this))
    }

    // Parse the data given in the URL bar 
    parseQuery() {
        queryData = queryString.parse(window.location.search)
        if (development) {
            console.log(queryData)
        }
        if (queryData[Utils.queryNames.xSize] != null && queryData[Utils.queryNames.xSize] != undefined && queryData[Utils.queryNames.xSize] != "") {
            if (isNaN(queryData[Utils.queryNames.xSize]) == false) {
                Globals.width.x = parseInt(queryData[Utils.queryNames.xSize])
            }
        }
        if (queryData[Utils.queryNames.ySize] != null && queryData[Utils.queryNames.ySize] != undefined && queryData[Utils.queryNames.ySize] != "") {
            if (isNaN(queryData[Utils.queryNames.ySize]) == false) {
                Globals.width.y = parseInt(queryData[Utils.queryNames.ySize])
            }
        }
        if (queryData[Utils.queryNames.type] != null && queryData[Utils.queryNames.type] != undefined && queryData[Utils.queryNames.type] != "") {
            if (isNaN(queryData[Utils.queryNames.type]) == false) {
                this.spawning.type = parseInt(queryData[Utils.queryNames.type])
            }
        }
        if (queryData[Utils.queryNames.radius] != null && queryData[Utils.queryNames.radius] != undefined && queryData[Utils.queryNames.radius] != "") {
            if (isNaN(queryData[Utils.queryNames.radius]) == false) {
                this.spawning.radius = parseInt(queryData[Utils.queryNames.radius])
            }
        }
        if (queryData[Utils.queryNames.generate] != null && queryData[Utils.queryNames.generate] != undefined && queryData[Utils.queryNames.generate] != "") {
            this.generateableIds = queryData[Utils.queryNames.generate].split(",")
        }
        if (queryData[Utils.queryNames.generateChance] != null && 
            queryData[Utils.queryNames.generateChance] != undefined && queryData[Utils.queryNames.generateChance] != "") {
            if (isNaN(queryData[Utils.queryNames.generateChance]) == false) {
                this.generateChance = parseFloat(queryData[Utils.queryNames.generateChance])
            }
        }
        if (queryData[Utils.queryNames.start] != null && queryData[Utils.queryNames.start] != undefined && queryData[Utils.queryNames.start] != "") {
            this.data = queryData[Utils.queryNames.start]
        }
        if (queryData[Utils.queryNames.submit] != null && queryData[Utils.queryNames.submit] != undefined && queryData[Utils.queryNames.submit] != "") {
        }
        if (queryData[Utils.queryNames.boundaryWidth] != null && 
            queryData[Utils.queryNames.boundaryWidth] != undefined && queryData[Utils.queryNames.boundaryWidth] != "") {
            if (isNaN(queryData[Utils.queryNames.boundaryWidth]) == false) {
                this.boundaryWidth = parseInt(queryData[Utils.queryNames.boundaryWidth])
            }
        }
        if (queryData[Utils.queryNames.doGenerate] != null && 
            queryData[Utils.queryNames.doGenerate] != undefined && queryData[Utils.queryNames.doGenerate] != "") {
            if (isNaN(queryData[Utils.queryNames.doGenerate]) == false) {
                let doGenerate = parseInt(queryData[Utils.queryNames.doGenerate])
                if (doGenerate > 0) {
                    this.generate = true
                }
                else {
                    this.generate = false
                }
            }
        }
        document.getElementById(Utils.ids.sizesForm + "x").value = Globals.width.x
        document.getElementById(Utils.ids.sizesForm + "y").value = Globals.width.y
        document.getElementById(Utils.ids.types).value = this.spawning.type
        document.getElementById(Utils.ids.typesRadius).value = this.spawning.radius
        document.getElementById(Utils.ids.generateChance).value = this.generateChance
        if (development) {
            console.log(this.generateables)
            console.log(this.generateChance)
        }
    }

    // Get the molecules to generate 
    getGenerateables(ids) {
        molecules = []
        for (let i = 0; (i < ids.length) && (i * this.generateChance < 1); i++) {
            molecules.push(Molecule.fromId(ids[i]))
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

    // Set the width and height offsets 
    setWidthOffset(offset) {
        this.sizeOffset.width = offset
    }

    setHeightOffset(offset) {
        this.sizeOffset.height = offset
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
        const widthRatio = (sizes.innerWidth - this.sizeOffset.width) / Globals.width.x
        const heightRatio = (sizes.height - this.sizeOffset.height) / Globals.width.y
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

    // Add a particle 
    spawn(Particle, center, radius) {
        Globals.grid.drawPoint(Particle, center, radius)
    }

    // Spawn particles on click 
    startSpawn() {
        if (this.clickInterval) {
            clearInterval(this.clickInterval)
            this.clickInterval = null
        }

        this.clickInterval = setInterval(() => {
            this.spawn(Molecule.fromId(this.spawning.type), { x: this.x, y: this.y }, this.spawning.radius)
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

    // Parse start data
    parseStartData() {
        if (this.data === "") return true
        if (String(Globals.width.x) + "$" + String(Globals.width.y) !== this.data.split("!")[0]) return true
        contentsData = this.data.split("!")[1].split("$")
        if (contentsData.length !== Globals.width.x * Globals.width.y) return true
        for (let i = 0; i < contentsData.length; i++) {
            //console.log(i)
            let Particle = Molecule.fromId(parseInt(contentsData[i].split("*")[0]))
            Globals.grid.setMolecule(new Particle({ pos: i }), true)
            //console.log(Molecule)
        }
        return false
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

    doTick() {
        this.running = false
        this.tick = true
    }

    reset() {
        console.log('Resetting Grid')
        Globals.grid.fill(Molecule.Empty) 
    }

    makeFloor() {
        Globals.grid.drawLine(Molecule.Block, { x: 0, y: Globals.width.y - 1 }, { x: Globals.width.x - 1, y: Globals.width.y - 1 }, true)
    }

    removeFloor() {
        Globals.grid.drawLine(Molecule.Empty, { x: 1, y: Globals.width.y - 1 }, { x: Globals.width.x - 2, y: Globals.width.y - 1 }, true)
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
            this.generateChance = parseFloat(document.getElementById(Utils.ids.generateChance).value)
        }
        catch {}
    }
}

// Exports 
module.exports = Game
