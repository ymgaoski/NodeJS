const Router = require('@koa/router');
// 用户类控制器
const userControlloer = require('../controller/userController');
// 做为服务端使用时，前端请求的地址映射
const userServerConfig = require('../config/server/userServerMappingResolver');

// 路由映射
const userRouter = new Router();

// 将指定路由映射到指定的 controller中的某个方法
userRouter.get(userServerConfig.login,userControlloer.login);

module.exports = userRouter;