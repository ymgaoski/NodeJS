/**
 * 路径处理模块
 */

const path = require('path');

// --- 路径连接
// __dirname 当前工作目录
const pathStr =  path.join(__dirname,'myDir','20200101','test.js');
// E:\同步盘\我的坚果云\nodejs\08_常用原生模块\myDir\20200101\test.js
console.log('路径连接:',pathStr);


// --- 获取路径中的文件扩展名，包括 . 符号
const extName = path.extname(pathStr);
// .js
console.log('获取扩展名：',extName);


// --- 字符串转路径对象
const pathObj = path.parse(pathStr);
/*
{
  root: 'E:\\',
  dir: 'E:\\同步盘\\我的坚果云\\nodejs\\08_常用原生模块\\myDir\\20200101',
  base: 'test.js',
  ext: '.js',
  name: 'test'
}*/
console.log('字符串转对象：',pathObj);

