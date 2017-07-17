var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var mysql = require("mysql");
// 引入xss
var xss = require("xss");
//引入csurf  防止csurf攻击
var csrf = require("csurf");
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })

//引入一个公共的数据库
var dbsql = require("./db");
//建立一个连接池
var connection = mysql.createPool(dbsql);

/* 后台管理页面 */
//请求进入到后台页面
router.get('/', csrfProtection, function(req, res) {
    // 使用users页面
  res.render('users', { csrfToken: req.csrfToken()})
})

// 获取所有新闻列表
router.get('/getnews', function(req, res, next) {
    //得到前台传输的值
    var page = req.query.number;
    var pagenumber = req.query.pagenumber;
    //查询语句
    if (!page) {
        connection.query('SELECT * FROM `baidunews` order by newsid DESC limit 0,20', function(err, rows) {
            //返回数据给前台
            res.json(rows);
        });
    } else {
        connection.query('SELECT * FROM `baidunews` order by newsid DESC limit ' + page * pagenumber + ',20', function(err, rows) {
            //返回数据给前台
            res.json(rows);
        });
    }

});
//确认修改  
router.get('/curnews', function(req, res, next) {
    //得到前台传输的值
    var newsid = req.query.newsid;
    //发送查询语句
    connection.query("SELECT * FROM `baidunews` WHERE `newsid` = ?", [newsid], function(err, rows) {
        res.json(rows);
    });
});
//点击确认
router.post('/updelete',function(req, res, next) {
    //获取前台传输的数据
    var newsid = xss(req.body.newsid);
    var newstitle = xss(req.body.newstitle);
    var newstime = xss(req.body.newstime);
    var newsimg = xss(req.body.newsimg);
    var newstype = xss(req.body.newstype);
    //发送查询语句
    connection.query("UPDATE `baidunews` SET `newstime`=?,`newstitle`=?,`newsimg`=?,`newstype`=? WHERE `newsid`=?", [newstime, newstitle, newsimg, newstype, newsid], function(err, rows) {
        res.json(rows);
        // console.log(rows.changedRows)
    });
});

//删除新闻
router.post('/delete', function(req, res, next) {
    //得到值
    var newsid = req.body.newsid;
    connection.query('DELETE FROM `baidunews` WHERE `newsid` = ?', [newsid], function(err, result) {
        console.log(result.affectedRows)
    });
});
//增加新闻
router.post('/insert',function(req, res, next) {
    //得到值
    var newstitle = xss(req.body.newstitle);
    var newstime = xss(req.body.newstime);
    var newsimg = xss(req.body.newsimg);
    var newstype = xss(req.body.newstype);
    //发送查询数据
    connection.query('INSERT INTO `baidunews`( `newstitle`, `newstime`, `newsimg`, `newstype`) VALUES (?,?,?,?)', [newstitle, newstime, newsimg, newstype], function(err, result) {
        res.json("添加信息成功");
    });
});
module.exports = router;
