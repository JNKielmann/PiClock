import * as React from 'react'
import { connect } from 'react-redux'
import * as clockActions from 'shared/actions/clock'
import TimezoneSelector from 'frontend/components/TimezoneSelector'
import ColorPicker from 'frontend/components/ColorPicker'
import ClockStyleSelector from 'frontend/components/ClockStyleSelector'
import { Grid, Row, Col } from 'react-bootstrap'

const ClockPanel = (props) => (
  <div>
    <Grid className={'pull-left'}>
      <Row>
          <Col xs={3}> Clock style: </Col>
          <Col xs={9}>
            <ClockStyleSelector
              clockStyle={props.clockStyle}
              onStyleChanged={props.onStyleChanged}
            />
          </Col>
      </Row>
      <Row>
          <Col xs={3}>Timezone: </Col>
          <Col xs={9}>
            <TimezoneSelector
              value={props.timezoneOffset}
              onChange={props.onTimezoneChange}
            />
          </Col>
      </Row>
        <Row>
          <Col xs={3}>Pimary Color: </Col>
          <Col xs={9}>
            <ColorPicker
              color={props.primaryColor}
              onChangeComplete={colorObj => props.onPrimaryColorChange(colorObj.rgb) }
              onChange={colorObj => props.onPrimaryColorChangeLive(colorObj.rgb) }
            />
          </Col>
        </Row>
        <Row>
          <Col xs={3}>Secondary Color: </Col>
          <Col xs={9}>
            <ColorPicker
              color={props.secondaryColor}
              onChangeComplete={colorObj => props.onSecondaryColorChange(colorObj.rgb) }
              onChange={colorObj => props.onSecondaryColorChangeLive(colorObj.rgb) }
            />
          </Col>
        </Row>
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
