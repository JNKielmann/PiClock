import { createStore, applyMiddleware, compose } from 'redux'
//import thunkMiddleware from 'redux-thunk'
//import createLogger from 'redux-logger'
import io from 'socket.io-client'
import Immutable from 'immutable';
import equal from 'deep-equal'
import rootReducer from '../reducers'
import remoteMiddleware from './remoteMiddleware'
import {setState} from '../actions/shared'


export default function configureStore(initialState) {
    const socket = io('http://localhost:8090')
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(remoteMiddleware(socket)),//thunkMiddleware, createLogger()),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )
    socket.on('newState', (newState)=>{
        const sharedState = store.getState().get('shared')
        if(!equal(newState, sharedState.toJS())){
           store.dispatch(setState(newState))
        }
    })

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}