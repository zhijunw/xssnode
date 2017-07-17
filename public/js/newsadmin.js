$(document).ready(function() {

    refresh();
    //添加新闻
    //分页导航
    $("#page").on("click", ".pagenumber", function(e) {
        //上一页，下一页
        e.preventDefault();
        //得到数值
        var $number = parseInt($(this).text())+1;
        $(this).addClass("select").parent().siblings().find("a").removeClass("select");
        //定义一页显示30条
        var pagenumber = 20;
        //把数据传给后台
        var $table = $("#newstable tbody");
        $table.empty(); //一进来让其内容为空
        $.ajax({
            url: "/admin/getnews",
            type: "get",
            data: {
                number: $number,
                pagenumber: pagenumber
            },
            success: function(data) {
                if (data.length == 0) {
                    alert("没有更多数据了");
                    return;
                }
                data.forEach(function(value, index, array) {
                    // console.log(value);
                    var $tdid = $("<td>").html(value.newsid);
                    var $tdtitle = $("<td>").html(value.newstitle);
                    var $tdimg = $("<td>").html(value.newsimg);
                    var $tdtype = $("<td>").html(value.newstype);
                    var $td = $("<td>");
                    var $tdudate = $("<button>").addClass("btn btn-primary btn-xs").html("编辑");
                    var $tddelete = $("<button>").addClass("btn btn-danger btn-xs").html("删除");
                    $td.append($tdudate, $tddelete);
                    var $tr = $("<tr>");
                    $tr.append($tdid, $tdtitle, $tdimg, $tdtype, $td);
                    $table.append($tr);
                })
            }
        })
    })
    $("#submitbtn").click(function(e) {
        e.preventDefault(); //阻止其点击刷新
        //输入判断
        if ($("#newstitle").val() == "" || !isNaN($("#newstitle").val()) || $("#newstime").val() == "" || $("#newsing").val() == "") {
            if ($("#newstitle").val() == "" || !isNaN($("#newstitle").val())) {
                $("#newstitle").parent().addClass("has-error");
                alert("请输入字符或者中文");
            } else {
                $("#newstitle").parent().removeClass("has-error");
            }
            if ($("#newstime").val() == "") {
                $("#newstime").parent().addClass("has-error");
            } else {
                $("#newstime").parent().removeClass("has-error");

            }
            if ($("#newsimg").val() == "") {
                $("#newsimg").parent().addClass("has-error");
            } else {
                $("#newsimg").parent().removeClass("has-error");

            }
            if ($("#newtype").val() == "") {
                $("#newstype").parent().addClass("has-error");
            } else {
                $("#newstype").parent().removeClass("has-error");

            }

        } else {
            //提交
            var jsonnews = {
                newstitle: $("#newstitle").val(),
                newstime: $("#newstime").val(),
                newsimg: $("#newsimg").val(),
                newstype: $("#newstype").val(),
                //csruf防御
                _csrf:$("input[type='hidden']").val()

            };
            $.ajax({
                url: '/admin/insert',
                type: 'post',
                datatype: 'json',
                data: jsonnews, //数据为jsonnews文件
                success: function(data) {
                    console.log(data);
                    refresh();
                }
            });
        }
    });
});

//删除新闻
//因为这里的button按钮都是动态加载出来的，不能为其添加绑定事件，需进行事件委托
//第一个参数为要绑定的事件，第二个参数为选择器，第三个函数
var $deleteId = null;
var $newstable = $("#newstable tbody");
$newstable.on("click", ".btn-danger", function() {
    $("#deleteModel").modal("show");
    //获取到要删除的ID值
    $deleteId = $(this).parents().prevAll().eq(3).text();
});
//点击确认按钮的
$("#confirmdelete").click(function() {
    if ($deleteId) {
        $.ajax({
            url: '/admin/delete',
            type: 'post',
            datatype: 'json',
            data: { newsid: $deleteId },
            success: function(data) {
                console.log("删除成功")
               
            }

        })
         refresh();
        $("#deleteModel").modal("hide");
    }
})

//修改
var $updateId = null;
//修改按钮的事件
$newstable.on("click", ".btn-primary", function() {
    $("#updateModel").modal("show"); //弹窗打开
    $updateId = $(this).parents().prevAll().eq(3).html();
    $.ajax({
        //这里先要得到要修改的全部值
        url: '/admin/curnews',
        type: 'get',
        data: { newsid: $updateId },
        success: function(data) {
            console.log(data);
            //这里把值呈现出来
            $("#unewstitle").val(data[0].newstitle);
            // var utime=data[0].newstime.split('T')[0];
            $("#unewstime").val(moment(data[0].newstime).format('YYYY-MM-DD'));
            $("#unewsimg").val(data[0].newsimg);
            $("#unewstype").val(data[0].newstype);
        }
    });
});



//确认按钮
$("#confirmupdate").click(function() {
        $.ajax({
            url: '/admin/updelete',
            type: 'post',
            datatype: 'json',
            data: {
                newsid: $updateId,
                newstitle: $("#unewstitle").val(),
                newstime: $("#unewstime").val(),
                newsimg: $("#unewsimg").val(),
                newstype: $("#unewstype").val(),
                _csrf:$("input[type='hidden']").val()
            },
            success: function(data) {
                console.log(data);
                refresh();
            }

        });
        $("#updateModel").modal("hide");

    })
    //刷新添加新闻
function refresh() {
    var $table = $("#newstable tbody");
    $table.empty(); //一进来让其内容为空
    $.ajax({
        url: "/admin/getnews",
        type: 'get',
        datatype: 'json',
        success: function(data) {
            // console.log(data);
            // 这里动态添加
            data.forEach(function(value,index,array) {
                // console.log(value);
                var $tdid = $("<td>").text(value.newsid);
                var $tdtitle = $("<td>").text(value.newstitle);
                var $tdimg = $("<td>").text(value.newsimg);
                var $tdtype = $("<td>").text(value.newstype);
                var $td = $("<td>");
                var $tdudate = $("<button>").addClass("btn btn-primary btn-xs").text("编辑");
                var $tddelete = $("<button>").addClass("btn btn-danger btn-xs").text("删除");
                $td.append($tdudate, $tddelete);
                var $tr = $("<tr>");
                $tr.append($tdid, $tdtitle, $tdimg, $tdtype, $td);
                $table.append($tr);
            })
        }

    });
};
