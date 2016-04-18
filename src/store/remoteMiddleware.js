
export default socket => store => next => action => {
    if(action.meta && action.meta.remote === true){
        socket.emit('action', action);
        //return        
    }
    return next(action);
}