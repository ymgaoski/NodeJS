const fs = require('fs');

console.clear();

// --- 同步获取
let userData = fs.readFileSync('./data/user.json');

// 默认 readFile 返回的是十六进制的 Buffer，而不是字符串
console.log('userData:',userData);

// Buffer转字符串
console.log('userDataSting:',userData.toString());


// --- 异步获取
// 使用的是回调方式返回数据，NodeJS中使用了大量的 异步回调来实现，单线程 + 异步回调 实现高性能
fs.readFile('./data/user.json',(err,data) => {
  if (!err){
    console.log('async data:',data.toString());
  }
})