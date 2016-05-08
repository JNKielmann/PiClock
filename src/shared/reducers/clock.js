import * as actionTypes from 'shared/actions/actionTypes'

export const initialState = {
  clockStyle: 'digital',
  timezoneOffset: 0,
  primaryColor: { r: 255, g: 0, b: 0 },
  secondaryColor: { r: 0, g: 0, b: 255 },
}
export default function clockReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CLOCK_STYLE:
      return {
        ...state,
        clockStyle: action.clockStyle,
      }
    case actionTypes.CHANGE_CLOCK_TIMEZONE:
      return {
        ...state,
        timezoneOffset: action.timezoneOffset,
      }
    case actionTypes.CHANGE_CLOCK_PRIMARY_COLOR:
      return {
        ...state,
        primaryColor: action.primaryColor,
      }
    case actionTypes.CHANGE_CLOCK_SECONDARY_COLOR:
      return {
        ...state,
        secondaryColor: action.secondaryColor,
      }
    default:
      return state
  }
}
