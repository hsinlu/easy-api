const User = require('../../app/models/user');

module.exports = async () => {
  const user = {
    username: 'easy-api',
    password: '123456'
  };

  await User.create(user);
};
