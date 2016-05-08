import reduce from 'lodash/reduce'
import PixelImageRenderer from './pixelImageRenderer'

const padding = 1
export default class PixelTextRenderer {
  constructor(disp, fontObject) {
    this.imageRenderer = new PixelImageRenderer(disp)
    this.fontObject = fontObject
  }

  /**
   * Draws text to the matrix
   *
   * @param {string} text String to draw
   * @param {{r,g,b}} color The textcolor
   * @param {{x,y}} pos Position of the top left corner
   */
  drawText(text, color, pos) {
    const y = pos.y
    const upperCaseText = text.toUpperCase()
    reduce(
      upperCaseText.split(''),
      (x, char) => x + this._drawChar(char, color, { x, y }),
      pos.x)
  }

  /**
   * Draws a text that will scroll the text in x direction by the specified amount
   * @param {string} text String to draw
   * @param {{r,g,b}} color The textcolor
   * @param {{x,y,w,h}} rect Area the text will be drawn in
   * @param {number} scrollOffset Amount of pixel the text should be scrolled
   */
  drawScrollingText(text, color, rect, scrollOffset) {
    const upperCaseText = text.toUpperCase()
    let currentX = rect.x - scrollOffset
    let wordLength = 0
    while (currentX < rect.x + rect.w) {
      wordLength = 0
      for (const char of upperCaseText) {
        const charSize = this._drawChar(char, color, { x: currentX, y: rect.y }, rect)
        wordLength += charSize
        currentX += charSize
      }
    }
    return wordLength
  }

  /**
   * Draws a single character using the font object
   * @param {string} char Single character to draw
   * @param {{r,g,b}} color Color of the character
   * @param {{x,y}} pos Position of the top left corner
   * @param {{x,y,w,h}} [cullRect] Only pixel within the cull rectangle will be visible
   */
  _drawChar(char, color, pos, cullRect) {
    const charImage = this.fontObject[char]
    if (charImage === undefined) {
      console.log(`undefined character: ${char}`)
      return 0
    }
    this.imageRenderer.drawImage(charImage, color, pos, cullRect)
    return charImage.width + padding
  }
}
