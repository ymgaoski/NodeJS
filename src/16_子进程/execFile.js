const {execFile} = require('child_process');

// execFile 在原胡shell上执行命令，效率比exec高一点，可执行其它shell命令，参数和命令分开，有回调
const execFileProcess = execFile('node',['test.js'],{cwd: __dirname + './script'},(error,stdout,stderr) => {
    if (error) {
        console.log(error);
        throw error;
    } else {
        // 输出
        console.log(stdout.toString());
    }
});