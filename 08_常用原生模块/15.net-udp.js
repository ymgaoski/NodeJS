
/**
 * TCP与UDP区别：
 *    TCP：长连接，有状态，需要三次握手保证消息确实已经被接收到
 *    UDP：短连接，无状态，消息发送后是不知道是否对方真的已经接收到了
 */

const dgram = require('dgram');

const testMsg = Buffer.from('感谢你使用本服务.');

// 创建UDP服务,后面还可以跟一个message事件的回调
const socket = dgram.createSocket('udp4');

// 监听来自客户端的消息
socket.on('message', (msg,info) => {

  console.log(msg.toString(),'from client msg.');

  // 发送消息到客户端
  // udp报文将 ip 与 端口都是包装进了 消息头部(info)中
  socket.send(testMsg,info.port,info.address, (error,bytes) => {
    console.log('【服务器】发送消息到【客户端】成功.');
  })
});

// 开启监听
socket.bind(9999,'127.0.0.1',() => {

  console.log('udp server is startd 9999.');
})

// 失效监听
socket.on('error', (error) => {
  console.log(error);
})