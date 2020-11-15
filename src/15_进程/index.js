
// 默认process是全局对象，不需要引用，这里是为了语法提示
const process = require('process');

// ----------- 常用属性

// 当前node版本号，字符串
console.log('version：',process.version);

// 除显示node版本号，还有很多其它 node所依赖的库的版本号，JSON对象
console.log('versions：',process.versions);

// 当前操作系统平台，有：'aix'，'darwin'，'freebsd'，'linux''openbsd'，'sunos'，'win32'
console.log('platform：',process.platform);


// 当前node执行路径,是node进程的绝对路径，不是当前运行文件的路径
console.log('execPath：',process.execPath);


// 包含用于编译当前 Node.js 可执行文件的配置选项
console.log('config：',process.config);

// 进程ID
console.log('pid：',process.pid);

// 命令窗口的标题
console.log('title：',process.title);

// CPU 架构，可能的值有：'arm'、 'arm64'、 'ia32'、 'mips'、 'mipsel'、 'ppc'、 'ppc64'、 's390'、 's390x'、 'x32' 和 'x64'
console.log('arch：',process.arch);

// 环境变量
console.log('env：',process.env);

// 一般在启动node时会指定固定 NODE_ENV 的环境变量，以便后续代码的环境判断. 像下面这种在代码中修改无效
// process.env.NODE_ENV = 'dev'


// ----------- 常用方法

// 内存使用量
/*
{
  rss: 20434944,        // 驻留集大小, 是给这个进程分配了多少物理内存（占总分配内存的一部分），包含所有的 C++ 和 JavaScript 对象与代码
  heapTotal: 5693440,   // 总堆内存，V8内存
  heapUsed: 3130280,    // 已使用堆内存，V8内存
  external: 1124143,    // 堆外内存，V8 管理的，绑定到 Javascript 的 C++ 对象的内存使用情况
  arrayBuffers: 9386    // 指分配给 ArrayBuffer 和 SharedArrayBuffer 的内存，包括所有的 Node.js Buffer。 这也包含在 external 值中
}
*/
console.log('memoryUsage()：',process.memoryUsage());

// 当前运行文件的目录
console.log('cwd()：',process.cwd());

// 切换运行目录
process.chdir('../');

console.log('cwd()：',process.cwd());

let i=0;
let cid = setInterval(() => {
    i++;
    if (i >= 3){
        clearInterval(cid);
        // NodeJS运行了多长时间
        console.log('uptime()：',process.uptime());
    }
}, 1000);



// ----------- 常用事件

console.clear(); 

// node退出事件
// code ：0 正常退出，其它 异常退出
process.on('exit', (code)=>{
    console.log('exit：',code);
})

// node将要退出事件
process.on('beforeExit', code => {
    console.log('beforeExit：',code);
})

// 程序异常，当主线程都没有捕获异常时，最后才会进入该事件
// 注意：由于Node是单线的，所以一旦出错整个node就会挂掉，如果添加下面捕获事件程序出现异常就不会立刻退出了，异常点上面的代码还能运行，之后的就运行不了了
process.on('uncaughtException', err => {
    console.log('uncaughtException：',err);
})

// 随便输入没有定义的变量，会报异常
// abc

// 系统信号量变化
// SIGINT：Ctrl+C 中断运行触发，信号量有很多种，具体看文档
process.on('SIGINT', () => {
    console.log('接收到 SIGINT。 按 Control-D 退出。');
})
