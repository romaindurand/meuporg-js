module.exports = function (socket, privateKey) {
  const app = this
  const user = app.get('onlineUsers').find((user) => user.privateKey === privateKey)
  user.socket = socket
  const userCopy = Object.assign({}, user)
  delete userCopy.privateKey
  delete userCopy.socket
  app.get('onlineUsers').forEach(onlineUser => {
    onlineUser.socket.emit('login', userCopy)
  })
}
