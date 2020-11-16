  const userRedisDao = require('../db/redis/userRedisDao');

  class UserService{
    // 保存UserId
    async setUserIdBySessionId(sessionId,userId){
      return userRedisDao.setUserIdBySessionId(sessionId,userId);
    }
  
    // 根据SessionId 获取UserId
    async getUserIdBySessionId(sessionId){
      return userRedisDao.getUserIdBySessionId(sessionId);
    }
  
    // 根据SessionId 重置UserId有效期
    async resetSessionExpTime(sessionId){
      return userRedisDao.resetSessionExpTime(sessionId);
    }
  
    // 根据SesionId 移除UserId
    async removeUserIdBySessionId(sessionId){
      return userRedisDao.removeUserIdBySessionId(sessionId);
    }
  }

  
module.exports = new UserService();