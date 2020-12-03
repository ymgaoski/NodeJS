module.exports = {
  get url(){
    return this.request.url;
  },
  get body(){
    return this._body;
  },
  set body(val){
    this._body = val;
  },
  get method(){
    return this.request.method;
  }
}