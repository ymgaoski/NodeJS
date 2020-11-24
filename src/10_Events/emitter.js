const EventEmitter = require('events')
/**
 * EventEmitter 
 *  事件处理类，所有类的基类，用于处理事件的订阅与发送
 * 
 */

// 创建事件类
const emitter = new EventEmitter();

// 定义事件
emitter.on('myEvent', (data) => {
  console.log('myEvent触发了 订阅1! data:' + data);
})

// 可重复订阅
emitter.on('myEvent', (data) => {
  console.log('myEvent触发了 订阅2! data:' + data);
})


// 指定订阅事件名查询订阅的 listeners
console.log(emitter.listeners('myEvent'),'myEvent listeners');

// 触发事件
emitter.emit('myEvent','你好');
