var express = require('express');
var router = express.Router();

let db = require('../db/db.js');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// 登录验证
router.post('/login', function (req, res) {
  if (req.url == "/favicon.ico") return;
  console.log("------" + req.body.username)
  var username = req.body.username;
  var userpass = req.body.userpass;
  // let sqlString = 'SELECT * FROM  login';
  var sqlString = "select * from login where username='" + username + "' and userpass='" + userpass + "'"
  var connection = db.connection();
  db.checkUser(connection, sqlString, function (data) {
    if (data == 0) {//查询无满足条件
      res.send({
        code: 0,
        data: null,
        message: "error"
      })
    } else {//查询符合条件
      res.send({
        code: 1,
        data: data,
        message: "success"
      })
    }
    res.end();
    db.close(connection)
  })
});

//首页数据
router.get('/home', function (req, res) {
  if (req.url === "/favicon.ico") return
  // res.setHeader('Access-Control-Allow-Origin', '*')
  // res.setHeader('Content-Type', 'text/html;charset=utf-8')

  // console.log(req.url);//端口号后面所有
  // console.log(req.query);//？号后面键值对
  // // console.log(req.params);
  // console.log(req.body);//post请求发送的数据

  let sqlString = 'SELECT * FROM  websites';

  let connection = db.connection();
  db.getList(connection, sqlString, function (data) {
    res.send(data)
    res.end()
    db.close(connection);
  });
  return;
});

router.get('/addBorrower', function (req, res) {
  if (req.url === "/favicon.ico") return

  let project = { name: '腾讯', url: 'http://www.tengxun.com/' };
  // let sqlString = 'INSERT INTO project SET ?';
  let sqlString = 'INSERT INTO websites SET ?';
  // let sqlString = 'INSERT INTO websites (name, url) VALUES (QQ, http://www.weixin.com/)';

  let connection = db.connection();
  db.insert(connection, sqlString, project, function (data) {
    // console.log('inserted id is:' + data.insertId);
    res.send(data.insertId)
    res.end()
    db.close(connection);
  });
  return;
});


module.exports = router;
