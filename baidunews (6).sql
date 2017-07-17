-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2017-06-10 11:09:21
-- 服务器版本： 10.1.10-MariaDB
-- PHP Version: 7.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `baidunews`
--

-- --------------------------------------------------------

--
-- 表的结构 `baidunews`
--

CREATE TABLE `baidunews` (
  `newsid` int(20) NOT NULL,
  `newstitle` varchar(200) NOT NULL,
  `newsimg` varchar(200) NOT NULL,
  `newstype` varchar(200) NOT NULL,
  `newstime` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='百度新闻';

--
-- 转存表中的数据 `baidunews`
--

INSERT INTO `baidunews` (`newsid`, `newstitle`, `newsimg`, `newstype`, `newstime`) VALUES
(4, '美食', 'img/8.jpg', '精选', '2017-06-08'),
(5, '美食', 'img/9.jpg', '百家', '2017-06-08'),
(6, '美食', 'img/10.jpg', '百家', '2017-06-08'),
(7, '美食', 'img/3.jpg', '本地', '2017-06-08'),
(8, '美食', 'img/11.jpg', '百家', '2017-06-08'),
(9, '美食', 'img/3.jpg', '精选', '2017-06-08'),
(10, '美食', 'img/13.jpg', '精选', '2017-06-08'),
(11, '美食', 'img/8.jpg', '百家', '2017-06-08'),
(12, '美食', 'img/14.jpg', '精选', '2017-06-08'),
(13, '美食', 'img/13.jpg', '精选', '2017-06-08'),
(14, '美食', 'img/3.jpg', '百家', '2017-06-08'),
(15, '美食', 'img/12.jpg', '精选', '2017-06-08'),
(16, '美食', 'img/15.jpg', '精选', '2017-06-08'),
(17, '美食', 'img/3.jpg', '精选', '2017-06-08'),
(19, '旅游', 'img/16.jpg', '百家', '0000-00-00'),
(20, '旅游', 'img/4.jpg', '本地', '2017-06-14'),
(21, '做饭', 'img/9.jpg', '本地', '2017-06-09'),
(25, '读书', 'img/4.jpg', '本地', '2017-06-09'),
(27, '画画', 'img/2.jpg', '本地', '2017-06-08'),
(28, '去西藏', 'img/12.jpg', '百家', '2017-06-15'),
(29, '成都', 'img/12.jpg', '本地', '2017-06-21'),
(30, '重庆', 'img/9.jpg', '本地', '2017-06-15'),
(31, '音乐', 'img/12.jpg', '百家', '2017-06-08'),
(32, '精选', 'img/10.jpg', '精选', '2017-06-15'),
(33, '精选3', 'img/16.jpg', '精选', '2017-06-14'),
(34, '精选2', 'img/15.jpg', '精选', '2017-06-14'),
(35, '百家', 'img/22.jpg', '百家', '2017-06-14'),
(36, '百家2', 'img/19.jpg', '百家', '2017-06-14'),
(37, '百家', 'img/18.jpg', '百家', '2017-06-14'),
(38, '本地', 'img/11.jpg', '本地', '2017-06-14'),
(39, '本地', 'img/10.jpg', '本地', '2017-06-14'),
(41, '百家', 'img/5.jpg', '百家', '2017-06-14'),
(42, '百家', 'img/7.jpg', '百家', '2017-06-22'),
(43, '本地', 'img/23.jpg', '本地', '2017-06-07'),
(44, '本地', 'img/9.jpg', '本地', '2017-06-16'),
(46, '本地', 'img/9.jpg', '本地', '2017-06-09'),
(47, '精选4', 'img/22.jpg', '精选', '2017-06-15'),
(48, '精选5', 'img/22.jpg', '精选', '2017-06-15'),
(49, '精选6', 'img/23.jpg', '精选', '2017-06-15'),
(50, '精选7', 'img/24.jpg', '精选', '2017-06-15'),
(51, '本地4', 'img/25.jpg', '本地', '2017-06-15'),
(52, '本地5', 'img/26.jpg', '本地', '2017-06-15'),
(53, '本地6', 'img/27.jpg', '本地', '2017-06-15'),
(54, '百家4', 'img/3.jpg', '百家', '2017-06-15'),
(55, '百家4', 'img/4.jpg', '百家', '2017-06-15'),
(56, '百家5', 'img/5.jpg', '百家', '2017-06-15'),
(57, '百家6', 'img/6.jpg', '百家', '2017-06-15'),
(58, '百家7', 'img/7.jpg', '百家', '2017-06-15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `baidunews`
--
ALTER TABLE `baidunews`
  ADD PRIMARY KEY (`newsid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `baidunews`
--
ALTER TABLE `baidunews`
  MODIFY `newsid` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
