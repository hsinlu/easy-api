module.exports.signin = async(ctx, next) => {
  ctx.validate({
    'username': (validator) => validator.required(),
    'password': (validator) => validator.required().min(6)
  })

  await next()
}
