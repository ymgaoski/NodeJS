// 导入http模块
const http = require('http');

// 创建http服务,收到客户端请求会进入回调函数
const server = http.createServer(function(request,response){
  
  let data = '';

  // 请求数据组装，Body有数据才会进入该事件，一般POST才会有Body数据，GET请求不会进入
  request.on('data', chunk => {
    console.log('chunk:',chunk);
    data += chunk;
  })

  // 本次请求全部传输完毕
  request.on('end', () => {
    console.log('end:',data);

    let url = request.url;
    let method = request.method;
    let header = JSON.stringify(request.headers);
    let httpVersion = request.httpVersion;

    response.statusCode = 200;
    response.setHeader('Content-Type',"text/plan;charset=utf-8;");
    response.end(`
      本次请求：
      url: ${url}
      method: ${method}
      header: ${header}
      httpVersion: ${httpVersion}
    `);
  })

})

// 开启监听
// 端口 8000
server.listen(8000);

// 开启监听成功事件
server.on('listening',function(){
  console.log('Server is listening. port 8000.');
})
