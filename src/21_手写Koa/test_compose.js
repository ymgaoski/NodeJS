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


// -------- 函数组合方法，不限函数个数，异步

async function asyncSum(x,y){
  return x + y;
}

async function asyncSquare(z){
  return z * z;
}

async function asyncAddSelf(x){
  return x + 1;
}

// function asyncDynamicCompose(...[frist,...other]){
//   return function(...args){
    
//     let result = frist(...args);
//     other.forEach(fn => {
//       result = fn(result);
//     })
//     return result;
//   }
// }

// let asyncDynamicFn = asyncDynamicCompose(asyncSum,asyncSquare,asyncAddSelf);

// console.log(asyncDynamicFn(1,2),'【异步】不限函数个数');


// let asyncSum = function(a,b){
//   return new Promise((resolve,fail) => {
//     resolve(a + b);
//   })
// }

// asyncSum(1,2).then((res) => {
//   console.log(res,'asyncSum');
// })



function asyncDynamicCompose(middlewares){
  return function(){
      return dispatch(0)
  }
}

function dispatch(i){
    let fn = middlewares[i]
    if(!fn){
        return Promise.resolve()
    }
    return Promise.resolve(
        fn(function next(){
            return dispatch(i + 1)
        })
    )
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

function delay(){
  return Promise.resolve(res => {
      setTimeout(() => reslove(),2000)
  })
}

const middlewares = [fn1,fn2,fn3]
const finalFn = asyncDynamicCompose(middlewares)
finalFn()