#!/usr/bin/env node
// 上面为 指定脚本解释器器为node

/*
  // 初始化npm
  npm init -y 

  // 安装相关包
  npm i commander download-git-repo ora handlebars figlet clear chalk open -s

  // 将npm 模块链接到对应的运⾏行行项⽬目中去
  npm link
  
  // 删除链接，需要去到全局的 node_global 中删除对应的命令

  */

// 定制命令⾏界⾯ 模块
const program = require('commander');
// 获取package.json中的 version，设置命令的版本号
program.version(require('../package').version);

// 添加命令
program
    .command('init <name>')       // 配置命令
    .description('init project')  // 命令描述，帮助中显示
    .action(                      // 命令执行后的处理
      require('../lib/init')
    )

// 解析进程传入的参数
program.parse(process.argv)