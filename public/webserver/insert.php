<?php
require_once "db.php";
if ($link) {
	//执行链接成功的代码
	//得到前台的数据
	$newstitle = htmlspecialchars(addslashes($_POST['newstitle']));
	$newstime = htmlspecialchars(addslashes($_POST['newstime']));
	$newsimg = htmlspecialchars(addslashes($_POST['newsimg']));
	$newstype = htmlspecialchars(addslashes($_POST['newstype']));
	//写sql添加语句
	$sql = "INSERT INTO `baidunews`( `newstime`, `newstitle`, `newsimg`, `newstype`) VALUES ('{$newstime}','{$newstitle}','{$newsimg}', '{$newstype}')"; //把数据存到$sql
	mysqli_query($link, "SET NAMES utf8"); //设置文字格式
	$result = mysqli_query($link, $sql); //发送查询命令
	echo json_encode(array("success" => "ok"));
}
;
mysqli_close($link);
?>