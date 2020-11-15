/**
 * 单个对象导出
 */
const person = {
  name: '小高',
  age: 20,
  play: function(){
    console.log(this.name + ' playing...');
    console.log('---------------');
  }
}

// 单个导出，不需要指定名字
module.exports = person;

// 后面的会覆盖前面的导出
//module.exports = {key:'new'};
