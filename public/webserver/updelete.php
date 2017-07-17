<?php
// 设置json的头部
header("content-type:application/json;charset=utf-8");
require_once 'db.php';
if ($link) {
	//得到前台传过来的数据
	$newsid = $_GET['newsid'];
	$newstitle = $_GET['newstitle'];
	$newstime = $_GET['newstime'];
	$newsimg = $_GET['newsimg'];
	$newstype = $_GET['newstype'];
	$sql = "UPDATE `baidunews` SET `newstime`='{$newstime}',`newstitle`='{$newstitle}',`newsimg`='{$newsimg}',`newstype`='{$newstype}' WHERE `newsid`={$newsid}";
	mysqli_query($link, "SET NAMES utf8"); //设置文字格式
	$result = mysqli_query($link, $sql);
	echo json_encode(array("success" => "ok"));

}
;
mysqli_close($link);
?>