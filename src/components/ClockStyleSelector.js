import React, { PropTypes } from 'react'

const componentName = ({ clockStyle, onStyleChanged }) => (
  <div>
    <select
      value={clockStyle}
      onChange={(event) => onStyleChanged(event.target.value) }
    >
      <option value="digital"> Digital </option>
      <option value="analog"> Analog </option>
      <option value="text"> Text </option>
    </select>
  </div>
)


componentName.propTypes = {
  clockStyle: PropTypes.oneOf(['digital', 'analog', 'text']),
  onStyleChanged: PropTypes.func.isRequired,
}

export default componentName
