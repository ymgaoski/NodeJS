/**
 * promisify 是nodejs的一个库里面的方法，用来解决将nodejs里面的一些异步函数转换成 promise 方式，默认都是需要用回调
 */

// 从 util 中引入
const {promisify} = require('util');
const fs = require('fs');

// 使用promisify包装函数，返回 promise 的函数
const readFile = promisify(fs.readFile);

// 将一个操作放到下一次事件轮询中执行，只是为了使用 async 才这样写
process.nextTick(async function(){

  const data = await readFile(__dirname + '/data/user.json');
  console.log('data:',data.toString());
})