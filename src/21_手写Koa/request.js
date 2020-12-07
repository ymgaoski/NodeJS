// 请求对象封装
module.exports = {
  get url(){
    return this.req.url;
  },
  get method(){
    return this.req.method;
  }
}