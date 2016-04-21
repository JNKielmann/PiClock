import Server from 'socket.io'
import rootReducer from '../reducers'
import { createStore } from 'redux'

const io = new Server().attach(8090)
const store = createStore(rootReducer)

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
    console.log(`Action reveived: ${action.type}`)
    store.dispatch(action)
  })
})
console.log('Setup complete')
