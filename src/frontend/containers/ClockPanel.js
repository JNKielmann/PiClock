import * as React from 'react'
import { connect } from 'react-redux'
import * as clockActions from '../../shared/actions/clock'
import TimezoneSelector from '../components/TimezoneSelector'
import ColorPicker from '../components/ColorPicker'
import ClockStyleSelector from '../components/ClockStyleSelector'
import { Grid, Row } from 'react-bootstrap'

const ClockPanel = (props) => (
  <div>
  <h2>Clock Options: </h2>
    <Grid>
      <table><tbody>
        <tr>
          <td> Clock style: </td>
          <td>
            <ClockStyleSelector
              clockStyle={props.clockStyle}
              onStyleChanged={props.onStyleChanged}
            />
          </td>
        </tr>
        <tr>
          <td>Timezone: </td>
          <td>
            <TimezoneSelector
              value={props.timezoneOffset}
              onChange={props.onTimezoneChange}
            />
          </td>
        </tr>
        <tr>
          <td>Pimary Color: </td>
          <td>
            <ColorPicker
              color={props.primaryColor}
              onChangeComplete={colorObj => props.onPrimaryColorChange(colorObj.rgb) }
              onChange={colorObj => props.onPrimaryColorChangeLive(colorObj.rgb) }
            />
          </td>
        </tr>
        <tr>
          <td>Secondary Color: </td>
          <td>
            <ColorPicker
              color={props.secondaryColor}
              onChangeComplete={colorObj => props.onSecondaryColorChange(colorObj.rgb) }
              onChange={colorObj => props.onSecondaryColorChangeLive(colorObj.rgb) }
            />
          </td>
        </tr>

      </tbody></table>
    </Grid>
  </div>
)

ClockPanel.propTypes = {
  clockStyle: ClockStyleSelector.propTypes.clockStyle,
  timezoneOffset: React.PropTypes.number.isRequired,
  primaryColor: React.PropTypes.object.isRequired,
  secondaryColor: React.PropTypes.object.isRequired,

  onStyleChanged: React.PropTypes.func.isRequired,
  onTimezoneChange: React.PropTypes.func.isRequired,
  onPrimaryColorChange: React.PropTypes.func.isRequired,
  onPrimaryColorChangeLive: React.PropTypes.func.isRequired,
  onSecondaryColorChange: React.PropTypes.func.isRequired,
  onSecondaryColorChangeLive: React.PropTypes.func.isRequired,
}
function mapStateToProps(state) {
  return state.shared.clock
}
const mapDispatchToProps = {
  onStyleChanged: clockActions.changeClockStyle,
  onTimezoneChange: clockActions.changeClockTimezone,
  onPrimaryColorChange: clockActions.changeClockPrimaryColor,
  onSecondaryColorChange: clockActions.changeClockSecondaryColor,
  onPrimaryColorChangeLive: clockActions.changeClockPrimaryColorLive,
  onSecondaryColorChangeLive: clockActions.changeClockSecondaryColorLive,
}
export default connect(mapStateToProps, mapDispatchToProps)(ClockPanel)
