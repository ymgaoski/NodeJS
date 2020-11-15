/**
 * 缓存类型：
 *    1、强缓存策略
 *      expires (HTTP 1.0中使用)
 *        缺点：过期时间为固定的一个时间，还是让浏览器自己去判断的，由于客户端时间是不可控的，有可能导致缓存不能正常使用
 *      cache-control max-age （HTTP 1.1中使用）
 *        解决了上面的问题，使用max-age配置多少秒后过期，客户也是去和他第一次访问的时间比较       
 * 
 *    2、协商缓存
 *      第一种：last-modified & if-Modified-Since
 *        服务器生成资源的最后修改时间(last-modified)返回给前端，前端再次语法时在头部中加入 if-Modified-Since 参数，就是之前的那个修改时间，由服务端判断是否有修改
 *      
 *      第二种：etag & if-None-Match
 *        流程步骤和上面一样，只不过是使用hash值，计算文件的hash值返回给前端       
 * 
 *    3、AJAX缓存（同上面基本一样）
 *    4、ServiceWorker
 *    
 * 知识点：
 *  HTTP 1.1： 
 *    Keep-ALive (当客户端与服务器建立链接后，不会立刻断掉长连接，而是等待指定时间(Keep-Alive)内如果有新的请求就会复用该连接，没有新请求才会断长连接)
 *    缺点：实现不了全双工长连接，需要使用 前端定时轮询机制，或者 websokect方案
 *  HTTP 2:
 *    可以实现全双工通信，默认就支持长连接，不过现在大部分浏览器都是基于 HTTP 1.1 协议通信的
 */

// 更新时间
function updateTime(){

  // 简单的单例实现，只创建一个 定时器
  this.timer = this.timer || setInterval(() => {
    this.time = new Date().toLocaleTimeString();
  }, 5000);

  // 初始化
  this.time = this.time || new Date().toLocaleTimeString();

  return this.time;
}

// 创建HTTP服务
const http = require('http');

http.createServer((request,response) => {
  // 使用解构方法获取属性，同 req.url
  const {url} = request;
  
  // 简单路由处理
  if ('/' === url){
    
    response.statusCode = 200;
    response.end(`
      <html>
        HTML updateTime ${updateTime()}
        <br/>
        <script src="main.js"></script>
      </html>
    `);
    return;
  }else if('/main.js' === url){
    
    const content = `document.write('JS updateTime ${updateTime()}')`;

    // --- 强缓存
    // // 指定过期时间，HTTP 1.0协议 (5秒后过期)
    // response.setHeader('expires',new Date(Date.now() + 5 * 1000));
    // // 指定多少秒后过期，HTTP 1.1协议 (20秒后过期，优先级优于 expires)
    // response.setHeader('Cache-Control','max-age=20');
    

    // --- 协商缓存
    // 设置为 不缓存，重点，这样每次请求都会去校验
    response.setHeader('Cache-Control','no-cache');

    // 方案1：last-modified & if-modified-since方案
    // let lastModified = new Date(request.headers['if-modified-since']).getTime();
    // // 10秒后过期
    // if (lastModified + 10 * 1000 > new Date().getTime()){
    //   // 没过期
    //   console.log('协商缓存命中.');
    //   response.statusCode = 304;
    //   response.end();
    //   return;
    // }

    // // 设置资源的最后更新时间
    // response.setHeader('last-modified',new Date().toUTCString());

    // 方案2：etag & if-None-Match
    // 引入加密库
    const crypto = require('crypto');
    // 使用sha1算法对content加密，返回 十六进制的加密后字符串
    const hash = crypto.createHash('sha1').update(content).digest('hex');
    // 设置资源对应的hash值
    response.setHeader('Etag',hash);

    if (request.headers['if-none-match'] === hash){
      console.log('Etag 缓存命中.');
      response.statusCode = 304;
      response.end();
      return;
    }

    // 正常请求返回
    response.statusCode = 200;
    response.end(content);
    return;
  }

  // 其它路由直接返回空
  response.statusCode = 200;
  response.end();
}).listen(8000,() => {
  console.log('nodejs server startd 8000.');
})
