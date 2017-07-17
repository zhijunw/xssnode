var pagenum = 3; //设定最开始显示图片数量的值
var type = '精选'; //给定初始值

$(document).ready(function() {
    refreshNews("精选");
    $("nav a").click(function(e) {
        e.preventDefault(); //阻止其默认
        type = $(this).text();
        //这里设置为了切换的时候把前面pagenum值清零
        pagenum = 3;
        console.log(type);
        refreshNews(type);
    });
    //点击获取更多
    $("#moreinfo").click(function() {
        //点击一次获取三条信息
        pagenum = pagenum + 3;
        console.log(pagenum);
        var $lists = $(".news-lists");
        $.ajax({
            url: "/news",
            type: "get",
            data: {
                newstype: type,
                pagenumber: pagenum,
            },
            success: function(data) {
            if (data.length==0) {
                alert("没有更多数据了");
                return;
            }
                data.forEach(function(value, index, array) {
                var newstime=moment(value.newstime).format('YYYY-MM-DD HH:mm');
                    var $list = $("<li></li>").addClass("news-list").prependTo($lists);
                    var $imgdiv = $("<div></div>").addClass("news-img").appendTo($list);
                    var $img = $("<img>").attr("src", value.newsimg).appendTo($imgdiv);
                    var $contdiv = $("<div></div>").addClass("news-content").appendTo($list);
                    var $h2 = $("<h2></h2>").text(value.newstitle).appendTo($contdiv);
                    var $h2p = $("<p></p>").text("新闻内容").appendTo($contdiv);
                    var $share = $("<div></div>").addClass("news-share").appendTo($contdiv);
                    var $time = $("<span></span>").addClass("nesw-share-time").text(newstime).appendTo($share);
                    var $sharespan = $("<span></span>").text("分享").appendTo($share);
                    var $logo = $("<span></span>").addClass("share-logo").appendTo($share);
                    var weibo = $("<i></i>").addClass("weibo").prependTo($logo);
                    var qq = $("<i></i>").addClass("qq").prependTo($logo);
                    var wechat = $("<i></i>").addClass("wechat").prependTo($logo);
                })
            }
        })

    })
});


//新闻刷新
function refreshNews(type) {
    var $lists = $(".news-lists");
    //清空
    $lists.empty();
    //动态添加新闻
    //通过ajax获取到后台的数据
    $.ajax({
        url: "/news",
        type: "get",
        datatype: "json",
        data: {
            newstype: type,
            pagenumber: pagenum,
        },
        success: function(data) {
            data.forEach(function(value, index, array) {
            
                var newstime=value.newstime.split('T')[0];
                var $list = $("<li></li>").addClass("news-list").prependTo($lists);
                var $imgdiv = $("<div></div>").addClass("news-img").appendTo($list);
                var $img = $("<img>").attr("src", value.newsimg).appendTo($imgdiv);
                var $contdiv = $("<div></div>").addClass("news-content").appendTo($list);
                var $h2 = $("<h2></h2>").text(value.newstitle).appendTo($contdiv);
                var $h2p = $("<p></p>").text("新闻内容").appendTo($contdiv);
                var $share = $("<div></div>").addClass("news-share").appendTo($contdiv);
                var $time = $("<span></span>").addClass("nesw-share-time").text(newstime).appendTo($share);
                var $sharespan = $("<span></span>").text("分享").appendTo($share);
                var $logo = $("<span></span>").addClass("share-logo").appendTo($share);
                var weibo = $("<i></i>").addClass("weibo").prependTo($logo);
                var qq = $("<i></i>").addClass("qq").prependTo($logo);
                var wechat = $("<i></i>").addClass("wechat").prependTo($logo);
            })

        }
    })
};
