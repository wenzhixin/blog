---
title: vtiger5.2 问题修复
date: 2013-01-17 22:52:00
categories: [后台技术]
tags: [php,vtiger]
---

### 图表乱码：

1. 下载 [Simsun](/2013/01/17/Simsun.zip) 解压

2. 将 Simsun.ttf 文件复制到 Image/Canvas/Fonts 目录下

3. 修改 Image/Canvas/Fonts/fontmap.txt，最后增加一行：

	Simsun, Simsun.ttf

4. 修改 include/utils/GraphUtils.php，在第22行插入以下代码：

	DEFINE("FF_DROIDSANSFALLBACK",'Droid Sans Fallback');

将第43行的

	case 'cn_zh':

修改为

	case 'zh_cn':

___

### 导出 cvs 乱码

1. 下载 [vtiger53csv](/2013/01/17/vtiger53csv.zip) 解压（改的文件比较多，已压缩为 zip 包）

2. 覆盖目标目录

___

### 导出 pdf 乱码：

1. 下载 [vtiger53pdf](/2013/01/17/vtiger53pdf.zip) 解压 (改的文件比较多，已压缩为 zip 包)

2. 覆盖目标目录

___

### 报表描述格式显示错误

编辑 ReportRun.php 文件

	sudo vi modules/Reports/ReportRun.php

将第 1896 和 1897 行

	$fieldvalue = str_replace("&lt;", "<", $fieldvalue);
	$fieldvalue = str_replace("&gt;", ">", $fieldvalue);

修改为

	$fieldvalue = html_entity_decode($fieldvalue);

#### 知识点：

* htmlentities — Convert all applicable characters to HTML entities

* html_entity_decode — Convert all HTML entities to their applicable characters

___

### 日程安排发邮件问题

编辑 Activity.php 文件

	sudo vi modules/Calendar/Activity.php
将第 131 行

	if(isset($this->column_fields['sendnotification'])){

修改为

	if($this->column_fields['sendnotification'] == 'On'){
