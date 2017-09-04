# easy-api

简单的 api，基于 koa2、mongodb、redis。

## 环境需求
1. nodejs >= 8.4.0
2. mongodb
3. redis

## 特性

- [x] 签名验证，将不合法请求拒之门外
- [x] JWT 授权验证，退出后 Token 自动回收
- [x] 统一全局异常处理
- [x] 自动请求 Id，方便请求追踪，支持前端传入调试
- [x] 简单可重用的请求参数校验器
- [x] 记录请求日志，方便追踪
- [x] 异常错误邮件通知（需配置）
- [x] 记录mongodb 查询语句，方便追踪
- [x] mongodb 分页扩展
- [x] 不同的环境不同的配置
- [x] 跨域配置
- [x] ETag 支持，减少网络传输
- [ ] 单元测试

#### 使用git clone指令下载最新的代码
```bash
git clone https://github.com/hsinlu/easy-api.git

npm i
```

#### 目录结构
<pre>
|--app
  |-- api                         api
    |-- v1                        api版本
      |-- auth.js                 用户授权接口
      |-- index.js                接口路由配置
      |-- open.js                 公开接口
      |-- ...
  |-- common                      公共代码
    |-- constants.js              常量定义
    |-- ...
  |-- lib                         项目公共库
    |-- db
      |-- connect.js                连接mongodb
      |-- paginate.js               扩展分页方法
      |-- traceMQuery.js            追踪mongodb的查询
    |-- logger.js                 log4日志
    |-- redis.js                  redis
    |-- validator.js              校验相关
    |-- ...
  |-- middleware                  执行中间件
    |-- auth.js                   用户授权校验
    |-- globalErrorHandler.js     全局错误处理
    |-- requestId.js              请求 ID
    |-- signature.js              签名校验
    |-- validator.js              参数校验
    |-- visitLogger.js            请求日志
    |-- ...
  |-- models                      实体模型
    |-- user.js                   用户实体模型
    |-- ...
  |-- validators                  请求校验
    |-- user.js                   用户请求参数校验
    |-- ...
  |-- index.js                    app启动
|-- db                          数据库相关
  |-- seeder                    数据库数据初始化脚本
    |-- index.js                数据库数据初始化执行文件入口
    |-- user.js                 具体数据表初始化脚本
    |-- ...
|-- storage                     文件存储，需要读写权限
  |-- cache                     缓存文件
    |-- ...
  |-- logs                      日志文件
    |-- ...
|-- nodemon.json                nodemon配置
|-- package.json                npm包配置文件
|-- process.json                pm2启动配置
</pre>

#### 更改环境配置
`app/config`包含各环境配置，其中`default.js`为默认配置，`db`为您的**mongodb**地址、`redis`为您的**redis**地址，在对应的环境配置中覆写指定的配置项即可。

#### 初始化数据
所有的初始化数据脚本存放在`db/seeder`中，请参考`db/user.js`，添加完后需要在`db/index.js`中注册
```bash
npm run seeder
```

#### 运行（开发）
```bash
# 已使用nodemon，代码更新后会自动重启服务
npm run dev
```

#### 运行（生产）
```bash
npm start
```
