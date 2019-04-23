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