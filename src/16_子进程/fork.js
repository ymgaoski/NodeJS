const {fork} = require('child_process');

// fork   只能执行node命令，无回调, 
// silent: true

const forkProcess = fork('fork_test.js',{
  cwd: __dirname + './script'
});

// 主进程与子进程是通过 IPC（Inter-Process Communication，进程间通信） 进行通信

// 监听子进程传过来的消息
forkProcess.on('message', message => {
  console.log('from child:',message);

  // 杀掉进程
  forkProcess.kill();
})

// 当进程被 kill 会触发下面3个事件，顺序执行， disconnect -> exit -> close 

// 失去连接
forkProcess.on('disconnect', () => {
  console.log('disconnect');
})

// 退出
forkProcess.on('exit', () => {
  console.log('exit');
})

// 关闭
forkProcess.on('close', () => {
  console.log('close');
})


// 发消息给子线程
forkProcess.send('hello child');

