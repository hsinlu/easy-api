const Validator = require('../lib/validator');
const ValidatorError = Validator.ValidatorError;

module.exports = async (ctx, next) => {
  // 挂载验证方法
  ctx.validate = (validations) => {
    const errors = [];

    // 拼接所有请求参数
    const params = Object.assign({}, ctx.query, ctx.request.body, ctx.params, ctx.request.body.fields);

    for (let name in validations) {
      const fn = validations[name];

      if (!fn) throw new TypeError(`必须为参数${name}提供验证程序！`);
      if (typeof fn !== 'function') throw new TypeError(`参数${name}验证程序必须为方法！`);

      const validator = new Validator(name, params[name]);
      fn(validator);

      if (validator.errors.length > 0) {
        errors.push({ name, message: validator.errors.join(',') });
      }
    }

    if (errors.length > 0) {
      const err = new ValidatorError;
      err.status = 422;
      err.errors = errors;

      throw err;
    }
  }

  await next();
};
