module.exports.signin = async (ctx, next) => {
  ctx.validate({
    'username': (validator) => validator.required(),
    'password': (validator) => validator.required()
  });

  await next();
}
