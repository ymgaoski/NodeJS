const Redis = require('ioredis');
// key前缀
const redisKeyPrefix = 'myRedis:user:';

class UserRedisDao{

  // 获取redis对象
  getRedisConnection(){
    return new Redis({
      host: '10.7.3.225',
      port: 6379
    });
  }

  // 保存UserId
  async setUserIdBySessionId(sessionId, userId){

    const redis = this.getRedisConnection();

    // 设置数据并设置有效期
    redis.set(redisKeyPrefix + sessionId,userId,'ex',1800, (error,result) => {
      if (error){
        console.log(error,'redis set error');
        throw error;
      }
      // 退出连接
      redis.quit();
    });

    return sessionId;
  }

  // 根据SessionId 获取UserId
  async getUserIdBySessionId(sessionId){

    const redis = this.getRedisConnection();
    console.log(redisKeyPrefix + sessionId);
    return redis.get(redisKeyPrefix + sessionId, (error, userId) => {
      if (error){
        console.log(error,'redis get error');
        throw error;
      }
      // 退出连接
      redis.quit();
      return userId;
    })
  }

  // 根据SessionId 重置UserId有效期
  async resetSessionExpTime(sessionId){
    
    const redis = this.getRedisConnection();
    // ttl key 查看redis中key的有效时间
    return redis.expire(redisKeyPrefix + sessionId, 1800,(error, result) => {
      if (error){
        console.log(error,'redis reset error');
        throw error;
      }
      // 退出连接
      redis.quit();
      return result;
    })
  }

  // 根据SesionId 移除UserId
  async removeUserIdBySessionId(sessionId){

    const redis = this.getRedisConnection();

    return redis.del(redisKeyPrefix + sessionId,(error, result) => {
      if (error){
        console.log(error,'redis del error');
        throw error;
      }
      
      // 退出连接
      redis.quit();
    })
  }
}

module.exports = new UserRedisDao();