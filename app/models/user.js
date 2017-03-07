/**
 * 用户
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require('../common/constants');

const userSchema = new Schema({
  // 账号
  username: {
    type: String,
    required: [true, '必须提供用户名'],
    min: [6, '用户名必须有6个字符以上'],
    max: [23, '用户名不能超过23个字符'],
    trim: true
  },
  // 密码
  password: {
    type: String,
    required: [true, '必须提供用户名'],
    min: [6, '密码必须有6个字符以上'],
    max: [20, '密码不能超过20个字符'],
    trim: true
  },
  // 状态
  state: {
    type: String,
    required: true,
    enum: {
      values: [constants.STATUS_NORMAL, constants.STATUS_STOP],
      message: '状态必须是${constants.STATUS_NORMAL}(正常)、${constants.STATUS_STOP}(封停)之一'
    },
    default: constants.STATUS_NORMAL
  },
  // 是否已删除
  isDeleted: {
    type: Boolean,
    default: false
  },
  // 删除时间
  deletedAt: {
    type: Date
  },
  // 上一次登录时间
  lastLoginAt: {
    type: Date
  },
  // 创建时间
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
