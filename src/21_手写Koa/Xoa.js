// Koa实现
const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class Xoa{

  constructor(){
    // 中间件存储
    this.middlewares = [];
  }

  /**
   * 开启服务并监听端口
   */
  listen(...arg){
    
    // 创建HTTP服务
    const server = http.createServer(async (req,res) => {

      // 创建上下文
      const ctx = this.createContext(req,res);

      // 组装中间件
      const fn = this.compose(this.middlewares);
      // 执行中间件
      await fn(ctx);

      // 输出
      res.statusCode = 200;
      res.setHeader('Content-Type','charset=utf-8;');
      res.end(ctx.body);
    });

    server.listen(...arg);
  }

  /**
   * 使用中间件
   * @param {回调处理} callback 
   */
  use(middleware){
    this.middlewares.push(middleware);
  }

  // 创建上下文
  createContext(req,res){

    // Object.create 创建对象并指定原型
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.request.res = res;
    
    return ctx;
  }

  // 中间件实现
  compose(middlewares){
    return function(ctx){
      return dispatch(0);

      // 分发函数，闭包使用
      function dispatch(i){
        let fn = middlewares[i];
        if (!fn){
          return Promise.resolve();
        }
        return Promise.resolve(fn(ctx,function next(){
          return dispatch(i + 1);
        }))
      }
    }
  }

  
}

module.exports = Xoa;