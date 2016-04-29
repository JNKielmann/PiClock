import Server from 'socket.io'
import rootReducer from '../shared/reducers'
import { createStore } from 'redux'
import util from 'util'
import { fromJS } from 'immutable'

import MatrixRenderer from '../shared/matrixRenderer/matrixRenderer'
import LedMatrix from './matrixRenderer/ledMatrix'

const io = new Server().attach(8090)
const store = createStore(rootReducer)

const matrixRenderer = new MatrixRenderer()
const ledMatrix = new LedMatrix()
matrixRenderer.render(ledMatrix, store.getState())
store.subscribe(() => {
  matrixRenderer.render(ledMatrix, store.getState())
})

store.subscribe(() => {
  console.log('Send new state')
  io.emit('newState', store.getState().get('shared').toJS())
})
io.on('connection', (socket) => {
  socket.emit('newState', store.getState().get('shared').toJS())
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('action', (action) => {
    console.log(`Action reveived: ${util.inspect(action)}`)
    store.dispatch(fromJS(action))
  })
})
console.log('Setup complete')
