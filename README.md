###  用express实现一个后台管理系统 ###
### 前言 ###
近期学习express，于是想着用express写个东西加深印象，巩固下学到的知识。于是就有了这个个人项目。
### 前端部分  ###
*    bootstrap布局，jquery,js实现功能
###  后段部分 ###
*   express框架搭建服务，写路由接口。
*   mysql 进行数据的增删改差。

### 项目概览 ###
先看一波实现图吧。这里gif 有点大，需要点进来看。
![图片](https://ws1.sinaimg.cn/large/8d59b975ly1firlznbncwg20bw0dchdu.jpg)
![图片](https://ws1.sinaimg.cn/large/8d59b975ly1firlzx61m0g20b00dc7wj.jpg)
![图片](https://ws1.sinaimg.cn/large/8d59b975ly1firm02vxpeg20dc0c44qq.jpg)

###  项目功能实现  ###
#### 1.express路由接口书写和前台页面的显示 ####
*    1,安装express这里就不详细说了，express官网上面有步骤，主要来看app.js里面的路由设置，如图,
![图片](https://ws1.sinaimg.cn/large/8d59b975ly1firmag2vhpj20uf0l8q9a.jpg)
这里做了几个改动,我说下我的理解，如有不对，希望指出。app.js作为入口文件，看图上的箭头，当请求的路径为news的时候，也就是app.use('/news',index)这行代码，他会去找router文件下面的index文件然后执行，也就是require('../routers/index')这行代码。
*   2,看index文件下面的代码，如图
 ![图片](https://ws1.sinaimg.cn/large/8d59b975ly1firmo5g05dj20w40kaaen.jpg)
这里通过前台传的newstype（新闻类型的值）和pagenumber（显示的条数）,然后在数据库里面查找和传回来的newstype匹配的数据并限制显示3条，并返回给前台数据,前台代码如下图(原谅我截图截不完全)，
 ![图片](https://ws1.sinaimg.cn/large/8d59b975ly1firmwxsadmj20ru0krtda.jpg)
 之后得到数据进行遍历显示就可以了。

*   3，实现加载更多的功能，在上图中看，只需要给定一个初始值pagenumber,然后点击加载更多的按钮进行加3就可以了。

********************
#### 2，后台页面的增删改查 ####
*    1.主要是得到用户输入值，然后点击通过点击按钮的时候发送请求，先看express 的路由接口设置。如图，
![图片](https://ws1.sinaimg.cn/large/8d59b975ly1firn84wdirj20vy0f177x.jpg)
![图片](https://ws1.sinaimg.cn/large/8d59b975ly1firn7r9whdj20vx0hhtdi.jpg)
![图片](https://ws1.sinaimg.cn/large/8d59b975ly1firn9l76kfj20ra0gn42c.jpg)
这里说明下，到了后台管理页面，往app.js里面看，这里就要执行这2段代码了，

        app.use('/admin',users)
        var users = require(../routes/users)
 这里就要去找routes文件夹下面的users文件并执行了。
 

*    2.这里用了node 的xss防御的插件，用法比较简单，npm 安装,然后引入。

        var xss = require("xss");
之后对用户的输入校验,这里值针对xss存储型攻击,如

        var newstitle = xss(req.body.newstitle);

  
*    3.除此之外，还做了csufr 跨站攻击的处理，这里我说下我的理解。首先，需要在html里面插入一个隐藏的input标签,

          <input type="hidden" name="_csrf" value="<%=   csrfToken %>">
 
 这里需要注意的是name值必须为_csrf,这个Input标签的作用就相当于自身带了一个令牌（身份证）。

 然后，在用户输入的时候也要获取到这个input的值，并一起发给后台，如图，
 ![图片](https://ws1.sinaimg.cn/large/8d59b975ly1firnuwyq95j20iz0e576k.jpg)
 
   接着，在express里面需要npm安装csurf插件并引入,如图
 ![图片](https://ws1.sinaimg.cn/large/8d59b975gy1firnz2jwkwj20qg056abg.jpg)
   最后，在一进来后台管理路由的做判断是否和携带的令牌相匹配。
   
         router.get('/', csrfProtection, function(req, res) {res.render('users', { csrfToken: req.csrfToken()})
})
*   3.分页的显示,其实和加载更多的类似，先获取到当前页数，然后设定每页显示多少条，最后把这2个值传给后台，后台mysql进行操作。我这里偷懒没做计算，准确的应该是拿到数据库的数据条数，然后除以每页要显示的条数，在总数除以这个数就得到页数。


#### 总结 ####
通过这个个人项目，算是对express有点了解，加深了自己对ajax的使用和感悟，也接着学习了web安全防御，主要分为存储型和反射型，反射型一般是对url进行攻击，存储型一般对用户的输入做攻击.

 


