// 做为客户端时的请求地址解析，json里面保存的是 最终服务器那边的接口地址
const jsonfile = require('jsonfile');
const path = require('path');

// 解析json数据并导出
// __dirname 表示当前运行脚本的物理路径
module.exports = jsonfile.readFileSync(path.join(__dirname,'userClientMapping.json'));