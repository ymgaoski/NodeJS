// 静态资源处理
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

// 将回调函数转 promise对象
const readFile = promisify(fs.readFile);
const exists = promisify(fs.exists);

module.exports = (staticPath = './public') => {
  return async (ctx,next) => {
    
    console.log(ctx.request.url,'url');
    const pathName = '/'+path.basename(staticPath);
    
    if (ctx.request.url.startsWith(pathName)){
      let filePath = path.join(__dirname,ctx.request.url);

      // 默认访问 index.html
      if (pathName === ctx.request.url){ 
        filePath = path.join(filePath,'index.html');
      }

      // console.log(filePath,'是静态资源');

      if (!await exists(filePath)){
        // 资源不存在
        ctx.body = '<h1>404 Not Found!</h1>'
        return;
      }

      try {
        // 读取文件数据
        ctx.body = await readFile(filePath);;
      } catch (error) {
        ctx.body = '<h1>Read File Error!</h1>'
      }

    }else{
      // console.log('不是静态资源，进入下一个中间件');
      next();
    }
    
  }
}

