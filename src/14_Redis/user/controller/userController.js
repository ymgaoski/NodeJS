const userService = require('../service/userService');
const uuid = require('uuid');

class UserController{

  // 登录
  async login(username,password){

    const userId = username;
    const sesstionId = uuid.v1();

    console.log(username,'--',password);
    return await userService.setUserIdBySessionId(sesstionId,userId);
  }

  // 注销
  async logout(sesstionId){

    return await userService.removeUserIdBySessionId(sesstionId);
  }

  // 获取用户信息
  async getUserInfo(sessionId){

    const userId = await userService.getUserIdBySessionId(sessionId);
    console.log('userId:'+userId);
    if (userId){

      // 更新有效期
      await userService.resetSessionExpTime(sessionId);
      
      // 根据userId获取用户数据
      // ....

      return userId;
    }else{
      // 无权访问
      return null;
    }
  }


}


module.exports = new UserController();