console.clear();



const http = require('http');
const fs = require('fs');

// 创建http服务
const server = http.createServer(function(request,response){
  // 从request解构出想要的数据
  let {url,method} = request;
  console.log('url:',url);

  if (method === 'GET' && url === '/'){

    // 静态页面请求
    fs.readFile('./view/index.html',(err,data) => {
      response.setHeader('Content-Type','text/html;charset=UTF-8;');
      response.statusCode = 200;
      response.end(data.toString());
      return;
    })
    return;
  }else if(method === 'GET' && request.headers['accept'].indexOf('image/*') > -1){

    // 图片请求
    // 判断文件是否存在
    fs.exists('./'+url,function(isExists){
      if(isExists){
        // 根据图片路径创建一个文件流，并且拼接到 输出流中
        fs.createReadStream('./'+url).pipe(response);
      }else{
        // 404
        output404(response);
      }
    })
    return;
  }else if (method === 'GET' && url === '/user'){
    
    // Ajax请求
    fs.exists('./data/user.json',function(isExists){
      if(isExists){
        // 读取json文件
        fs.readFile('./data/user.json',(err,data) => {
          if (!err){
            response.statusCode = 200;
            response.setHeader('Content-Type','application/json');
            // 同上
            // response.writeHead(200,{'Content-Type': 'application/json'})
            response.end(data.toString());
          }else{
            // 服务器错误
            output500(response,err.toString());
          }
        })
      }else{
        // 404
        output404(response);
      }
    })
    return;
  }

  // 默认输出
  response.statusCode = 200;
  response.end();
})

// 添加端口监听
server.listen(8000,function(){
  console.log('server is startd. port: 8000.');

  // 5秒后关闭服务
  // setTimeout(() => {
  //   server.close();
  // }, 5000);
});

// 客户端连接上服务器后的回调
server.on("connection",function(socket){
  console.log('client is connected');
});

// 服务关闭的回调
server.on("close",function(socket){
  console.log('server is closed');
});


// 输出404
function output404(response){
  response.setHeader('Content-Type','text/plan;charset=UTF-8;');
  response.statusCode = 404;
  response.end('Found 404 资源无法找到.');
}

// 输出500
function output500(response,errorStr){
  response.statusCode = 500;
  response.setHeader('Content-Type','text/plan;charset=UTF-8;');
  response.end(errorStr);
}