const dgram = require('dgram');

// 创建socket对象
const socket = dgram.createSocket('udp4');

// 定义消息
const msg = Buffer.from('hello.');

// 发送消息到服务器
socket.send(msg,9999,'127.0.0.1',(error, bytes) => {
  
  console.log('【客户端】发送消息到【服务器】成功.');
})

// 收到服务器的消息
socket.on('message', (msg,info) => {

  console.log(msg.toString(),'from server msg');
})