import * as actionTypes from '../actions/actionTypes'
import { Map, fromJS } from 'immutable'
import clockReducer, { initialState as clockInitialState } from './clock'

export const initialState = new Map({
  clock: clockInitialState,
})

export default function sharedReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_STATE:
      return fromJS(action.newState)
    default:
      return state.setIn(['clock'], clockReducer(state.getIn(['clock']), action))
  }
}
