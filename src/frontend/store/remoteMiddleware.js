
// eslint-disable-next-line no-unused-vars
export default socket => store => next => action => {
  if (action.meta && action.meta.remote === true) {
    socket.emit('action', action)
    // Return here to only update when server sends new state
    // return
  }
  return next(action)
}
