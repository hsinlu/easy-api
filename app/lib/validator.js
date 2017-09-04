const validator = require('validator')

/** 验证器错误 */
class ValidatorError extends Error {}

/**
 * 验证器
 *
 */
class Validator {
  constructor(name, value) {
    this._name = name
    this._value = value

    this._errors = []
  }

  get errors() {
    return this._errors
  }

  _addErr(message) {
    this._errors.push(message)
  }

  required(errMsg) {
    if (!this._value) this._addErr(errMsg || `${this._name} 不能为空。`)
    return this
  }

  max(max, errMsg) {
    if (typeof this._value === 'number' && this._value > max) this._addErr(errMsg || `${this._name} 不能大于 ${max}`)
    if (typeof this._value === 'string' && this._value.length > max) this._addErr(errMsg || `${this._name} 长度不能大于 ${max}`)
    return this
  }

  min(min, errMsg) {
    if (typeof this._value === 'number' && this._value < min) this._addErr(errMsg || `${this._name} 不能小于 ${min}`)
    if (typeof this._value === 'string' && this._value.length < min) this._addErr(errMsg || `${this._name} 长度不能小于 ${min}`)
    return this
  }

  in (values, errMsg) {
    if (!validator.isIn(this._value, values)) {
      this._addErr(errMsg || `${this._name} 必须是 ${values.join('、')}之一`)
    }
    return this
  }

  contains(seed, errMsg) {
    if (!validator.contains(this._value, seed)) {
      this._addErr(errMsg || `${this._name} 必须包含 ${seed}`)
    }
    return this
  }

  equals(comparison, errMsg) {
    if (!validator.equals(this._value, comparison)) {
      this._addErr(errMsg || `${this._name} 必须为 ${comparison}`)
    }
    return this
  }

  before(date, errMsg) {
    if (!validator.isBefore(this._value, date)) {
      this._addErr(errMsg || `${this._name} 必须早于 ${date}`)
    }
    return this
  }

  after(date, errMsg) {
    if (!validator.isAfter(this._value, date)) {
      this._addErr(errMsg || `${this._name} 必须晚于 ${date}`)
    }
    return this
  }

  boolean(errMsg) {
    if (!validator.isBoolean(this._value)) {
      this._addErr(errMsg || `${this._name} 必须是布尔值`)
    }
    return this
  }

  date(errMsg) {
    if (!validator.isDate(this._value)) {
      this._addErr(errMsg || `${this._name} 必须是日期`)
    }
    return this
  }

  decimal(errMsg) {
    if (!validator.isDecimal(this._value)) {
      this._addErr(errMsg || `${this._name} 必须是小数`)
    }
    return this
  }

  float(errMsg) {
    if (!validator.isFloat(this._value)) {
      this._addErr(errMsg || `${this._name} 必须是浮点数`)
    }
    return this
  }

  int(errMsg) {
    if (!validator.isInt(this._value)) {
      this._addErr(errMsg || `${this._name} 必须是整数`)
    }
    return this
  }

  numerict(errMsg) {
    if (!validator.isNumeric(this._value)) {
      this._addErr(errMsg || `${this._name} 必须是数字`)
    }
    return this
  }

  url(errMsg) {
    if (!validator.isURL(this._value)) {
      this._addErr(errMsg || `${this._name} 必须是URL`)
    }
    return this
  }

  uuid(errMsg) {
    if (!validator.isUUID(this._value)) {
      this._addErr(errMsg || `${this._name} 必须是UUID`)
    }
    return this
  }

  email(errMsg) {
    if (!validator.isEmail(this._value)) {
      this._addErr(errMsg || `${this._name} 必须是邮箱`)
    }
    return this
  }

  ip(errMsg) {
    if (!validator.isIP(this._value)) {
      this._addErr(errMsg || `${this._name} 必须是IP地址`)
    }
    return this
  }

  mobile(errMsg) {
    if (!validator.isMobilePhone(this._value)) {
      this._addErr(errMsg || `${this._name} 必须是手机号`)
    }
    return this
  }

  matches(pattern, errMsg) {
    if (!validator.matches(this._value, pattern)) {
      this._addErr(errMsg || `${this._name} 无法匹配 ${pattern}`)
    }
    return this
  }

  mongoId(errMsg) {
    if (!validator.isMongoId(this._value)) {
      this._addErr(errMsg || `${this._name} 必须是Mongo Id`)
    }
    return this
  }
}

module.exports = Validator
module.exports.ValidatorError = ValidatorError
