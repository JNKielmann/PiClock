
const pixelSize = 13
const padding = 1
const matrixSize = 32


class CanvasMatrix {
    /**
     * @param {Node} parentElement
     */
  constructor(parentElement) {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = (pixelSize + 2 * padding) * matrixSize
    parentElement.appendChild(canvas)
    this.ctx = canvas.getContext('2d')
  }

  width() {
    return matrixSize
  }
  height() {
    return matrixSize
  }

  setPixel(x, y, { r, g, b }) {
    this.ctx.clearRect(x * (pixelSize + 2 * padding),
            y * (pixelSize + 2 * padding), pixelSize, pixelSize)
    this.ctx.beginPath()
    this.ctx.arc(x * (pixelSize + 2 * padding) + pixelSize / 2,
            y * (pixelSize + 2 * padding) + pixelSize / 2,
            pixelSize / 2, 0, 2 * Math.PI)
    this.ctx.fillStyle = `rgb(${r},${g},${b})`
    this.ctx.fill()
  }

  clear(color = { r: 240, g: 240, b: 240 }) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    for (let x = 0; x < matrixSize; ++x) {
      for (let y = 0; y < matrixSize; ++y) {
        this.setPixel(x, y, color)
      }
    }
  }
}

export default CanvasMatrix
