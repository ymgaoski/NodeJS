/*
    - cluster 集群 （Master - Worker 模式）
    能实现多核CPU同时处理，可用于构建负载均衡的集群，cluster 就是对 child_process 的包装
    
    - 调度策略
    cluster.schedulingPolicy
      SCHED_RR: 轮询机制，默认使用
      SCHED_NONE：由系统决定
    
    这是一个全局设置,通过修改 NODE_CLUSTER_SCHED_POLICY 环境变量改变设置，有效值包括 'rr' 和 'none'

    另：
      除了子进程和集群可以处理并发，别外还有一个 worker_threads 工作线程
      工作线程对于执行 CPU 密集型的 JavaScript 操作非常有用。 它们在 I/O 密集型的工作中用途不大。 Node.js 的内置的异步 I/O 操作比工作线程效率更高。
      与 child_process 或 cluster 不同， worker_threads 可以共享内存。 它们通过传输 ArrayBuffer 实例或共享 SharedArrayBuffer 实例来实现。
*/
const cluster = require('cluster');
const os = require('os');
const http = require('http');

if(cluster.isMaster){
  // 主线程
  console.log(`【主线程】,线程PID：${process.pid}`);

  // 根据CPU的线程数 创建指定子进程数
  for(let i=0;i < os.cpus().length; i++){
    // fork 不需要指定执行哪个文件，fork后会自动重新使用子线程去运行当前 js文件，通过cluster的 isWorker 与 isMaster 来判断当前是主线程还是子线程
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log('exit:',worker.process.pid);
  })
}

if(cluster.isWorker){
  // 子线程
  console.log(`子线程,线程PID：${cluster.worker.process.pid}`);

  // 创建HTTP服务
  const server = http.createServer((request,response) => {

    // 请求数据组装，Body有数据才会进入该事件，一般POST才会有Body数据，GET请求一般不会进入
    let data='';
    request.on('data', chunk => {
      data += chunk;
      console.log(chunk,'chunk');
    })

    // 完成请求
    request.on('end', ()=>{
      response.statusCode = 200;
      response.setHeader('Content-Type','text/plain;charset=utf-8;');
      // 每次请求处理的进程是不一样的，有专门一套规则处理.如果短时间内连续访问多次一般是有同一子进程处理
      response.end(`请求成功! pid:${process.pid}`);
    })
  })

  server.listen(8000, () => {
    // 会执行 12次，不要被表现给误解
    console.log('linstening to prot 8000.');
  })
}


 /*
  注意：
    假如有12个线程，那不是要创建12个http服务？端口8000会被12个服务监听？
    这只是个假象，真实情况是这样的：
      8000端口其实只由主线程去监听，当外部请求的时候由主线程去分配到具体某个子线程处理，这就是Node的 Master - Worker 模式
      以前处理都是由主线程处理，现在主线程变成了一个中间代理层，实现转发功能
  */