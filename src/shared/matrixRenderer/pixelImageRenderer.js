import forEach from 'lodash/forEach'
export default class PixelImageRenderer {
  constructor(disp) {
    this.disp = disp
  }

  drawImage(image, color = { r: 0, g: 0, b: 0 }, pos = { x: 0, y: 0 }) {
    forEach(image.data, (row, deltaY) => {
      this._drawRow(row, color, pos.x, pos.y + deltaY)
    })
  }
  _drawRow(row, color, destX, destY) {
    forEach(row, (pixelValue, srcX) => {
      if (row[srcX] === 1) {
        this.disp.setPixel(destX + srcX, destY, color)
      }
    })
  }
}
