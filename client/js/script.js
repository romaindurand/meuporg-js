/* global $, io */

$(function () {
  var socket = io()
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
        socket.emit('message', {text: $('#m').val(), privateKey: user.privateKey})
        $('#m').val('')
        return false
      })
      $('form, #messages').show()
      socket.emit('bind-socket', user.privateKey)
      socket.on('message', ({text, publicKey}) => {
        debugger
      })
      socket.on('login', user => {
        debugger
      })
    })
  }
})
