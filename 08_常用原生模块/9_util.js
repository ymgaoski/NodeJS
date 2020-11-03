/**
 * 工具类 模块
 */
const util = require('util');

// --- 对象转字符串
const obj = {
  name: 'xgao',
  age: 29,
  isOver: false,
  sayHello: function(){
    console.log('hello');
  }
}

/**
 * 将对象转换成字符串
 *  colors 对属性进行颜色标识
 * 
 * 与 JSON.stringify 有区别
 *  1、inspect 可以输出不可遍历的属性
 *  2、inspect 可以输出函数
 *  3、inspect 属性有换格式
 */
const str = util.inspect(obj,{
  'colors': true
});
console.log('inspect:',str);

const str2 = JSON.stringify(obj);
console.log('stringify:',str2);


// --- 将回调函数转promise
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
process.nextTick(async () => {
  const data = await readFile('./9_util.js');
  console.log('读取文件内容长度：',data.length);
})


// --- 类型判断
console.log('isArray:',util.isArray([1,2]));
console.log('isNull:',util.isNull(null));
console.log('isNumber:',util.isNumber(12.3));
console.log('isString:',util.isString('abc'));
console.log('isDate:',util.isDate(new Date()));
console.log('isFunction:',util.isFunction(readFile));


// --- 输出日志 
// 15 Oct 12:48:22 - 这是一些日志
util.log('这是一些日志');

// --- 将async异步函数（或者promise函数）转换成 回调函数
// util.callbackify
async function test(){
  return 'this is test';
}

const callFun = util.callbackify(test);
// 注意，转换后的回调函数格式： (err,res)
callFun(function(err,res){
  console.log('callData:',res);
})

// --- 字符串格式化
/*
  %s - String
  %d - Number
  %i - parseInt(value, 10)
  %f - parseFloat(value)
  %j - JSON
  %o - Object，包括非可枚举属性和代理
  %O - Object，不包括非可枚举属性和代理
  %c - CSS
  %% - 单个百分号（'%'），不会消耗参数
 */

// xgao-12.9-22-%j-%
console.log(util.format('%s-%d-%i-%j-%%','xgao',12.9,22));
