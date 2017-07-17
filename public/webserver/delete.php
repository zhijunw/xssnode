<?php
// 设置json的头部
header("content-type:application/json;charset=utf-8");
$link = mysqli_connect("localhost", "root", "", "baidunews", 3306);
if ($link) {
	//获取前台的ID值
	$newsid = $_POST['newsid'];
	mysqli_query($link, "SET NAMES utf8"); //设置文字格式
	//mysql删除数据
	$sql = "DELETE FROM `baidunews` WHERE `newsid` = {$newsid}";
	//发送命令
	mysqli_query($link, $sql);
	//必须返回一个json数据 顺序完整
	echo json_encode(array("success" => "ok"));
}

mysqli_close($link);

?>