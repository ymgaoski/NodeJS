// 导入http模块
const http = require('http');

// 创建http服务,收到客户端请求会进入回调函数
// request -> IncomingMessage 类
// response -> IncomingMessage 类
// 两者都是属于 Stream 流对象
const server = http.createServer(function(request,response){
  // es6 解构
  const {url,method} = request;
  console.log(url,method);

  // 状态码
  response.statusCode = 200;
  // 设置返回数据类型与编码
  response.setHeader('Content-Type',"text/plan;charset=utf-8;");
  // 输出
  response.end('hello world!');
})

// 开启监听
// 端口 8000
server.listen(8000);

// 开启监听成功事件
server.on('listening',function(){
  console.log('Server is listening. port 8000.');
})

// 客户端连接成功事件
server.on('connection',function(sokect){
  console.log('client is connected.');
})

// http服务关闭事件
server.on('close',function(){
  console.log('server is close');
})