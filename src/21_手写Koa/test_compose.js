/*
  函数组合
*/

function sum(x,y){
  return x + y;
}

function square(z){
  return z * z;
}

function addSelf(x){
  return x + 1;
}

// 手动调用两个函数
console.log(square(sum(1,2)),'手动调用');

// -------- 函数组合方法，固定函数个数

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
console.log(fn(1,2),'固定函数个数');


// -------- 函数组合方法，不限函数个数，同步

function dynamicCompose(...[frist,...other]){
  return function(...args){
    let result = frist(...args);
    other.forEach(fn => {
      result = fn(result);
    })
    return result;
  }
}

// 使用函数组合方法调用
const dynamicFn = dynamicCompose(sum,square,addSelf);
console.log(dynamicFn(1,2),'【同步】不限函数个数');


//-------- 函数组合方法，不限函数个数，异步，实现洋葱模型调用

const asyncDynamicCompose = function(middlewares){
  // return function只是为了将外层可以延迟调用，不然 return dispatch 就直接执行了
  return function(){
   return dispatch(0); 
  }

  // 分发函数
  function dispatch(i){
    const fn = middlewares[i];
    // 函数不存在就直接返回一个无参Promise对象
    if (!fn){
      return Promise.resolve();
    }

    // 会先执行 fn 函数
    return Promise.resolve(fn(function next(){
      return dispatch(i+1);
    }))
  }
}

async function fn1(next){
  console.log('fn1')
  await next()
  console.log('end fn1')
}

async function fn2(next){
  console.log('fn2')
  await delay()
  await next()
  console.log('end fn2')
}

function fn3(next){
  console.log('fn3')
}

// 模拟延迟加载
function delay(){
  return Promise.resolve(res => {
      setTimeout(() => reslove(),2000)
  })
}

// 调用
const finalFn = asyncDynamicCompose([fn1,fn2,fn3])
finalFn()
