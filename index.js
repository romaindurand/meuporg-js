const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const initApp = require('./lib/init-app')
const loginRoute = require('./routes/login').bind(app)
const bindSocket = require('./routes/bind-socket')
const messageHandler = require('./routes/message').bind(app)

initApp(app)
app.post('/login', loginRoute)
http.listen(80, () => { console.log('server listening on port 80') })

io.on('connection', socket => {
  console.log('a user connected')
  socket.on('disconnect', function () {
    const offlineSocket = this
    const index = app.get('onlineUsers').findIndex(user => user.socket === offlineSocket)
    if (index === -1) return
    console.log(`${app.get('onlineUsers')[index].username} has disconnected`)
    app.get('onlineUsers').splice(index, 1)
    console.log(`${app.get('onlineUsers').length} users are connected`)
  })

  socket.on('message', messageHandler)

  socket.on('bind-socket', bindSocket.bind(app, socket))
})
