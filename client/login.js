const $ = require('jquery')

module.exports = function (app) {
  return {
    onLogin (users) {
      if (users instanceof Array) {
        users.forEach(loggedUser => {
          app.pushUser(users)
        })
      } else {
        app.pushUser(users)
      }
    },

    init (loginCallback) {
      $('form#login').submit((event) => {
        event.preventDefault()
        const username = $('.login-username input').val()
        const password = $('.login-password input').val()
        $.ajax({
          url: '/login',
          method: 'POST',
          data: {
            username,
            password
          }
        }).done(user => {
          $('#login').hide()
          $('form#chat, #messages, canvas').show()
          app.user = user
          loginCallback(user)
        }).fail(() => {
          $('.login-password input').val('').focus()
        })
      })
    }
  }
}
