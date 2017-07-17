###  xss csruf 脚本攻击防御 ###
1. 用户输入的信息最好用text(),不用html()
2. 在node环境下引入xss，在后台得到的数据前用xss（）包起来 如

       >         var xss=require("xss)
       >         xss(req.query.newsid)

3. 在node环境下引入csruf，如

     >         var csruf=require("csruf"); 
     
     1.并且建立一个中间件 如
     
     >         var csrfProtection = csrf({ cookie: true })
     
     >         var parseForm = bodyParser.urlencoded({ extended: false })
     
    2.在路由里面配置函数
    >         app.get('/form', csrfProtection, function(req, res) {res.render('send', { csrfToken: req.csrfToken() })})
    
    3.在html里面新建一个input属性 如
    >      <input type="hidden" name="_csrf" value="{{csrfToken}}">
      
 