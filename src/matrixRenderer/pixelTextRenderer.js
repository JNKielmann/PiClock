import reduce from 'lodash/reduce'
import PixelImageRenderer from './pixelImageRenderer'

const padding = 1
export default class PixelTextRenderer {
  constructor(disp, fontObject) {
    this.imageRenderer = new PixelImageRenderer(disp)
    this.fontObject = fontObject
  }
  drawText(text, color, pos) {
    const y = pos.y
    const upperCaseText = text.toUpperCase()
    reduce(
      upperCaseText.split(''),
      (x, char) => x + this._drawChar(char, color, { x, y }),
      pos.x)
  }

  _drawChar(char, color, pos) {
    const charImage = this.fontObject[char]
    if (charImage === undefined) {
      console.log(`undefined character: ${char}`)
      return 0
    }
    this.imageRenderer.drawImage(charImage, color, pos)
    return charImage.width + padding
  }
}
