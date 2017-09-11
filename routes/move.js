module.exports = function ({privateKey, coords}) {
  const app = this
  const publicKey = app.getPublicKey(privateKey)
  app.broadcast('message', { publicKey, text })
}
