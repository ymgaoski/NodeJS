const {exec} = require('child_process');

// exec   创建新的shell去执行命令，可执行其它shell命令，参数和命令在一起，有回调
const execProcess = exec('node test.js',{cwd: __dirname + './script'},(error,stdout,stderr) => {
    if (error) {
        console.log(error);
        throw error;
    } else {
        // 输出
        console.log(stdout.toString());
    }
});