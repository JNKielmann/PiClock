
export default class PixelImageRenderer {
  constructor(disp) {
    this.disp = disp
  }

  drawImage(image, color, pos,
      cullRect = { x: 0, y: 0, w: this.disp.width(), h: this.disp.height() }) {
    // TODO: Move this into intersect rects funktion and write tests for it.
    const startSrcX = Math.min(image.width, Math.max(0, cullRect.x - pos.x))
    const endSrcX = Math.min(image.width, Math.max(0, cullRect.x + cullRect.w - pos.x))
    const startSrcY = Math.min(image.height, Math.max(0, cullRect.y - pos.y))
    const endSrcY = Math.min(image.height, Math.max(0, cullRect.y + cullRect.h - pos.y))

    const visibleRows = image.data.slice(startSrcY, endSrcY)
    visibleRows.forEach((row, deltaY) => {
      const visibleRowPart = row.slice(startSrcX, endSrcX)
      this._drawRow(visibleRowPart, color, pos.x + startSrcX, pos.y + startSrcY + deltaY, cullRect)
    })
  }
  _drawRow(row, color, destX, destY) {
    row.forEach((pixelValue, srcX) => {
      if (row[srcX] === 1) {
        this.disp.setPixel(destX + srcX, destY, color)
      }
    })
  }
}
