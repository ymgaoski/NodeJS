
test('jest测试', () => {

  let sum = require('../index');
  expect(sum(1,2)).toBe(3);
});