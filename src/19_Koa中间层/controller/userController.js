const httpClient = require('../common/httpClient');
// querysting 的别名
const qs = require('qs');
// 中间层请求服务器的接口映射
const userClientConfig = require('../config/client/userClientMappingResolver');

/*
    返回数据
    {
        result: {
            code: 0
            description: 'success'
        }, data {

        }
    }
 */

// 用户类
class UserController{

    // 登录方法
    async login(ctx){
        
        console.log(ctx.request,'request');

        // 此时的body已经是被 koa-bodyparser 中间件解析过后的了，已经变成 json对象了
        console.log(ctx.request.body,'body');

        const requestUrl = userClientConfig.login;
        
        // 再次调用服务器接口
        // const response = await httpClient.doGet(requestUrl,JSON.stringify(ctx.request.body));
        const response = await httpClient.doGet(requestUrl,'username=xgao&password=123');

        // 返回服务器返回的结果给客户端,使用 querysting 将字符串 转 对象
        ctx.response.body = qs.parse(response.data);
    }
}

module.exports = new UserController();