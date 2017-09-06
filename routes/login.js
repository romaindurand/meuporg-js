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
    console.log('Found the following records')
    const user = docs[0]
    user.privateKey = cuid()
    user.publicKey = cuid()
    cleanData.selfView(user)
    app.get('onlineUsers').push(user)
    res.json(user)
  })
}
