const http = require('http');
const url = require('url');
const querystring = require('querystring');
const userController = require('./user/controller/userController');

// 创建http服务
const server = http.createServer((request,response) => {

  // console.log(request.url,request.method);

  const urlObj = url.parse(request.url);
  const queryObj = querystring.parse(urlObj.query);
  // console.log(queryObj,'queryObj');

  if (request.method === 'GET' && urlObj.pathname != '/favicon.ico'){
    
    response.setHeader('Content-Type','text/html;charset=utf-8;')
    response.statusCode = 200;

    if (urlObj.pathname === '/login'){

      // 登录
      userController.login(queryObj.username,queryObj.password).then((res)=>{

        console.log(`登录成功！sessionId:${res}`);

        const html = `<html>
                        <body>
                          <h3>登录成功！SessionId:${res}</h3>
                          <a href="/user?sessionId=${res}" target="__block">获取用户信息</a>
                          <br/><br/>
                          <a href="/logout?sessionId=${res}" target="__block">退出登录</a>
                        </body>
                      </html>`;
        response.end(html);
      })
    }else if(urlObj.pathname === '/user'){

      // 获取用户信息
      const sessionId = queryObj.sessionId;
      userController.getUserInfo(sessionId).then(res => {

        console.log(`获取用户信息成功！UserID: ${res}`);
        response.end(`用户ID：${res}`);
      })
    }else if(urlObj.pathname === '/logout'){
      
      // 退出登录
      const sessionId = queryObj.sessionId;
      userController.logout(sessionId).then(res => {

        console.log('退出成功！');
        response.end(`退出成功！`);
      })
    }
  }else{
    response.statusCode = 200;
    response.end();
  }

});

// 开启监听
server.listen(8000,() => {

  console.log('server is listend port 8000.');
});