const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const initApp = require('./lib/init-app')
const loginRoute = require('./routes/login').bind(app)
const bindSocket = require('./routes/bind-socket')

initApp(app)
app.post('/login', loginRoute)
http.listen(80, () => { console.log('server listening on port 80') })

io.on('connection', socket => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('message', ({privateKey, text}) => {
    const publicKey = app.getPublicKey(privateKey)
    app.get('onlineUsers').forEach(user => {
      user.socket.emit('message', {text, publicKey})
    })
  })

  socket.on('bind-socket', bindSocket.bind(app, socket))
})
