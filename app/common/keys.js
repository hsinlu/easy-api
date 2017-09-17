const prefix = require('../../package').name

module.exports.PREFIX = prefix
module.exports.jwtTokenKey = (token) => `${prefix}/jwtToken/${token}`
