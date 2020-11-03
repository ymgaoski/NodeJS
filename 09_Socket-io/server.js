/**
 * socket.io 是一个nodejs 第三方插件，nodejs 没有原生的websokect模块
 * socket.io 是基于http之上的一套websocket框架，还能实现如果客户端支持websocket就使用，不支持就使用定时轮询方案.
 */
const http = require('http');
const fs = require('fs');

const io = require('socket.io');

// 创建http服务
const server = http.createServer((request,response) => {

  if (request.url === '/'){

    // 读取文件
    fs.readFile('./html/index.html',(err,data) => {

      response.statusCode = 200;
      response.setHeader('Context-Type','text/html;charset=utf-8;"');
      response.end(data.toString());
    })
  }else{
    response.statusCode = 404;
    response.end('<html><body>404 error</body></html>');
  }
})

// 开启监听
server.listen(8888, () => {
  console.log('server is statrd. 8888');
});


// 包装一下 http，升级成 websocket协议
const socketServer =  io.listen(server);

// 客户端连接成功
// 注意，里面的事件都需要定义在 connection 回调的 socket 对象中，而不是 soketServer 对象中，两者是不一样的
socketServer.on('connection', (socket) => {

  console.log('客户端连接成功.');
  // 发送消息给客户端
  socket.send('hello client');
  // 发送自定义事件给客户端
  socket.emit('serverEvent', '我是服务端,需要什么服务？');


  // 连接丢失
  socket.on('disconnect', () => {
    console.log('connection has lost');
  });

  // 接受到消息
  socket.on('message', data => {

    console.log(data.toString(),'---来自客户端消息');

    if (data.toString() === 'hello'){
      socket.send('我不认识你！');
    }
  })

  // 监听客户端自定义事件
  socket.on('clientEvent', data => {
    console.log(data,'---clientEvent');
  })

})
