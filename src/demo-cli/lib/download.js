const {promisify} = require('util');

/**
 * repo: git 地址
 * desc: 参数
 */
module.exports.clone = async (repo,desc) => {
  // 下载git内容的模块
  const download = promisify(require('download-git-repo'));
  // 下载loading 模块
  const ora = require('ora');

  const process = ora(`下载中.....${repo}`);
  // 开启loading
  process.start();

  // 下载git内容
  await download(repo, desc);

  // 结束 loading
  process.succeed();
}