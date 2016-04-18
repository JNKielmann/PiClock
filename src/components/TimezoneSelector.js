import * as React from 'react'

class TimeZoneSelector extends React.Component {
    render() {
        let options = []
        for (let i = -12; i <= 14; ++i) {
            options.push(
                <option value={i * 60} key={i}>
                    UTC{i < 0 ? i : '+' + i}
                </option>)
        }
        return (
            <select value={this.props.value}
                onChange={(event) => this.props.onChange(parseInt(event.target.value)) }>
                {options}
            </select>
        )
    }
}
TimeZoneSelector.propTypes = {
    value: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired
}
export default TimeZoneSelector;