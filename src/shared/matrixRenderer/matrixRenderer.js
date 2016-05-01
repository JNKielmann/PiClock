import ClockRenderer from './clockRenderer'
import PixelTextRenderer from './pixelTextRenderer'

export default class MatrixRenderer {

  render(matrixDisplay, state) {
    const smallFont = new PixelTextRenderer(matrixDisplay, require('./simpleFontSmall'))
    const clock = new ClockRenderer(matrixDisplay, smallFont)
    const clockState = state.shared.clock
    clock.setPrimaryColor(clockState.primaryColor)
    clock.setSecondaryColor(clockState.secondaryColor)
    clearInterval(this.clockInterval)
    const renderClock = () => {
      const date = new Date(new Date().getTime() + clockState.timezoneOffset * 60000)
      clock.setTime(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())
      matrixDisplay.clear()
      const clockStyle = clockState.clockStyle
      switch (clockStyle) {
        case 'digital':
          clock.drawDigital()
          break
        case 'analog':
          clock.drawAnalog()
          break
        case 'text':
          clock.drawTextClock()
          break
        default:
          console.error(`There is no clock style with the name ${clockStyle}`)
      }
    }
    renderClock()
    this.clockInterval = setInterval(renderClock, 1000)
  }

  unmount() {
    clearInterval(this.clockInterval)
  }
}

