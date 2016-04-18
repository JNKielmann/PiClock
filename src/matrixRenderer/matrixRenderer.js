import ClockRenderer from './clockRenderer'
import PixelTextRenderer from './pixelTextRenderer'

export default class MatrixRenderer {

    render(matrixDisplay, state) {
        var smallFont = new PixelTextRenderer(matrixDisplay, require('./simpleFontSmall'))
        let clock = new ClockRenderer(matrixDisplay, smallFont)
        let clockState = state.getIn(['shared', 'clock'])
        clock.setPrimaryColor(clockState.get('primaryColor').toJS())
        clock.setSecondaryColor(clockState.get('secondaryColor').toJS())
        clearInterval(this.clockInterval)
        let renderClock = () => {
            let date = new Date(new Date().getTime() + clockState.get('timezoneOffset') * 60000)
            clock.setTime(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())
            matrixDisplay.clear()
            switch (clockState.get('style')) {
                case 'digital':
                    clock.drawDigital()
                    break
                case 'analog':
                    clock.drawAnalog()
                    break
                case 'text':
                    clock.drawTextClock()
                    break
            }            
        }
        renderClock()
        this.clockInterval = setInterval(renderClock, 1000)
    }

    unmount() {
        clearInterval(this.clockInterval)
    }
}

