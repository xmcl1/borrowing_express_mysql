let mysql = require('mysql');
let db = {}


//登录验证
db.checkUser = function (connection, sql, callback) {
    connection.query(sql, function (error, results, fields) {
        // if (error) throw error;
        if (error) {
            callback(0)
        } else {
            callback(results);//返回results
        }
    });
}

//获取全部数据
db.getList = function (connection, sql, callback) {
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        // callback(results.insertId);//返回插入的id
        callback(results);//返回results
    });
}
//插入操作，注意使用异步返回查询结果
db.insert = function (connection, sql, paras, callback) {
    connection.query(sql, paras, function (error, results, fields) {
        if (error) throw error;
        callback(results);//返回results
    });
}

//关闭数据库
db.close = function (connection) {
    //关闭连接
    connection.end(function (err) {
        if (err) {
            return;
        } else {
            console.log('关闭连接');
        }
    });
}

//获取数据库连接
db.connection = function () {
    //数据库配置
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123',
        database: 'app_01',
        port: 3306
    });
    //数据库连接
    connection.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
    return connection;
}
module.exports = db;