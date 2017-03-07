const User = require('../../app/models/user');
const constants = require('../../app/common/constants');

const userList = [
  {
    username: 'admin123',
    password: '123456',
  }
];

module.exports = async () => {
  for (let item of userList)
    await User.create(item);
};
