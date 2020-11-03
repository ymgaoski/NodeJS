// nodejs 默认使用的是自己的 commond js 模块化，而不是 es6 的模块化
const http = require('http');

// 创建HTTP服务
http.createServer(function(req,res){
  // req 请求信息
  // res 返回信息
  console.log(req.headers);

  // 定义HTTP头  
  res.writeHead(200,{
    'Content-Type': 'text/plan'
  })

  // 发送相应数据
  res.end('Hellow world!\n');
}).listen(8000);

console.log('server is running...');