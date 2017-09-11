const $ = require('jquery')

module.exports = function (app) {
  return function () {
    $('form').submit(function () {
      app.socket.emit('message', { text: $('#m').val(), privateKey: app.user.privateKey })
      $('#m').val('')
      return false
    })
    app.socket.on('message', ({ text, publicKey }) => {
      const username = app.onlineUsers.find(user => user.publicKey === publicKey).username
      $('#messages').append(`<li><i>${username}</i> : ${text}</li>`)
      $('#messages').scrollTop($('#messages')[0].scrollHeight)
    })
  }
}
