const User = require('../../app/models/user')
const bcrypt = require('bcrypt')
const {
  saltRounds
} = require('../../app/config')

module.exports = async() => {
  const user = {
    username: 'easy-api'
  }
  user.password = await bcrypt.hash('123456', saltRounds)
  await User.create(user)
}
