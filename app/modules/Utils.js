module.exports = {
    pause: function(time) {
        return new Promise(resolve => setTimeout(resolve, time))
    },
    getCanvasSize: function() {
        return document.getElementById(this.ids.canvas).getBoundingClientRect()
    },
	ids: {
        canvas: 'game',
        container: 'gameArea',
        innerWrapper: 'innerWrapper',
        start: 'start',
        stop: 'stop',
        tick: 'tick',
        reset: 'reset',
        makeFloor: 'makeFloor',
        removeFloor: 'removeFloor',
        startGenerate: 'startGenerate',
        stopGenerate: 'stopGenerate',
        sizesForm: 'sizes',
        typesButton: 'typesButton',
        types: 'typest',
        typesRadius: 'typesr',
        generateChance: 'genc', 
        generateButton: 'genButton'
    },
    molecules: {
        Particle: 1,
        Empty: 2,
        Block: 100,
        Concrete: 101,
        Indestructible: 102,
        Powder: 200,
        Sand: 201,
        Snow: 202, 
        Salt: 204, 
        Sage: 205,
        Soil: 206,
        Liquid: 300,
        Oil: 301, 
        Water: 302
    },
    queryNames: {
        xSize: 'x', 
        ySize: 'y', 
        type: 't',
        radius: 'r',
        generate: 'g',
        generateChance: 'c'
    },
    widthOffset: 32
}

