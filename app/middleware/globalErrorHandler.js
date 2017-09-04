const mongoose = require('mongoose')
const validator = require('../lib/validator')

module.exports = async(ctx, next) => {
  try {
    await next()
  } catch (err) {
    // 根据不同的错误类型，执行不同的错误处理
    // mongodb 模型校验错误
    if (err instanceof mongoose.Error.ValidationError) {
      const errors = []
      for (let name in err.errors) {
        errors.push({
          name: name,
          message: err.errors[name].message
        })
      }

      ctx.body = errors
      ctx.status = 422
    }
    // 验证器验证错误
    else if (err instanceof validator.ValidatorError) {
      ctx.status = err.status
      ctx.body = err.errors
    }
    // 没有捕获到可预知的异常
    else {
      ctx.body = {
        message: err.message
      }
      ctx.status = err.status || 500

      ctx.app.emit('error', err, ctx)
    }
  }
}
