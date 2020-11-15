const http = require('http');

// http 模块可做服务端，也可以做客户端

let responseData = '';

const option = {
  'host': 'localhost',
  'port': '8000',
  'method': 'get',
  'path': '/user?id=123'
}

/**
 * get请求
 * 参数1：url, 也可以是 options 对象
 * 参数2：数据响应回调 
 */
const request = http.request(option);

// 数据更新回调。chunk 是个 Buffer
request.on('response', response => {
  
  response.on('data',function(chunk){
    console.log('chunk：',chunk);
    responseData += chunk;
  })

  response.on('end', () => {
    console.log('responseData:',responseData);
  })
  
})

// 发起请求
request.end();
