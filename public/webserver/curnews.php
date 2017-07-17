<?php
// 设置json的头部
header("content-type:application/json;charset=utf-8");
require_once 'db.php';
if ($link) {
	//从前台得到ID值
	$newsid = $_GET['newsid'];
	//找到等于ID值的信息
	$sql = "SELECT * FROM `baidunews` WHERE `newsid` = {$newsid}";
	//选取news表格中newsid=$newsid的数据
	mysqli_query($link, "SET NAMES utf8"); //设置文字格式
	// 查询$sql中的数据并返回值，第一个参数是连接符，第二个参数为要查询的语句
	$result = mysqli_query($link, $sql);
	$senddata = array();
	while ($row = mysqli_fetch_assoc($result)) {
		array_push($senddata, array(
			'newsid' => $row['newsid'],
			'newstime' => $row['newstime'],
			'newstitle' => $row['newstitle'],
			'newsimg' => $row['newsimg'],
			'newstype' => $row['newstype'],
		));
		// print_r($row);exit;
	}

	echo json_encode($senddata); //返回给前台
}
mysqli_close($link);

?>