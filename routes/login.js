const cuid = require('cuid')
const cleanData = require('../lib/clean-data')

module.exports = function (req, res) {
  const app = this
  if (!req.body.username || !req.body.password) {
    res.json({ error: 'empty_username_password' })
    return
  }

  app.get('dbUsers').find({
    username: req.body.username,
    password: req.body.password
  }).toArray((err, docs) => {
    if (err) throw new Error('mongodb find login failed')
    if (!docs.length) {
      res.status(401)
      return
    }
    let user = docs[0]
    user.privateKey = cuid()
    user.publicKey = cuid()
    user = cleanData(user, ['password'])
    app.get('onlineUsers').push(user)
    res.json(user)
  })
}
