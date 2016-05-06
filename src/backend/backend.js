import Server from 'socket.io'
import rootReducer from '../shared/reducers'
import { createStore } from 'redux'
import util from 'util'

import MatrixRenderer from '../shared/matrixRenderer/matrixRenderer'
import LedMatrix from './matrixRenderer/ledMatrix'

const io = new Server().attach(8090)
const store = createStore(rootReducer)

const ledMatrix = new LedMatrix()
const matrixRenderer = new MatrixRenderer(ledMatrix)
setInterval(() => {
  matrixRenderer.render(store.getState())
}, 1000 / 10)


store.subscribe(() => {
  console.log('Send new state')
  io.emit('newState', store.getState().shared)
})
io.on('connection', (socket) => {
  console.log('a user connected')
  socket.emit('newState', store.getState().shared)
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('action', (action) => {
    console.log(`Action reveived: ${util.inspect(action)}`)
    store.dispatch(action)
  })
})
console.log('Setup complete')
