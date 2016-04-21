import * as React from 'react'

const TimeZoneSelector = ({ value, onChange }) => {
  const options = []
  for (let i = -12; i <= 14; ++i) {
    options.push(
      <option value={i * 60} key={i}>
          UTC{i < 0 ? i : `+${i}`}
      </option>)
  }
  return (
    <select
      value={value}
      onChange={(event) => onChange(parseInt(event.target.value, 10)) }
    >
      {options}
    </select>
  )
}
TimeZoneSelector.propTypes = {
  value: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
}
export default TimeZoneSelector
