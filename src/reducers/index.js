import { combineReducers } from 'redux-immutable'
import sharedReducer from './shared'

const rootReducer = combineReducers({
    shared: sharedReducer
})

export default rootReducer  