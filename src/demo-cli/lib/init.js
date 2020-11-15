// 将回调函数转 promise
const { promisify } = require('util');
// 文字转 符号图形 模块
const figlet = promisify(require('figlet'));
// 清空控制台 模块
const clear = require('clear');
// 设置控制台输出文字的样式 模块
const chalk = require('chalk');
// 下载git模块
const { clone } = require('./download');
// 可以打开浏览器的 模块
const open = require('open');

// 使用子线程，执行命令
const spawn = async (...args) => {
  const { spawn } = require('child_process')
  return new Promise(resolve => {
      const proc = spawn(...args);
      // 将输出流拼接到 进程的输出流中
      proc.stdout.pipe(process.stdout);
      // 将错误流拼接到 进程的错误流中
      proc.stderr.pipe(process.stderr);
      proc.on('close', () => {
          resolve()
      });
  })
}

// 打印日志
const log = function(content){
  console.log(chalk.green(content));
}

// 导出
module.exports = async (name) => {

  // 打印欢迎画面
  // 先清空终端
  clear();

  // 生成符号图形
  const welcomeStr = await figlet('Y Y   W e l c o m e');
  log(welcomeStr);

  // 创建项目
  log(`### 创建项目:` + name);

  // 克隆git代码
  await clone('github:ymgaoski/vue-template', name);

  log('### 安装依赖中...');
  // cwd：表示进入到哪个目录里面去执行命令
  // 注：在windows下命令会加上 .cmd 后缀
  let cnpm = process.platform === 'win32' ? 'cnpm.cmd' : 'cnpm';
  await spawn(cnpm, ['install'], { cwd: `./${name}` });

  log(`
### 安装完毕！
To get Start:
===========================
    cd ${name}
    npm run serve
===========================
`)

  // 执行启动命令
  await spawn(cnpm, ['run', 'serve'], { cwd: `./${name}` });
  
  // 打开浏览器
  open('http://localhost:8080');
}

