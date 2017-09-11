module.exports = function ({privateKey, text}) {
  const app = this
  const publicKey = app.getPublicKey(privateKey)
  app.broadcast('message', { publicKey, text })
}
