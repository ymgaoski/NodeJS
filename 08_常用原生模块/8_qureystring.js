/**
 * 查询参数 处理模块
 */

const qs = require('querystring');

// 查询参数字符串 转 对象
const queryStr = 'name=xgao&age=123&isOk=false';
const queryObj = qs.parse(queryStr);
console.log('【字符串 转 对象】:',queryObj);

// 对象 转 字符串
const queryObj2 = {
  nick: 'gaogao',
  sex: '男',
  height: 170
}
const queryStr2 = qs.stringify(queryObj2);
console.log('【对象 转 字符串】',queryStr2);