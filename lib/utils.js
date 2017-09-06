module.exports = {
  getPublicKey (privateKey) {
    return this.app.get('onlineUsers').find(user => user.privateKey === privateKey).publicKey
  },

  getUsername (privateKey) {

  }
}
