
//--- 1、回调测试
// jest 使用了 done 参数后，当没有执行done的时候程序会一直等待下去
// test('callback test', (done) => {
  
//   const {callback} = require('../index');
//   // 调用回调方法
//   callback();

//   // 延迟4秒结束
//   setTimeout(done,4000);
// });

// //--- 2、promise 测试
// test('promise test', (done) => {
  
//   const {promise} = require('../index');
//   // 调用回调方法
//   promise();

//   // 延迟4秒结束
//   setTimeout(done,4000);
// });

//--- 3、 generator 测试
// test('generator test', () => {
//   const {generator} = require('../index');

//   // 执行generator
//   const genFun = generator();

//   // 单次执行
//   // { value: 1, done: false }
//   console.log(genFun.next());

//   // { value: 2, done: false }
//   console.log(genFun.next());

//   // // { value: 3, done: false }
//   console.log(genFun.next());

//   // // { value: 4, done: false }
//   console.log(genFun.next());

//   // { value: undefined, done: true }
//   console.log(genFun.next());

//   console.log('------- 遍历执行 --------');

//   //　遍历执行
//   for (const value of generator()) {
//     console.log(value);
//   }

//   console.log('generator 执行完毕！');
// });

//--- 4、async await 测试
// test('asyncAwait test', (done) => {

//   const {asyncAwait} = require('../index');
  
//   asyncAwait();

//   setTimeout(done, 5000);
// });

//--- 5、event事件驱动 测试
test('event test', (done) => {
  
  const {eventFun} = require('../index');
  eventFun();

  setTimeout(done, 4000);
});
