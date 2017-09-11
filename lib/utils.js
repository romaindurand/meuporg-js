module.exports = {
  getPublicKey (privateKey) {
    return this.app.get('onlineUsers').find(user => user.privateKey === privateKey).publicKey
  },

  broadcast (eventName, data) {
    this.app.get('onlineUsers').forEach(user => {
      user.socket.emit(eventName, data)
    })
  },

  getUsername (privateKey) {
    return this.app.get('onlineUsers').find(user => user.privateKey === privateKey).username
  }
}
