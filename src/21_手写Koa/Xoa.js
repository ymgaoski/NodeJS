const http = require('http');
const context = require('./context');

class Xoa{

  /**
   * 开启服务并监听端口
   * @param {端口} port 
   * @param {开启成功的回调} callback 
   */
  listen(...arg){
    
    // 创建HTTP服务
    const server = http.createServer((req,res) => {

      // 创建上下文
      const ctx = this.createContext(req,res);

      if (this.callback){
        this.callback(ctx);
      }

      // 输出
      res.statusCode = 200;
      res.setHeader('Content-Type','text/plan;charset=utf-8;');
      res.end(ctx.body);
    });

    server.listen(...arg);
  }

  /**
   * 使用中间件
   * @param {回调处理} callback 
   */
  use(callback){
    this.callback = callback;
  }

  // 创建上下文
  createContext(req,res){

    // Object.create 创建对象并指定原型
    const ctx = Object.create(context);
    ctx.request = Object.create(req);
    ctx.response = Object.create(res);
    
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.request.res = res;
    return ctx;
  }
}

module.exports = Xoa;