<?php
// 设置json的头部
header("content-type:application/json;charset=utf-8");
require_once 'db.php';
// $pagenumber = 0;
if ($link) {
	if (isset($_GET['newstype'])) {
		// global $pagenumber;
		// $pagenumber += 3;
		$newstype = $_GET['newstype'];
		$pagenumber = $_GET['pagenumber'];
		$sql1 = "SELECT * FROM `baidunews` WHERE `newstype` = '{$newstype}' order by newsid desc limit " . $pagenumber . ",3";
		mysqli_query($link, "SET NAMES utf8"); //设置文字格式
		$result = mysqli_query($link, $sql1);
		$senddata = array();
		while ($row = mysqli_fetch_assoc($result)) {
			array_push($senddata, array(
				'newsid' => $row['newsid'],
				'newstime' => $row['newstime'],
				'newstitle' => $row['newstitle'],
				'newsimg' => $row['newsimg'],
				'newstype' => $row['newstype'],
			));
		}

		echo json_encode($senddata);
	} else {
		$sql = "SELECT * FROM `baidunews` order by newsid desc"; //选取news表格中的数据
		mysqli_query($link, "SET NAMES utf8"); //设置文字格式
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
		}
		echo json_encode($senddata);
	}
} else {
	echo json_encode(array("success" => "none"));
}
mysqli_close($link);
?>