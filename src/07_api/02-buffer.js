/**
 * Buffer: 缓冲器
 * buffer默认创建的空间大小为 8KB，如果内容超出8K会申请新的内存空间，是在 V8引擎 堆外申请的，效率更高
 */
console.clear();

// 创建一个Buffer，分配指定长度的空间，不初始化数据
const bf = Buffer.alloc(10);
console.log('bf:',bf); // bf: <Buffer 00 00 00 00 00 00 00 00 00 00>

// 第二个参数: fill 用于填充数据，分配5个长度空间，并且内容全部填充为 a
const bf1 = Buffer.alloc(5,'a');
console.log('bf1:',bf1); // bf1: <Buffer 61 61 61 61 61>

// 将字符串 a 直接转换成buffer,也支持中文,默认是 UTF-8 的编码
// from里面的数据类型：String,Buffer,Array,Object
const bf2 = Buffer.from('b');
console.log('bf2:',bf2);  // bf2: <Buffer 62>

// buffer 转字符串,默认也是按utf8编码的
console.log(Buffer.from('abc你好').toString('utf8'));

// 3, 一个英文（ASCIIC码）占用一个字节
console.log('abc length：',Buffer.from('abc').length);
// 9, 一个中文占3个字节
console.log('abc你好 length:',Buffer.from('abc你好').length);
// 9, 同上
console.log('byteLength:',Buffer.byteLength('abc你好'));
// 5, 字符串长度是按个数来计算
console.log('abc你好 string length:',Buffer.from('abc你好').toString().length);

// 拼接两个Buffer
const bf3 = Buffer.concat([bf1,bf2]);
console.log('bf3:',bf3);  // bf3: <Buffer 61 61 61 61 61 62>

// 创建和bf2一样类型的Buffer
const bf4 = Buffer.from('b');

console.log('bf4:',bf4);  // bf4: <Buffer 62>

// 比较两个Buffer是否相等，-1：不相等 0: 相等
const isCom = Buffer.compare(bf2,bf4);
console.log('isCom:',isCom);


// JSON 转换
const jsonBuffer = Buffer.from('abc');
// buffer转json字符串
const jsonStr = JSON.stringify(jsonBuffer);
// {"type":"Buffer","data":[97,98,99]}
console.log('jsonStr:',jsonStr);

// json字符串转json对象
const jsonObj = JSON.parse(jsonStr);
console.log('jsonObj:',jsonObj);

// json对象转buffer对象
const jsonBuffer2 = Buffer.from(jsonObj);
console.log('jsonBuffer2:',jsonBuffer2);


// 编码判断，通过代码返回的结果可以看出，gb2312, gbk 都不是识别，所以在nodejs中只能使用utf8来处理中文

// true
console.log('utf8 is encoding：',Buffer.isEncoding('utf8')); 
// true
console.log('utf-8 is encoding：',Buffer.isEncoding('utf-8'));
// true
console.log('UTF8 is encoding：',Buffer.isEncoding('UTF8'));
// true
console.log('UTF-8 is encoding：',Buffer.isEncoding('UTF-8'));
// false
console.log('utf9 is encoding：',Buffer.isEncoding('utf9'));
// false
console.log('gb2312 is encoding：',Buffer.isEncoding('gb2312'));
// false
console.log('gbk is encoding：',Buffer.isEncoding('gbk'));


// Buffer类型判断
const obj1 = {};
const obj2 = Buffer.from('abc');
const obj3 = 'abc';
const obj4 = 123;
const obj5 = true;
const obj6 = undefined;
const obj7 = null;

// object
console.log('{}对象判断:',typeof obj1);
// object
console.log('buffer判断:',typeof obj2);
// string
console.log('字符串判断',typeof obj3);
// number
console.log('数值判断',typeof obj4);
// boolean
console.log('bool判断',typeof obj5);

// 可以发现 buffer和普通对象 使用 typeof 是判断不出来的，都是 object

// 判断对象是否是 buffer
// false
console.log(Buffer.isBuffer(obj1));
// true
console.log(Buffer.isBuffer(obj2));