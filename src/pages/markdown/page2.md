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
