<?php
//第一步设置header避免乱码
header("content-type:application/json;charset=utf-8");
//第二步链接数据库，
$link = mysqli_connect("localhost", "root", "", "baidunews", 3306);

?>