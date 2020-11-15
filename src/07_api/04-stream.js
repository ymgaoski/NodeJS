/**
 * Stream 用于处理大文件，不像Buffer是一次性全读取到内存中，Stream是一小点一小点的读取
 */
const fs = require('fs');

// 获取文件输入流
const fileStream = fs.createReadStream('./img/1.png');

// 创建输出流
const outStream = fs.createWriteStream('./img/1_copy.png');

// 将文件流 拼接到 输出流中，实现文件拷贝
fileStream.pipe(outStream);