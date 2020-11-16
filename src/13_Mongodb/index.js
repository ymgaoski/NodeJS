const mongoose = require('mongoose');

const uri = 'mongodb://10.7.3.225:27017/mytest';

// 创建连接
// useNewUrlParser: 使用新的url解析器
// useUnifiedTopology: 使用新的服务器发现和监视引擎
mongoose.connect(uri,{
  useNewUrlParser:true,
  useUnifiedTopology: true,
  // user:'xxx',
  // pass:'xxx'
}, error => {

  if (error){
    console.log('connection error！');
    throw error;
  }

  console.log('connection successful.');

  //-------- 新增数据

  // mongoose，新增数据需要用到 数据模式，先定义好数据类型与名称

  // 教师 数据模式
  const teacherSchema = new mongoose.Schema({
    name: String,
    age: Number,
    level: String
  });
  // 学生 数据模式，Schema可以用来做为数据类型的定义
  const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    address: String,
    clazz: String,
    teacher: teacherSchema
  });
  
  // 定义并绑定 数据模式的实体名, teacherSchema不需要再定义，会自动关联
  mongoose.model('student',studentSchema);

  // 获取student的 数据模型类
  const Student = mongoose.model('student');

  // 定义数据
  const student = new Student({
    name:'小明' + Math.random()* 100,
    age: 20,
    address: '广州',
    clazz: '405班',
    teacher: {
      name:'张老师' + Math.random()* 100,
      age: 38,
      level: '高级教师'
    }
  });

  // 保存操作
  student.save(error => {
    if (error){
      console.log('保存失败！');
      throw error;
    }

    console.log('保存成功！');
  });


  // 查询数据
  this.getDataList();

  setTimeout(() => {
    
  }, 5 * 1000);
})

// 查询数据
function getDataList(){

  Student.find({},(error,docs) => {

    if (error){
      console.log('查询失败！');
      throw error;
    }
    docs.forEach(item => {
      console.log(item.name + ' 的老师叫：' + item.teacher.name);
    })

    // 关闭连接
    mongoose.connection.close();
  })  
}