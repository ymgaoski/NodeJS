// 做为服务端时，给前端请求的接口地址解析
const jsonfile = require('jsonfile');
const path = require('path');

// 解析JSON数据并导出
module.exports = jsonfile.readFileSync(path.join(__dirname,'userServerMapping.json'));