// 动态路由，实现 路径 => 控制器（指定函数）的调用
class Router {
  constructor(){
    // 路由栈
    this.routerStack = [];
  }

  // 注册路由
  register(path,method,middleware){

    this.routerStack.push({
      path,method,middleware
    });
  }

  // GET请求的注册
  get(path,middleware){
    this.register(path,'GET',middleware);
  }
  
  // POST请求的注册
  post(path,middleware){
    this.register(path,'POST',middleware);
  }
  
  // PUT请求的注册
  put(path,middleware){
    this.register(path,'PUT',middleware);
  }
  
  // DELETE请求的注册
  delete(path,middleware){
    this.register(path,'DELETE',middleware);
  }

  // 路由中间件处理
  routes(){
    return async (ctx,next) => {
      let middleware;
      for (const index in this.routerStack) {
        let route = this.routerStack[index];
        console.log(route.path,'route path');
        if (route.path === ctx.request.url && ctx.request.method.toUpperCase() === route.method.toUpperCase()){
          // 匹配路由
          middleware = route.middleware;
          break;
        }
      }

      if (middleware && typeof middleware === 'function'){
        // 执行匹配后的中间件
        await middleware(ctx,next);
        return;
      }

      // 路由不匹配，执行下一个中间件
      await next();
    }
  }


}

module.exports = Router;