/* global io */
const app = require('./app')()
const loginHandler = require('./login')(app)
const chatHandler = require('./chat')(app)
app.displayHandler = require('./display')(app)

loginHandler.init((user) => {
  app.socket = io()
  app.socket.emit('bind-socket', user.privateKey)
  chatHandler()
  app.displayHandler.init()

  app.socket.on('login', loginHandler.onLogin)
})
