// 引入多输出模块，并结构对象
const {user,test} = require('./module1');
console.log('user:',user);
user.say();
test();

// 引入多输出模块到一个对象,功能同上
const obj = require('./module1');
console.log('user:',obj.user);
obj.user.say();
obj.test();


// 引入单输出模块
const person = require('./module2');
console.log('person:',person);
// person.play();

// 第三方库引用
// 不需要指定路径，它是去 node_module 目录中查找，查找顺序如下：
// 当前目录的 node_module -> 父级目录的node_module -> ... -> 全局目录 node_module
// const uuid = require('uuid');