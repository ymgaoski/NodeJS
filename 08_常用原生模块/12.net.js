const net = require('net');

/** 
 * 创建服务
     options: 第一个参数默认可不填
        allowHalfOpen <boolean> 表明是否允许半开的 TCP 连接。默认值: false
        pauseOnConnect <boolean> 表明是否应在传入连接上暂停套接字。默认值: false
     connectionListener: 监听回调
*/
const server = net.createServer((socket) => {

  // console.log(socket,'socket');
  console.log('client is connected');

  // 获取客户端连接信息
  // ::ffff:127.0.0.1-IPv6-50282
  console.log(socket.remoteAddress + '-' + socket.remoteFamily + '-' + socket.remotePort);
  // 同上
  console.log(socket.address(),'address');

  // 获取当前客户端连接数
  server.getConnections((err,count) => {
    console.log('当前连接数：'+count);
  })
})

// 设置最大连接数，刚超出连接数服务器将不会有任何返回，好像也没法监听
server.maxConnections = 2;

// 开启服务监听
server.listen(7000,() => {
  console.log('server is listening.');
});

// 服务关闭事件
server.on('close', () => {
  console.log('server is close');
})

// 错误事件
server.on('error', (err) => {
  console.error(err,'net error');
})

// windows 使用 telnet 测试，mac 使用 nc
// telnet localhost 8124
// nc localhost 8124