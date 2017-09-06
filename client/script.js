/* global io */
const $ = require('jquery')
const app = require('./app')

app.socket = io()
app.onlineUsers = []

$('.login button').click(login)
$('.login').keypress((event) => {
  if (event.key === 'Enter') login()
})

function login () {
  const username = $('.login-username input').val()
  const password = $('.login-password input').val()
  $.ajax({
    url: '/login',
    method: 'POST',
    data: {
      username,
      password
    }
  }).done((user) => {
    $('.login').hide()
    $('form').submit(function () {
      app.socket.emit('message', {text: $('#m').val(), privateKey: user.privateKey})
      $('#m').val('')
      return false
    })
    $('form, #messages').show()
    app.socket.emit('bind-socket', user.privateKey)
    app.socket.on('message', ({text, publicKey}) => {
      const username = app.onlineUsers.find(user => user.publicKey === publicKey).username
      $('#messages').append(`<li><i>${username}</i> : ${text}</li>`)
    })
    app.socket.on('login', user => {
      app.onlineUsers.push(user)
    })
    app.socket.on('online-users', users => {
      app.onlineUsers = users
    })
  })
}

