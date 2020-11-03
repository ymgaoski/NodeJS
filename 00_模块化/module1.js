/**
 * 多对象导出
 */

// 导出user类
module.exports.user = {
  name:'xgao',
  say: function(){
    console.log('你好' + this.name);
    console.log('---------------');
  }
}

// 导出 test 方法
// module 可以省略
exports.test = function(){
  console.log('this is test');
  console.log('---------------');
}