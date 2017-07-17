var express = require('express');
var router = express.Router();
//引入mysql
var mysql = require('mysql');
var dbsql = require("./db");

/* 获取到新闻首页 */
router.get('/', function(req, res, next) {
    var newstype = req.query.newstype;
    var pagenumber=req.query.pagenumber;
    //创建数据库连接
    var connection = mysql.createConnection(dbsql);
    //链接数据库
    connection.connect();
    //发送查询语句.一个参数是sql,第二个参数是得到值，第三个参数是回调函数，回调函数有三个值，
    //第一个是error,第二个是rows数组，第三个是filde
    connection.query('SELECT * FROM `baidunews` WHERE `newstype` = ? order by newsid desc limit '+pagenumber+',3', [newstype], function(error, rows, fields) {
        //返回数据给前台
        if (error) {
            res.json(500);
        } else {
            res.json(rows);
        }
    });



});

module.exports = router;
