const Koa = require('koa');
const path = require('path');

// 合并多个路由
const combineRouters = require('koa-combine-routers');
// 解析原生koa中的request.body的值
const bodyParser = require('koa-bodyparser');
// 请求压缩
const compress = require('koa-compress');
// 静态资源处理
const koaStatic = require('koa-static');

// 引入相应路由
const userRouter = require('../router/userRouter');


// 创建koa服务
const app = new Koa();

// 日志查看
// app.use(async (ctx,next) => {

//     console.log('request',ctx.request);
//     await next();
// })

// 1、开启请求压缩
app.use(compress({
    threshold: 2048 // 阀值，当数据超过 2kb 就压缩
}));

// 2、解析body
app.use(bodyParser());

// 3、静态资源处理，指定哪个目录为静态资源目录
app.use(koaStatic(path.join(__dirname,'../dist')));

// 4、合并路由
// 生成统一路由
const unifiedRouters = combineRouters(userRouter)();
app.use(unifiedRouters);


module.exports = app;