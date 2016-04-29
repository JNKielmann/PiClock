import Matrix from 'node-rpi-rgb-led-matrix'

class LedMatrix {
  constructor() {
    this.matrix = new Matrix()
  }

  width() {
    return this.matrix.getWidth()
  }
  height() {
    return this.matrix.getHeight()
  }

  setPixel(x, y, { r, g, b }) {
    this.matrix.setPixel(x, y, r, g, b)
  }

  clear(color) {
    if (color === undefined) {
      this.matrix.clear()
    } else {
      this.matrix.fill(color.r, color.g, color.b)
    }
  }
}

export default LedMatrix
