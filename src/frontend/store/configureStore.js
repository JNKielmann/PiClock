import { createStore, applyMiddleware, compose } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import createLogger from 'redux-logger'
import io from 'socket.io-client'
import deepEqual from 'deep-equal'
import rootReducer from 'shared/reducers'
import remoteMiddleware from './remoteMiddleware'
import { setState } from 'shared/actions/shared'


export default function configureStore(initialState) {
  const socket = io('http://192.168.0.14:8090')
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(remoteMiddleware(socket)), // thunkMiddleware, createLogger()),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
  socket.on('newState', (newState) => {
    const currentState = store.getState().shared
    if (!deepEqual(newState, currentState)) {
      store.dispatch(setState(newState))
    }
  })

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../../shared/reducers', () => {
      const nextRootReducer = require('../../shared/reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
