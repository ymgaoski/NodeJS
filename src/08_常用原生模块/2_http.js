const http = require('http');

// 直接创建对象模式
const server = new http.Server();

// 开启监听
// 端口 8000
// localhost 为 hostname 参数，可传可不传
server.listen(8000, 'localhost');

// 使用监听事件方式，监听请求
server.on('request',function(request,response){
  let {url,method} = request;
  console.log(url,method);

  response.statsCode = 200;
  response.setHeader('Content-Type',"text/plan");
  response.end('hello world!');
})

// 开启监听后回调事件
server.on('listening', function() {
  console.log('Server is listening. port 8000.');
});

// 客户端连接成功事件
server.on('connection',function(sokect){
  console.log('client is connected.');
})

// http服务关闭事件
server.on('close',function(){
  console.log('server is close');
})