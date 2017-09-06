module.exports = (user, keys) => {
  const userCopy = Object.assign({}, user)
  keys.forEach(key => {
    delete userCopy[key]
  })
  return userCopy
}
