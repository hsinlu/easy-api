/**
 * 初始化数据
 */
const mongoose = require('mongoose');
const connect = require('../../app/lib/db/connect');

(async function seeder() {
  try {
    // 连接 mongodb
    await connect();
    console.log('mongodb 已成功连接，开始初始化数据。');

    // 初始化用户
    await require('./user')();

    console.log('所有数据初始化完成。');

    mongoose.disconnect();
  } catch (err) {
    console.log(`初始化数据错误: ${err}`);
    process.exit(1);
  }
})();
