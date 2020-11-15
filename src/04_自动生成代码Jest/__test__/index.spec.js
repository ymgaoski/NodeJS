test('测试代码生成', () => {

  // 引入文件
  let src = new (require('../index'))();
  // 调用方法
  let res = src.genTestCode(__dirname + '/../data/');
  
  // 断言
  expect(res)
    .toBe(true);
});