const mongoose = require('mongoose')
const {
  Schema
} = mongoose
const {
  STATUS_NORMAL,
  STATUS_STOP
} = require('../common/constants')

const userSchema = new Schema({
  // 账号
  username: {
    type: String,
    required: [true, '必须提供用户名'],
    min: [6, '用户名必须有6个字符以上'],
    max: [50, '用户名不能超过50个字符'],
    trim: true
  },
  // 密码
  password: {
    type: String,
    required: [true, '必须提供密码'],
    trim: true
  },
  // 状态
  state: {
    type: String,
    required: true,
    enum: {
      values: [STATUS_NORMAL, STATUS_STOP],
      message: `状态必须是${STATUS_NORMAL}(正常)、${STATUS_STOP}(封停)之一`
    },
    default: STATUS_NORMAL
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
  }
}, {
  timestamps: {}
})

const User = mongoose.model('User', userSchema)

module.exports = User
