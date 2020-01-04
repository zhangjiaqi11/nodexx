//express_demo.js 文件
var querystring = require("querystring")
var express = require('express');
var fs = require('fs');
var mysql=require('mysql');
var app = express();

app.use(express.json())
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// 允许所有的请求形式
app.use(function (request, res, next) {
  // console.log(request);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//格式化日期
Date.prototype.Format = function (fmt) { 
      var o = {
          "M+": this.getMonth() + 1, //月份 
          "d+": this.getDate(), //日 
          "h+": this.getHours(), //小时 
          "m+": this.getMinutes(), //分 
          "s+": this.getSeconds(), //秒 
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
          "S": this.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
  }

// 获取所有
app.get('/api', function (request, response) {
  let showWhat,
  department,
  name,
  account;
  if(request.originalUrl=='/api'){
    showWhat=true;
  }else{
    showWhat=false;
    let requestArr=request.originalUrl.split('?')[1].split('&');
    department=decodeURI(requestArr[0].split('=')[1]);
    name=decodeURI(requestArr[1].split('=')[1]);
    account=requestArr[2].split('=')[1];
  }
 
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'letao',
    port     :8889
  });
   
  connection.connect();
  //查询数据
  if(showWhat){
    connection.query('SELECT * FROM eat',function (err, result) {
      if(err){
        console.log(err.message);
        result={
          status:2,
          data:'请刷新页面',
        }
        response.send(result);
        return;
      }
      resultsSort=result.sort((a,b)=>b.inputTime-a.inputTime).slice(0,49);
      resultsSort.map(v=>{
        v.inputTime=new Date(v.inputTime).Format("yyyy-MM-dd hh:mm:ss")
      })
     const data={
       status:1,
       data:resultsSort
     }
     response.send(data);
  });
  }
  //添加数据
  if(!showWhat){
    let addSql=`INSERT INTO eat(id,department,name,account) VALUES(null,?,?,?)`;
    let addSqlParams = [ department,name, account];
    connection.query(addSql,addSqlParams,function (err, result) {
      if(err){
        console.log(err.message);
        result={
          status:2,
          errmsg:'提交失败'
        }
        return;
      }
      if(result){
        result={
          status:1,
          data:'提交成功'
        }
      }
     response.send(JSON.stringify(result)); 
  });
  } 

})
// 替换集合
app.put('/api', function (request, response) {
  const { users } = request.body
  db.run('delete from user')
  var stmt = db.prepare("INSERT INTO user(status, message) VALUES (?, ?)");
  users.forEach(element => {
    // db.run(`INSERT INTO user (status, message) VALUES ('${element.status}', '${element.message}')`);
    stmt.run(element.status, element.message);
  });
  stmt.finalize(function (err) {
    if (err) {
      response.send('put items error');
    }
    response.send('success')
  });
})
// 新增集合
app.post('/api', function (request, response) {
  // INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY) VALUES (1, 'Paul', 32, 'California', 20000.00 
  const { status, message } = request.body
  db.run(`INSERT INTO user (status, message) VALUES ('${status}', '${message}')`);
  response.send('success')
})
// 删除集合
app.delete('/api', function (request, response) {
  db.run('delete from user')
  response.send("DELETE COLLECTION SUCCESSFUL")
})
// 返回详情
app.get('/api/:id', function (request, response) {
  
})
// 更新id
var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log(`app is listening on http://localhost:${port}`)
})