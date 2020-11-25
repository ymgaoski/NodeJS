// 项目的一些基本配置信息
const jsonfile = require('jsonfile');
const path = require('path');

// 解析JSON数据并导出
module.exports = jsonfile.readFileSync(path.join(__dirname,'projectConfig.json'));