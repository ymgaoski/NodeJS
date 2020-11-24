/**
 * NodeJS的事件机制的原理：使用了观察者模式，实现 订阅发布功能
 * 常用方法：
 *    on、addListener     添加事件订阅者
 *    off、removeListener 移除事件指定订阅者
 *    removeAllListeners  移除指定事件所有订阅者
 *    emit                触发指定事件
 */
const http = require('http');

// 创建http服务
const server = http.createServer();

// 定义事件处理方法
const requestEvent = (request,response) => {
  console.log(request.url,'---请求地址');

  response.statusCode = 200;
}

// 添加事件监听
server.on('request',requestEvent);

// 一个事件可以被订阅多个
server.addListener('request',(request,response) => {
  console.log(request.url,'---请求地址2');

  response.statusCode = 200;
})

// on是 addListener 方法的别名 
server.addListener('close', ()=>{
  console.log('server is close.');
})

// 5秒后移除request事件监听
setTimeout(() => {
  
  console.log('request 事件已移除！');
  // off 为 removeListener 的别名
  server.off('request',requestEvent);
  // 移除request所有订阅事件
  server.removeAllListeners('request');
}, 5000);


// 开启服务
server.listen(8000, ()=>{
  console.log('server is startd.');
});