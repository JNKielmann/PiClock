import { combineReducers } from 'redux'
import sharedReducer from './shared'

const rootReducer = combineReducers({
  shared: sharedReducer,
})

export default rootReducer
