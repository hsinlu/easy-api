const mongoose = require('mongoose');
const connect = require('../../app/lib/db/connect');
const User = require('../../app/models/user');

(async function emptyData() {
  try {
    await connect();

    await User.remove({});

    console.log('所有数据已清空');

    mongoose.disconnect();
  } catch (err) {
    console.log(`清空数据错误: ${err}`);
    process.exit(1);
  }
})();
