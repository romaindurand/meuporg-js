/* global io */
const app = require('./app')()
const loginHandler = require('./login')(app)
const chatHandler = require('./chat')(app)
const displayHandler = require('./display')(app)

loginHandler.init((user) => {
  app.socket = io()
  app.socket.emit('bind-socket', user.privateKey)
  chatHandler()
  displayHandler.init()
  displayHandler.addUser(user)

  app.socket.on('login', loginHandler.onLogin)
  app.socket.on('online-users', users => {
    app.onlineUsers = users
  })
})
