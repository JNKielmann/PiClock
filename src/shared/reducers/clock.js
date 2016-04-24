import * as actionTypes from '../actions/actionTypes'
import { Map } from 'immutable'

export const initialState = new Map({
  style: 'digital',
  timezoneOffset: 0,
  primaryColor: new Map({ r: 255, g: 0, b: 0 }),
  secondaryColor: new Map({ r: 0, g: 0, b: 255 }),
})
export default function clockReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CLOCK_STYLE:
      return state.set('style', action.style)
    case actionTypes.CHANGE_CLOCK_TIMEZONE:
      return state.set('timezoneOffset', action.timezoneOffset)
    case actionTypes.CHANGE_CLOCK_PRIMARY_COLOR:
      return state.set('primaryColor', action.primaryColor)
    case actionTypes.CHANGE_CLOCK_SECONDARY_COLOR:
      return state.set('secondaryColor', action.secondaryColor)
    default:
      return state
  }
}
