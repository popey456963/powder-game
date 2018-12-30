const vertexShaderScript = `
    attribute vec2 a_position;

    uniform vec2 u_resolution;

    void main() {
        // convert the rectangle from pixels to 0.0 to 1.0
        vec2 zeroToOne = a_position / u_resolution;

        // convert from 0 -> 1 to 0 -> 2
        vec2 zeroToTwo = zeroToOne * 2.0;

        // convert from 0 -> 2 to -1 -> +1 (clipspace)
        vec2 clipSpace = zeroToTwo - 1.0;

        // Flip 0,0 from bottom left to conventional 2D top left.
        gl_PointSize = 1.0;
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
`

const fragmentShaderScript = `
    precision mediump float;

	uniform vec4 u_color;

	void main() {
  	    gl_FragColor = u_color;
	}
`

class WebGL {
    constructor(id) {
        this.canvas = document.getElementById(id)
        this.gl = this.canvas.getContext("webgl", { antialias: false })

        this.vertexShader = this.createShader(vertexShaderScript, this.gl.VERTEX_SHADER)
        this.fragmentShader = this.createShader(fragmentShaderScript, this.gl.FRAGMENT_SHADER)

        this.createGLProgram([this.vertexShader, this.fragmentShader])
        this.gl.useProgram(this.program)
        
        // Store color location.
        this.colorLocation = this.gl.getUniformLocation(this.program, "u_color")

        // Look up where the vertex data needs to go.
        this.positionLocation = this.gl.getAttribLocation(this.program, "a_position")

        // Set the resolution.
        this.resolutionLocation = this.gl.getUniformLocation(this.program, "u_resolution")
        this.gl.uniform2f(this.resolutionLocation, this.canvas.width, this.canvas.height)
        
        // Create a buffer.
        this.buffer = this.gl.createBuffer()
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer)
        this.gl.enableVertexAttribArray(this.positionLocation)
        
        // Send the vertex data to the shader program.
        this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0)

        // Set background colour
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    }

    createGLProgram(shaders) {
        this.program = this.gl.createProgram()

        for (let shader of shaders) {
            this.gl.attachShader(this.program, shader)
        }

        this.gl.linkProgram(this.program)
        const linked = this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)
        
        if (!linked) {
            const lastError = this.gl.getProgramInfoLog(this.program)
            console.error("Error in program linking: " + lastError)
    
            this.gl.deleteProgram(this.program);
            this.program = null
        }
    }

    createShader(shaderScriptText, shaderType) {
        const shader = this.gl.createShader(shaderType)

        this.gl.shaderSource(shader, shaderScriptText)
        this.gl.compileShader(shader)

        return shader
    }

    setColour(r, g, b, a) {
        this.gl.uniform4f(this.colorLocation, r, g, b, a)
    }

    setPixel(x, y) {
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
            x + 0.5, y + 0.5
        ]), this.gl.STATIC_DRAW)

        this.gl.drawArrays(this.gl.POINTS, 0, 1)
    }
}

module.exports = WebGL