const net = require('net');

// 创建服务
const server = net.createServer((socket) => {
  console.log('client is connected.');

  // 监听客户端传输过来的数据
  socket.on('data',res => {

    const result = res.toString();
    console.log('收到客户端消息：'+ result);

    // if (result == 'A'){
    //   socket.write('我很不好！','utf8');
    // }else{
    //   socket.write('我不知道你在说啥！','utf8');
    // }

    console.log('接收消息总大小：' + socket.bytesRead + '   发送消息总大小：' + socket.bytesWritten );
  })

  // 向客户端发消息
  socket.write('welcome net server. 开始吧！少年！\r\n','utf8');
})

// 开启监听
server.listen(8888,() => {
  console.log('server is listening.');
})

// error回调
server.on('error', err => {
  console.log('server error',err);
})

