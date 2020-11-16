/**
 * Node是单线程架构，无法利用多个核心的CPU，为了解决该问题,提供了 child_process 模块，通过多进程来实现对多核CPU的利用
 * 
 * 四种创建子线程的方式：
 *  1：spawn  最底层的实现，可以执行其它shell与node命令，无回调
 *  2: fork   只能执行node命令，无回调
 *  3: exec   创建新的shell去执行命令，可执行其它shell命令，参数和命令在一起，有回调
 *  4: execFile 在原胡shell上执行命令，效率比exec高一点，可执行其它shell命令，参数和命令分开，有回调
 *  
 *  注：子进程里面还能再开子进程
 */

// 需要手动引入子线程模块
const {spawn,fork,exec,execFile} = require('child_process');

// spawn   
// 最底层的实现，可以执行其它shell与node命令，无回调

// 先跳到指定目录，或者执行命令时指定，如下
process.chdir('./script');

// 执行 node命令，调用指定模块
const batProcess = spawn('node',['test.js'],{
  cwd: __dirname + './script'
});

// 执行bat 文件
// 再执行 /c 是必需传，代表 test.bat是传入cmd的参数
// const batProcess = spawn('cmd', ['/c','test.bat']);

// 直接执行 dos命令
// const batProcess = spawn('cmd.exe', ['/c', 'dir']);


// 标准输出监听
batProcess.stdout.on('data', data => {
  console.log(data.toString());
  console.log(`child process id: ${batProcess.pid}`);
})

// 标准错误输出监听
batProcess.stderr.on('data', data => {
  console.log(data.toString(),'error');
})
