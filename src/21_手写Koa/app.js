/**
 * Koa 原理解析
 *  context：使用了 get, set 属性实现了属性映射的问题
 *  中间件：洋葱模型可以使用责任链模式实现
 */

const Xoa = require('./xoa');
const static = require('./static');
const Router = require('./router');

const xoa = new Xoa();
const router = new Router();

// // 中间件1
// xoa.use(async (ctx,next) => {
//   console.log('准备处理【中间件1】...');
//   await next();
//   console.log('【中间件1】处理完成！');
// })

// // 中间件2
// xoa.use(async (ctx,next) => {
//   console.log('准备处理【中间件2】...');
//   await next();
//   console.log('【中间件2】处理完成！');
// })

// // 中间件3
// xoa.use(async (ctx,next) => {
//   console.log('准备处理【中间件3】...');
//   await next();
//   console.log('【中间件3】处理完成！');
// })

// 静态资源中间件处理
xoa.use(static(__dirname+'/public'));

// 添加动态路由
router.get('/index', async (ctx,next) => ctx.body = 'get index page');
router.get('/user', async (ctx,next) => ctx.body = 'get user path');
router.post('/user', async (ctx,next) => ctx.body = 'post user action');
router.put('/user', async (ctx,next) => ctx.body = 'put user action');
router.delete('/user', async (ctx,next) => ctx.body = 'delete user action');
// 注册中间件
xoa.use(router.routes());


// 处理网页数据
xoa.use((ctx,next) => {
  ctx.body = 'hello xoa!';
  console.log('网页数据处理完成！');
})

// 开启监听
xoa.listen(8000,()=>{
  console.log('Xoa Runing is Port 8000.... ');
})
