/*
  异步串行处理方案：
    1、回调
    2、promise
    3、generator 生成器
    4、async await
*/

// 1、callback
const callbackFun = function(res,call){
  setTimeout(() => {
    if (call){
      call(res);
    }
  }, 1000);
}
// 执行callback
exports.callback = () => {
  
  // 回调地狱
  callbackFun('callback1',function(res){
    console.log(res,'steup 1');

    callbackFun('callback2',function(res){
      console.log(res,'steup 2');

      callbackFun('callback3',function(res){
        console.log(res,'steup 3');
      })
    })
  })
};


// 2、promise
const promiseFun = function(res){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(res);
    }, 1000);
  })
}
// 执行promise
exports.promise = () => {
  promiseFun('promise1')
  .then((res)=>{
    console.log(res,'steup 1');
    return promiseFun('promise2');
  })
  .then((res)=>{
    console.log(res,'steup 2');
    return promiseFun('promise3');
  })
  .then((res)=>{
    console.log(res,'steup 3');
    return promiseFun('promise4');
  })
}


// 3、generator
function* generatorFun(){
  console.log('one');
  yield 1;
  console.log('two');
  yield 2;
  console.log('three');
  yield 3;
  console.log('four');
  yield 4;
}
// 导出
exports.generator = generatorFun;


// 4、async/await
exports.asyncAwait = async function(){
  let res = await promiseFun('asyncAwait 1');
  console.log(res);

  res = await promiseFun('asyncAwait 2');
  console.log(res);

  res = await promiseFun('asyncAwait 3');
  console.log(res);

  res = await promiseFun('asyncAwait 4');
  console.log(res);
}


// 5、event 事件驱动
exports.eventFun = async function(){

  const asyncFun = function(name){
    return function(event){
      // 异步执行
      setTimeout(() => {
        console.log('name: '+name);
        // 完成后提交事件
        event.emit('end');
      }, 1000);
      return event;
    }
  }

  const ary = [
    asyncFun('event 1'),
    asyncFun('event 2'),
    asyncFun('event 3')
  ]

  // 引入 nodejs 的事件处理, 实现原理：发布订阅模式
  const {EventEmitter} = require('events');
  const event = new EventEmitter();

  let i=0;
  // 注册事件
  event.on('end',function(){
    // 事件回调
    if (i < ary.length){
      // 执行
      ary[i](event);
      i++;
    }
  })

  // 开始执行
  event.emit('end');
}