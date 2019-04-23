---
path: "/how"
date: "2017-11-03"
title: "How"
---
## Code
### Index.html
The main html page where we are going to draw the clock on.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSSE2</title>
    <link rel="stylesheet" href="assets/css/main.css">
    <script type="module" src="assets/js/main.js"></script>
</head>

<body>
    <main>
        <h1>Computer Science &amp; Software Engineering 2</h1>
        <p>Check the browser console.</p>
        <button onclick="window.dispatchEvent(new Event('updateCanvas'))">Update</button>
    </main>
</body>

</html>
```
---
### Vector.js
The vector class. This class is used to draw points that all together make up the clockface.

In this class we make methods needed. What the methods do is explained in the comments of the code.

```javascript
import Matrix2 from './Matrix2.js'

/** Class representing a two-dimensional vector. */
export default class Vector2 {
    /**
     * Create a vector.
     * @param {Number} x - The horizontal vector component.
     * @param {Number} y - The vertical vector component.
     */
    constructor(x, y) {
        this.x = Number(x) || 0
        this.y = Number(y) || 0
    }

    /**
     * Calculate the length of the vector.
     * @return {Number} The length of the vector
     */
    getVectorLength() {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }

    /**
     * Addition of a vector to the current vector.
     * @param {Vector2} vector2 - The second vector.
     */
    addVectors(vector2) {
        this.x += vector2.x
        this.y += vector2.y
    }

    /**
     * Subtraction of a vector from the current vector.
     * @param {Vector2} vector2 - The second vector.
     */
    subtractVectors(vector2) {
        this.x -= vector2.x
        this.y -= vector2.y
    }

    /**
     * Scalar multiplication. Multiplies a vector by a scalar.
     * @param {Number} factor - The scalar value.
     */
    scalarMultiplication(factor) {
        this.x *= factor
        this.y *= factor
    }

    /**
     * Calculate the dot product of the current vector and another vector.
     * @param {Vector2} vector2 - The second vector.
     * @return {Number} the dot product of the wzo
     */
    getDotProduct(vector2) {
        return this.x * vector2.x + this.y * vector2.y
    }

    /**
     * Rotate the vector around the origin.
     * @param {Number} rotationAngle - The anticlockwise angle in degrees.
     */
    rotateVector(rotationAngle) {
        const matrix = new Matrix2([this.x, 0, this.y, 0])
        matrix.rot(rotationAngle)
        this.x = matrix.elements[0]
        this.y = matrix.elements[2]
    }
}
```
---
### Canvas.js

The class where all the magic happens. Here we use the vector class to make the clockface en update each second.

#### constructor
This is the first part of the canvas class. Ofcourse we need to import the vector class to use it further on. The first thing we do in a class is making a constructor. A constructor is called when a new instance of this class is made. Within a constructor we set the necessary member variables with the given arguments or with constants when possible.

```javascript
import Vector2 from './Math/Vector2.js'

/** Class representing a canvas element for WebGL2 */
export default class Canvas {
    constructor(width, height, shaderSources) {
        this.width = width
        this.height = height
        this.shaderSources = shaderSources

        this.colors = {
            black: [0, 0, 0, 0],
            blue: [0, 0, 255, 0],
            cyan: [0, 255, 255, 0],
            green: [0, 255, 0, 0],
            magenta: [255, 0, 255, 0],
            red: [255, 0, 0, 0],
            white: [255, 255, 255, 0],
            yellow: [255, 255, 0, 0],
        }
        this.properties = {
            colors: [],
            positions: [],
        }

        this.gl = null
        this.program = null
        this.run()

        window.addEventListener('updateCanvas', event => {
            this.updateCanvasHandler(event)
        }, false);

    }
```
#### updateCanvasHandler()
The code below tells each vector where to be at what moment in time and what color to display the clockface. The most important part here is the for-loop in the middle. That's where the hands of the clock are drawn. The for-loop at the bottom draws the circle of the clock.

```javascript
updateCanvasHandler(event) {
    console.log('updateCanvas')
    this.clearproperties()

    // White point in the middle
    this.properties.positions.push(0, 0)
    this.properties.colors.push(...this.colors.white)

    const v = new Vector2(0, 0.5)
    this.properties.positions.push(v.x, v.y)
    this.properties.colors.push(...this.colors.red)

    const indicators = new Vector2(0, 0.48)
    this.properties.positions.push(indicators.x, indicators.y)
    this.properties.colors.push(...this.colors.magenta)

    const colors = [
        'magenta',
        'magenta',
        'magenta',
        'magenta',
        'magenta',
        'magenta',
        'magenta'
    ]

    colors.forEach(color => {
        indicators.rotateVectorateVector(45)
        this.properties.positions.push(indicators.x, indicators.y)
        this.properties.colors.push(...this.colors[color])
    });

    const time = new Date()

    console.log((time.getHoursVector() * -30) - time.getMinutesVector()/2)


    for(let i = 0; i < 0.45; i+=0.0001) {
        const secondsVector = new Vector2(0, i)
        secondsVector.rotateVector(time.getSeconds() * -6)
        this.properties.positions.push(secondsVector.x, secondsVector.y)
        this.properties.colors.push(...this.colors.white) 

        if(i <= 0.35) {
            const minutesVector = new Vector2(0, i)
            minutesVector.rotateVector(time.getMinutes() * -6)
            this.properties.positions.push(minutesVector.x, minutesVector.y)
            this.properties.colors.push(...this.colors.white)
        }


        if(i <= 0.15) {
            const hoursVector = new Vector2(0, i)
            hoursVector.rotateVector((time.getHours() * -30) - time.getMinutes()/2)
            this.properties.positions.push(hoursVector.x, hoursVector.y)
            this.properties.colors.push(...this.colors.white)
        }
    }

    for(let i = 0; i < 360; i++) {
        v.rotateVector(1)
        this.properties.positions.push(v.x, v.y)
        this.properties.colors.push(...this.colors['green'])
    }

    this.drawScene()
}
```
#### refreshCanvas()
This method waits 1 second and calls updateCanvasHandler() making sure each passing second is shown on the clock. Then it calls itself and waits again.

```javascript
refreshCanvas() {
    setTimeout(() => {
        this.updateCanvasHandler()
        this.refreshCanvas()
    }, 1000)
}
```
#### run()
Here is the method that initiates everthing. It calls all needed methods en keeps the clock ticking by calling refreshCanvas().
```javascript
run() {
    try {
        this.createCanvas()
        this.createShaders()
        this.createProgram()
        this.createVertexArray()
        // Initial drawing on the canvas
        {
            // Random points
            for (let i = 0, max = 100000; i < max; i++) {
                this.properties.positions.push(Math.random() * 2 - 1, Math.random() * 2 - 1)
                this.properties.colors.push(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255), 0)
            }
            // White point in the middle.
            this.properties.positions.push(0, 0)
            this.properties.colors.push(...this.colors.white)
        }
        this.drawScene()
        this.refreshCanvas()

    } catch (error) {
        console.error(error)
    }
}
```
#### clearproperties()
clearproperties() clears, as the name suggests, the properties of the canvas class.
```javascript
clearproperties() {
    this.properties = {
        colors: [],
        positions: [],
    }
}
```
#### createBuffers()
Calls the createBuffer() method for the data used.
```javascript
createBuffers() {
    this.createBuffer('COLOR')
    this.createBuffer('POSITION')
}
```
#### createBuffer()
A method that creates buffers to store the date that for the shader program to use.
```javascript
createBuffer(bufferType) {
    const gl = this.gl
    const program = this.program

    let name // Name of attribute used in GLSL.
    let normalized // Should it be normalized to a value between 0 and 1.
    let size // Number of components per vertex attribute, can be 1 through 4.
    let srcproperties
    let type // propertiestype.
    const stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position.
    const offset = 0 // Start at the beginning of the buffer.

    switch (bufferType) {
        case 'COLOR':
            name = 'a_VertexColor'
            normalized = true
            size = 4
            srcproperties = new Uint8Array(this.properties.colors)
            type = gl.UNSIGNED_BYTE // Integer from 0 through 255.
            break
        case 'POSITION':
            name = 'a_VertexPosition'
            normalized = false
            size = 2
            srcproperties = new Float32Array(this.properties.positions)
            type = gl.FLOAT
            break
        default:
            return null
    }

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferproperties(gl.ARRAY_BUFFER, srcproperties, gl.STATIC_DRAW)

    const index = gl.getAttribLocation(program, name)
    gl.enableVertexAttribArray(index)
    gl.vertexAttribPointer(index, size, type, normalized, stride, offset) // @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer
}
```
#### createCanvas()
This method adds a canvas element to the index.html page wich is needed for drawing the clock and sets the options needed to work with a shader program.
```javascript
createCanvas() {
    const canvas = document.createElement('canvas')
    document.body.appendChild(canvas)
    canvas.height = this.height
    canvas.width = this.width
    const gl = this.gl = canvas.getContext('webgl2')
    gl.clearColor(0, 0, 0, 0) // @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearColor
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height) // @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/viewport
}
```
#### createProgram()
Creates the shader program.
```javascript
createProgram() {
    const gl = this.gl

    const program = gl.createProgram()
    gl.attachShader(program, this.vertexShader)
    gl.attachShader(program, this.fragmentShader)
    gl.linkProgram(program)

    const success = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (success) {
        this.program = program
        gl.useProgram(program)
    } else {
        console.error(gl.getProgramInfoLog(program))
        gl.deleteProgram(program)
    }
}
```
#### createShaders()
Calls the createShader() method to create the needed shaders.
```javascript
createShaders() {
    const gl = this.gl

    this.vertexShader = this.createShader(gl.VERTEX_SHADER)
    this.fragmentShader = this.createShader(gl.FRAGMENT_SHADER)
}
```
#### createShader()
Creates a shader based on the given type.
```javascript
createShader(type) {
    const gl = this.gl

    let source
    switch (type) {
        case gl.FRAGMENT_SHADER:
            source = this.shaderSources.fragment
            break
        case gl.VERTEX_SHADER:
            source = this.shaderSources.vertex
            break
        default:
            console.error('Shader type does not exist.')
            return null
    }

    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (success) {
        return shader
    }
    console.error(type, gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
}
```
#### createVertexArray()
A method that creates an array to store the vertices.
```javascript
createVertexArray() {
    const gl = this.gl

    const vertexArray = gl.createVertexArray()
    gl.bindVertexArray(vertexArray)
}
```
#### drawScene()
When called, this method draws the clock with all the data we've set. This method initially gets called in the run() method. Then it gets called every second in the updateCanvasHandler().
```javascript
    drawScene() {
        const gl = this.gl

        this.createBuffers()

        gl.clear(gl.COLOR_BUFFER_BIT) // @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clear

        const modes = [ // @see https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants#Rendering_primitives
            gl.POINTS,
            gl.LINES,
            gl.LINE_STRIP,
            gl.LINE_LOOP,
            gl.TRIANGLES,
            gl.TRIANGLE_STRIP,
            gl.TRIANGLE_FAN,
        ]
        const dimensions = 2
        const mode = modes[0]
        const first = 0
        const count = this.properties.positions.length / dimensions
        gl.drawArrays(mode, first, count) // @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawArrays
    }
}
```
There's no canvas instance made yet so we will have to make one in an other file. Thats what's happening in Application.js.
-----
### Application.js
In Application.js are all the resources the canvas class needs pre loaded using the preloader() method. When all the resources are loaded the run() method gets called and makes an instance of the canvas class. 
```javascript
import Canvas from './Library/Canvas.js'
import Tests from './Tests/Tests.js'

/** Class for the application. */
export default class Application {
    /**
     * Create a new application.
     */
    constructor() {
        const tests = false
        if (tests) {
            new Tests()
        }
        console.info('WebGL2 Demo')

        this.shaderSources = {
            fragment: null,
            vertex: null,
        }
        this.preloader()
    }

    async preloader() {
        console.info('Preloading source code for shaders')
        await fetch('./assets/glsl/vertex-shader.glsl')
            .then(response => response.text())
            .then(source => this.shaderSources.vertex = source)
            .catch(error => console.error(error.message))
        await fetch('./assets/glsl/fragment-shader.glsl')
            .then(response => response.text())
            .then(source => this.shaderSources.fragment = source)
            .catch(error => console.error(error.message))
        this.run()
    }

    run() {
        const width = 600
        const height = 600

        new Canvas(width, height, this.shaderSources)
    }
}
```
---
Now, an instance of the canvas class will be made when all the resources are loaded within an instance of the application class, so now we need to make an application object. That will be done in the Main.js file when all the DOM content had loaded.

### Main.js
```javascript
import Application from './Application.js'

window.addEventListener('DOMContentLoaded', _ => new Application(), false)
```