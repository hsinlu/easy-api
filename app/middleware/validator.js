const Validator = require('../lib/validator');
const {
  ValidatorError
} = Validator;

function validate (validations, all) {
  const errors = [];

  for (const name in validations) {
    const fn = validations[name];

    if (!fn) throw new TypeError(`必须为参数${name}提供验证程序！`);
    if (typeof fn !== 'function') throw new TypeError(`参数${name}验证程序必须为方法！`);

    const validator = new Validator(name, all[name]);
    fn(validator);

    if (validator.errors.length > 0) {
      errors.push({
        name,
        message: validator.errors.join(',')
      });
    }
  }

  if (errors.length > 0) {
    const err = new ValidatorError();
    err.status = 422;
    err.errors = errors;

    throw err;
  }
}

module.exports = async (ctx, next) => {
  ctx.validate = (validations) => {
    // Combine all request inputs
    const all = Object.assign({}, ctx.query, ctx.request.body, ctx.params, ctx.request.body.fields);
    validate(validations, all);
  };

  await next();
};
