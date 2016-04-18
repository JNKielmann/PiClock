import * as React from 'react'
import {connect} from 'react-redux'
import * as clockActions from '../actions/clock'
import TimezoneSelector from '../components/TimezoneSelector'
import ColorPicker from '../components/ColorPicker'
function changeHandler(colors) {
    console.log(colors);
}
class ClockPanel extends React.Component {

    render() {
        var props = this.props
        return (
            <div>
                <h2>Clock Options: </h2>
                <table><tbody>
                    <tr>
                        <td> Clock style: </td>
                        <td>
                            <select value={props.clockStyle}
                                onChange={(event) => props.onStyleChanged(event.target.value) }>
                                <option value='digital'> Digital </option>
                                <option value='analog'> Analog </option>
                                <option value='text'> Text </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Timezone: </td>
                        <td>
                            <TimezoneSelector value={props.timezoneOffset}
                                onChange={props.onTimezoneChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Pimary Color: </td>
                        <td>
                            <ColorPicker
                                color={props.primaryColor}
                                onChange={colorObj => props.onPrimaryColorChangeLive(colorObj.rgb) }
                                onChangeComplete={colorObj => props.onPrimaryColorChange(colorObj.rgb) }
                                />
                        </td>
                    </tr>
                    <tr>
                        <td>Secondary Color: </td>
                        <td>
                            <ColorPicker
                                color={props.secondaryColor}
                                onChange={colorObj => props.onSecondaryColorChangeLive(colorObj.rgb) }
                                onChangeComplete={colorObj => props.onSecondaryColorChange(colorObj.rgb) }
                                />
                        </td>
                    </tr>

                </tbody></table>

            </div>
        );
    }
}
ClockPanel.propTypes = {
    clockStyle: React.PropTypes.string.isRequired,
    timezoneOffset: React.PropTypes.number.isRequired,
    primaryColor: React.PropTypes.object.isRequired,
    secondaryColor: React.PropTypes.object.isRequired
}
function mapStateToProps(state) {
    var clockState = state.getIn(['shared', 'clock'])
    return {
        clockStyle: clockState.get('style'),
        timezoneOffset: clockState.get('timezoneOffset'),
        primaryColor: clockState.get('primaryColor').toJS(),
        secondaryColor: clockState.get('secondaryColor').toJS()
    }
}
const mapDispatchToProps = {
    onStyleChanged: clockActions.changeClockStyle,
    onTimezoneChange: clockActions.changeClockTimezone,
    onPrimaryColorChange: clockActions.changeClockPrimaryColor,
    onSecondaryColorChange: clockActions.changeClockSecondaryColor,
    onPrimaryColorChangeLive: clockActions.changeClockPrimaryColorLive,
    onSecondaryColorChangeLive: clockActions.changeClockSecondaryColorLive
}
export default connect(mapStateToProps, mapDispatchToProps)(ClockPanel)