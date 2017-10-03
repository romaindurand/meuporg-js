const cleanData = require('../lib/clean-data')

module.exports = function (socket, privateKey) {
  const app = this
  const user = app.get('onlineUsers').find((user) => user.privateKey === privateKey)
  user.socket = socket
  const userCopy = Object.assign({}, user)
  delete userCopy.privateKey
  delete userCopy.socket
  app.broadcast('login', userCopy)
  socket.emit('login', app.get('onlineUsers').map(user => cleanData(user, ['privateKey', 'password', 'socket'])))
}
