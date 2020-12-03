/**
 * Koa 原理解析
 *  context：使用了 get, set 属性实现了属性映射的问题
 *  中间件：洋葱模型可以使用责任链模式实现
 */

// const Xoa = require('./Xoa');

// const xoa = new Xoa();

// xoa.use(ctx => {
//   ctx.body = 'hello xoa 加油！';
// })

// xoa.listen(8000,()=>{
//   console.log('Xoa Runing is Port 8000.... ');
// })

function sum(x,y){
  return x + y;
}

function square(z){
  return z * z;
}

// 手动调用两个函数
console.log(square(sum(1,2)));

// -------- 使用函数组合方法

// 箭头函数写法
// const compose = (fn1,fn2) => (...args) => fn2(fn1(...args));

// 常规写法
function compose(fn1,fn2){
  return function(...args){
    return fn2(fn1(...args));
  }
}

// 使用函数组合方法调用
const fn = compose(sum,square);
console.log(fn(1,2));