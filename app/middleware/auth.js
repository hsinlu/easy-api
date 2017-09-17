const Promise = require('bluebird')
const JWT = Promise.promisifyAll(require('jsonwebtoken'))
const debug = require('debug')('easy-api:middleware:auth')
const redis = require('../lib/redis')
const config = require('../config')
const {
  jwtTokenKey
} = require('../common/keys')

module.exports = () => {
  return async(ctx, next) => {
    const token = resolveAuthorizationHeader(ctx)

    debug(`解析到token ${token}`)

    if (!token) {
      ctx.throw(401, '没有提供授权 token')
    }

    // 判断jwt是否已退出过，如果已经退出，返回401
    const isExist = await redis.existsAsync(jwtTokenKey(token))
    if (!!isExist) {
      debug(`token ${token}已失效`)
      ctx.throw(401, '当前 token 已失效')
    }

    // 验证 token，并解密
    try {
      const user = await JWT.verifyAsync(token, config.jwt.secret)
      user.token = token

      debug(`解析当前登录用户`, user)

      ctx.state = ctx.state || {}
      ctx.state['user'] = user
    } catch (err) {
      debug(`token 解析失败`, err)

      if (err instanceof JWT.TokenExpiredError) {
        ctx.throw(401, 'token 已过期')
      }

      ctx.throw(401, 'token 不正确')
    }

    await next()
  }
}

/**
 * 解析 Authorization 头，并返回 token
 *
 * @param {Object}        ctx  koa 上下文
 * @return {String|null}  解析后的 token
 */
function resolveAuthorizationHeader(ctx) {
  if (!ctx.header || !ctx.header.authorization) {
    return
  }

  const parts = ctx.header.authorization.split(' ')

  if (parts.length !== 2) {
    ctx.throw(401, 'Authorization 头格式不正确，正确格式为 "Authorization: Bearer <token>"')
  }

  const scheme = parts[0]
  const credentials = parts[1]

  if (/^Bearer$/i.test(scheme)) {
    return credentials
  }
}
