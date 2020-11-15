/**
 * url 处理模块
 */

const url = require('url');

// url 转 url对象
const urlStr = 'http://www.baidu.com:8080/user/get?id=123';
const urlObj = url.parse(urlStr);

// {
//   protocol: 'http:',
//   slashes: true, // 是否是 / 符号，斜杠， false 代表反斜杠
//   auth: null,
//   host: 'www.baidu.com:8080',
//   port: '8080',
//   hostname: 'www.baidu.com',
//   hash: null,
//   search: '?id=123',
//   query: 'id=123',
//   pathname: '/user/get',
//   path: '/user/get?id=123',
//   href: 'http://www.baidu.com:8080/user/get?id=123'
// }
console.log('【字符串 转 对象】:',urlObj);


// url对象 转 url字符串
const urlObj2 = {
  'host': 'www.test.com',
  'port': 8080,
  'protocol': 'http',
  'search': '?order=12345',
  'query': 'order=12345',
  'path': '/'
};

const urlStr2 = url.format(urlObj2);
console.log('【对象 转 字符串】:',urlStr2);


// url地址组装
const urlAddress = url.resolve('http://www.test.com','order');
console.log('【url地址组装】:',urlAddress);