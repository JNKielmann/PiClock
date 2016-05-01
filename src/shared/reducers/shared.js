import * as actionTypes from '../actions/actionTypes'
import clockReducer, { initialState as clockInitialState } from './clock'

export const initialState = {
  clock: clockInitialState,
}

export default function sharedReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_STATE:
      return action.newState
    case actionTypes.CHANGE_CLOCK_STYLE:
    case actionTypes.CHANGE_CLOCK_TIMEZONE:
    case actionTypes.CHANGE_CLOCK_PRIMARY_COLOR:
    case actionTypes.CHANGE_CLOCK_SECONDARY_COLOR:
      return {
        ...state,
        clock: clockReducer(state.clock, action),
      }
    default:
      return state
  }
}
