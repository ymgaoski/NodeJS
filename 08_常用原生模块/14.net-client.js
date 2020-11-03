const net = require('net');

// 创建客户端
const socketClient = new net.Socket();

// 发起请求
socketClient.connect(8888,'localhost', () => {
  console.log('connection server.');

  // 监听服务器发送过来的消息
  socketClient.on('data', res => {
    console.log('接收到服务器数据：' + res.toString());
  })

  // 发送消息给服务端
  socketClient.write('我找你是为了干掉你！');
})