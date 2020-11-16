const mysql = require('mysql');
const uuid = require('uuid');

// 创建mysql连接
const db = mysql.createConnection({
  host: '10.7.3.225',
  port: '3306',
  user: 'root',
  password: '123',
  database:'mytest'
});

// 连接数据库
db.connect(err => {

  if (err){
    console.log(err,'connect error');
    return;
  }

  // 插入
  // 所有的Sql操作都是使用 query 这个方法
  db.query('insert into users set ?',{
    id: uuid.v1(),
    name: 'xgao',
    age: 29,
    sex: 1
  }, (err,result) => {
    if (err){
      console.log(err,'error');
      return;
    }

    console.log('插入成功！');

    // 查询
    db.query('select * from users', (err,data) => {
      console.log(data,'查找到的数据');

      // 关闭连接
      db.destroy();
    })
  })
  

  console.log('sql connected');
})