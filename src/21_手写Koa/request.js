module.exports = {
  get url(){
    return this.req.url;
  },
  get method(val){
    return this.req.method;
  }
}