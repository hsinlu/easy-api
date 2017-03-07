/**
 * 设置
 */

module.exports = {
  /** debug 模式 */
  debug: process.env.NODE_ENV !== 'production',

  /** 是否追踪访问日志 */
  traceVisitLogs: true,

  /** 各种存放文件夹路径 */
  paths: {
    /** 日志 */
    logs: 'storage/logs',
    cache: 'storage/cache'
  },

  /** MongoDB 连接字符串 */
  db: 'mongodb://localhost:27017/easy-api',

  /** redis */
  redis: {
    url: 'redis://localhost:6379'
  },

  /** json web token */
  jwt: {
    /** 加密密钥 */
    secret: '0b3882c9-eede-45aa-afa7-bfca422f4afc',
    /** 过期时间 */
    expressIn: 24 * 60 * 1000
  },

  /** 客户端相关 */
  client: {
    /** 客户端 key */
    appkey: '7dac0dda-b089-46ed-80b2-160a6c9a7aad',
    /** 客户端 token */
    token: '21d700e0-4c58-488d-933d-3a2a61b1a192'
  },

  // 跨域资源共享配置
  cors: {
    // 允许的域名
    allowOrigins: [
      'http://localhost:3000',
    ]
  },

  // 异常收件人列表，多个收件人使用英文逗号分隔，请修改
  recipients: 'xxxx@qq.com',

  // SMTP服务器信息，请修改为您的
  SMTP: {
    host: 'smtp.163.com',
    port: 465,
    auth: {
      user: 'user@163.com',
      pass: 'password'
    }
  }
};
