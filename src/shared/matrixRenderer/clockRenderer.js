import PrimitiveRenderer from './primitiveRenderer'
import padCharsStart from 'lodash/fp/padCharsStart'

export default class ClockRenderer {
  constructor(disp, textRenderer) {
    this.disp = disp
    this.primitiveRenderer = new PrimitiveRenderer(disp)
    this.textRenderer = textRenderer
    this.setTime(0, 0, 0)
    this.setPrimaryColor({ r: 255, g: 255, b: 255 })
    this.setSecondaryColor({ r: 255, g: 255, b: 255 })

  }
  setTime(hours, minutes, seconds) {
    this.hours = isNaN(hours) ? 0 : hours
    this.minutes = isNaN(minutes) ? 0 : minutes
    this.seconds = isNaN(seconds) ? 0 : seconds
  }
  setPrimaryColor(primaryColor) {
    this.primaryColor = primaryColor
  }
  setSecondaryColor(secondaryColor) {
    this.secondaryColor = secondaryColor
  }
  drawAnalog() {
    const x = this.disp.width() / 2
    const y = this.disp.height() / 2
    const radius = this.disp.width() / 2 - 1

    this.primitiveRenderer.drawLinePolar({
      color: this.primaryColor,
      start: { x, y },
      angle: (this.hours % 12 + this.minutes / 60) * (2 * Math.PI / 12) - Math.PI / 2,
      length: radius * 0.55,
    })
    this.primitiveRenderer.drawCircle({
      color: this.secondaryColor,
      center: { x, y },
      radius,
    })
    this.primitiveRenderer.drawLinePolar({
      color: this.primaryColor,
      start: { x, y },
      angle: (this.minutes + this.seconds / 60) * (2 * Math.PI / 60) - Math.PI / 2,
      length: radius * 0.8,
    })
    this.primitiveRenderer.drawLinePolar({
      color: this.primaryColor,
      start: { x, y },
      angle: this.seconds * (2 * Math.PI / 60) - Math.PI / 2,
      length: radius * 0.9,
    })
  }
  drawDigital() {
    const pad = padCharsStart('0')(2)
    const timeString = `${pad(this.hours)}:${pad(this.minutes)}:${pad(this.seconds)}`

    this.textRenderer.drawText(timeString, this.primaryColor, { x: 3, y: 13 })
  }
  drawTextClock() {
    const rowPos = [{ x: 2, y: 3 },
                    { x: 2, y: 10 },
                    { x: 2, y: 17 },
                    { x: 2, y: 24 }]
    const numbers = ['Zwoelf', 'Eins', 'Zwei',
                     'Drei', 'Vier', 'Fuenf',
                     'Sechs', 'Sieben', 'Acht',
                     'Neun', 'Zehn', 'Elf']
   // this.textRenderer.drawText('fuenf nach', this.primaryColor, rowPos[0])
   // this.textRenderer.drawText(numbers[this.hours % 12], this.primaryColor, rowPos[3])


    this.textRenderer.drawScrollingText(
      'Hallo Welt dieser Text scrollt  ',
      this.primaryColor,
      { x: 1, y: 5, w: 25, h: 10 },
     109)
  }
}
