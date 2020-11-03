/**
 * DNS 域名解析 模块
 */

const dns = require('dns');
 
// --- 域名 转 IP地址
const domain = 'www.baidu.com';
dns.resolve(domain,function(err,address){
  if (err){
    console.error(err);
    return;
  }
  // 返回的是数组，一个域名可以对应多个IP
  // ['14.215.177.38', '14.215.177.39']
  console.log('【域名转IP】:',address);
})

// --- IP地址 转 域名 
dns.reverse('114.114.114.114',function(err,domain){
  if (err){
    console.error(err);
    return;
  }

  // ['public1.114dns.com']
  console.log('【IP转域名】:',domain);
})