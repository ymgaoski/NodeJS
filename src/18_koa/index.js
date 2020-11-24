const KOA = require('koa');

const app = new KOA();

/**
 * KOA 洋葱模型：
 *     服务处理层往外可以包N层中间层，当接收请求时，会先进入最外层，然后一层一层往里面传递，返回出去的时候就是相反的，从里到外
 * 
 * 下面当发起一个请求，输出如下：
    steup1 started
    steup2 started
    steup3 started

    server handle

    steup3 finished
    steup2 finished
    steup1 finished
 */

// 中间层1
app.use(async (ctx,next) => {
    console.log('steup1 started');
    // 调用 中间层2
    await next();
    console.log('steup1 finished');
})

// 中间层2
app.use(async (ctx,next) => {
    console.log('steup2 started');
    // 中间层3
    await next();
    console.log('steup2 finished');
})

// 中间层3
app.use(async (ctx,next) => {
    console.log('steup3 started');
    // 服务处理
    await next();
    console.log('steup3 finished');
})

// 最终服务处理
app.use(async (ctx) => {

    // ctx.body = 'hello';

    // 返回类型：.html、html、json、application/json、png
    ctx.response.type = "html";
    // ctx.body == ctx.response.body 其中response可写可不写
    ctx.response.body = '<h1>KOA Server.</h1>'

    console.log('server handle');
})

app.listen(8000, ()=>{
    console.log('linstening port is 8000.');
})