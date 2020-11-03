// class定义，需要new 不然外面不好判断是 funciton 还是 object ，因为 class就是function对象的语法糖，使用class定义方法，外面Object.keys和 for in 都取不到
// module.exports = new class{
//   fun1(){
//     console.log('class fun1 run');
//   }
//   fun2(){
//     console.log('class fun2 run');
//   }
// }

// 字面量定义
module.exports = {
  fun1 : () => 'class fun1 run',
  fun2 : () => 'class fun2 run'
}