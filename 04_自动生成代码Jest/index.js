const path = require('path');
const fs = require('fs');

class TestNow {

    /**
     * 获取jest文件名
     * @param {文件路径,包含后缀} filePath 
     */
    getJestFileName(filePath){

      // C:/ABC/Data/class.js
      // C:/ABC/Data/__test__/class.spec.js

      let dirName = path.dirname(filePath);
      let fileName = path.basename(filePath);
      let extName = path.extname(filePath);

      let testName = fileName.replace(extName,`.spec${extName}`);
      return path.format({
        root: dirName + '/__test__/',
        base: testName
      });
    }

    /**
     * 生成测试代码
     * @param {要生成类代码的源目录}} sourcePath 
     */
    genTestCode(sourcePath = path.resolve('./')){
        
        // 删除之前生成的代码
        fs.rmdirSync(`${sourcePath}/__test__/`,{
            recursive:true
        })

        // 创建__test__
        fs.mkdirSync(`${sourcePath}/__test__/`);

        // 获取需要生成的文件
        let files = fs.readdirSync(sourcePath).filter(item => {
          // 过滤目录，只查文件
          return fs.statSync(`${sourcePath}/${item}`).isFile();
        }).map(v => {
          // 获取完整路径
          return `${sourcePath}/${v}`;
        }).map(v => {
          // 生成测试代码文件
          return this.genTestFile(v);
        })
        console.log(files,'files');
        return true;
    }

    /**
     * 生成测试文件
     * @param {文件路劲} filePath 
     */
    genTestFile(filePath){
      
      // 获取将要生成的文件路径
      let jestFilePath = this.getJestFileName(filePath);

      // 获取对象，函数
      let mod = require(filePath);

      let sourceCode;
      if(typeof mod === 'object'){
        // 处理类
        sourceCode = Object.keys(mod).map(v => {
          // 获取测试文件源代码
          return this.getJestSource(v,`../${path.basename(filePath)}`,true);
        }).join('\n');
      }else if(typeof mod === 'function'){
        // 处理函数
        let methodName = path.basename(filePath).replace('.js','');
        sourceCode = this.getJestSource(methodName,`../${path.basename(filePath)}`);
      }
      
      console.log(sourceCode,'sourceCode');

      // 写入文件
      fs.writeFileSync(jestFilePath,sourceCode);
    }

    /**
     * 获取测试源代码
     * @param {方法名} methodName 
     * @param {相对路径} filePath 
     * @param {是否是class} isClass 
     */
    getJestSource(methodName,filePath,isClass = false){

      return `
test('测试${methodName}', () => {
  // 引入文件
  let src = require('${filePath}');
  // 调用方法
  let res = ${isClass ? 'src.'+methodName+'()' : 'src()'};
  
  // 断言
  //expect(res)
  //  .toBe('is compare result');
});
      `;
  }

}

module.exports = TestNow;


// let test = new TestNow();
// let fileName = test.getJestFileName(__dirname + '/data/class.js');
// console.log(fileName,'fileName');

// const obj = require('./data/class.js');
// const fun = require('./data/fun.js');
// console.log(typeof obj,typeof fun);

// // 引入文件
// let src = require('./data/fun.js');
// // 调用方法
// let res = src();
// console.log(res);

// // 引入文件
// let src = require('./data/class.js');
// // 调用方法
// let res = src.fun1();
// let res2 = src.fun2();
// console.log(res);

// // 删除之前生成的代码
// fs.rmdirSync(__dirname + '/data/__test__/',{
//   recursive:true
// })
// // 创建__test__
// fs.mkdirSync(__dirname + `/data/__test__/`);