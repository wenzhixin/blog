---
title: 图片查看弹出框 (jQuery 插件)
date: 2012-12-02
categories: [前端技术]
tags: [jQuery,插件]
---

### 参数

* linkTitle: 点击图片提示信息，默认为 '点击查看原图'

* direction: 箭头显示方向，水平方向 (horizontal) 和垂直方向 (vertical)，默认为 'horizontal'

### 如何使用

#### 1、导入

	<link rel="stylesheet" href="css/jquery.imagebox.css" />
	<script type="text/javascript" src="js/jquery.imagebox.js"></script>

#### 2、使用

	$('element').imagebox();

	$('element').imagebox({
	    linkTitle: '查看原图',
	    direction: 'vertical'
	});


#### 3、截图

![截图2](/2012/12/02/2.png)

![截图1](/2012/12/02/1.png)

### 源码

源码见 [github](https://github.com/wenzhixin/jquery.imagebox)

___

特别感谢：[echo](http://weibo.com/u/2191714780) 的提供的图片切换功能，以及图片素材
