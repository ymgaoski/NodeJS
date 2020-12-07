// 响应对象封装
module.exports = {
  get body(){
    return this._body;
  },
  set body(val){
    this._body = val;
  }
}