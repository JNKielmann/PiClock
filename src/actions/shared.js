import * as actionTypes from './actionTypes'

export const setState = (newState) => ({
  type: actionTypes.SET_STATE,
  newState,
})
