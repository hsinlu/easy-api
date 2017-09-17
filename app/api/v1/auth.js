const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const only = require('only')
const debug = require('debug')('easy-api:api:auth')
const constants = require('../../common/constants')
const auth = require('../../middleware/auth')
const config = require('../../config')
const timespan = require('jsonwebtoken/lib/timespan')
const redis = require('../../lib/redis')
const userValidator = require('../../validators/user')
const {
  jwtTokenKey
} = require('../../common/keys')
const router = require('koa-router')()

router
  // 登录
  .post('/signin', userValidator.signin, async (ctx) => {
    const {
      username,
      password
    } = ctx.request.body

    // 查询数据库已有的用户
    let user = await User.findOne({
      username: username,
      isDeleted: false
    })

    // 如果用户未注册过
    if (!user) {
      ctx.throw(400, '该账号未注册！')
    }

    // 用户被锁定
    if (user.state === constants.STATUS_STOP) ctx.throw(423, '用户已被锁定')

    const match = await bcrypt.compare(password, user.password)
    // 验证密码是否正确
    if (!match) {
      ctx.throw(400, '密码错误')
    }

    // 更新最后一次登录事件
    user = await User.findOneAndUpdate({
      _id: user._id
    }, {
        $set: {
          lastLoginAt: new Date
        }
      }, { new: true })

    ctx.body = {
      _id: user._id,
      username: user.username,
      state: user.state,
      lastLoginAt: user.lastLoginAt,
      exp: timespan(config.jwt.expressIn),
      token: jwt.sign(only(user, '_id username'), config.jwt.secret, {
        expiresIn: config.jwt.expressIn
      })
    }
  })

  // 退出
  .get('/signout', auth(), async (ctx) => {
    const {
      exp,
      token
    } = ctx.state.user

    // 将 Authorization 添加到 Redis，包含此 token 的请求将不可用
    let ttl = Math.floor(exp - (new Date() / 1000))
    await redis.setexAsync(jwtTokenKey(token), ttl, true)

    ctx.status = 200
  })

module.exports = router
