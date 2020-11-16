console.log('this is fork_test.js 遍历个循环给你看:');

[1, 2, 3, 4, 5].forEach(i => {
  console.log(i);
});

// 监听来自主线程的消息
process.on('message',message => {
  console.log('from main:',message);

  // 发消息给主线程
  process.send('做你的小弟，我很不好，谢谢！');
})