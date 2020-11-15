const http = require('http');

// http 模块可做服务端，也可以做客户端

let responseData = '';

/**
 * http请求
 * 参数1：请求参数
 * 参数2：数据响应回调 
 */
const request = http.request({
  'host': 'localhost',
  'port': '8000',
  'method': 'get',
  'path': '/user?id=123'
},function(response){

  // console.log(response);

  // 数据更新回调。chunk 是个 Buffer
  response.on('data', chunk => {
    console.log('chunk：',chunk);
    responseData += chunk;
  })

  response.on('end', () => {
    console.log('responseData:',responseData);
  })
})

// 发起请求
request.end();
