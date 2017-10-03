module.exports = function () {
  return {
    onlineUsers: [],
    pushUser (user) {
      const index = this.onlineUsers.findIndex(onlineUser => onlineUser._id === user._id)
      if (index === -1) {
        this.onlineUsers.push(user)
        this.displayHandler.addUser(user)
      }
    }
  }
}
