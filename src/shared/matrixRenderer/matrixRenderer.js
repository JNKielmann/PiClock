import ClockRenderer from './clockRenderer'
import PixelTextRenderer from './pixelTextRenderer'

export default class MatrixRenderer {

  constructor(matrixDisplay) {
    const smallFont = new PixelTextRenderer(matrixDisplay, require('./simpleFontSmall'))
    this.clock = new ClockRenderer(matrixDisplay, smallFont)
    this.matrixDisplay = matrixDisplay
  }

  render(state) {
    this.matrixDisplay.clear()
    this.renderClock(state.shared.clock)
  }

  renderClock(clockState) {
    this.clock.setPrimaryColor(clockState.primaryColor)
    this.clock.setSecondaryColor(clockState.secondaryColor)
    const date = new Date(new Date().getTime() + clockState.timezoneOffset * 60000)
    this.clock.setTime(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())
    const clockStyle = clockState.clockStyle
    switch (clockStyle) {
      case 'digital':
        this.clock.drawDigital()
        break
      case 'analog':
        this.clock.drawAnalog()
        break
      case 'text':
        this.clock.drawTextClock()
        break
      default:
        console.error(`There is no clock style with the name ${clockStyle}`)
    }
  }
}

