---
title: 前端工程师必备工具 livejs
date: 2013-11-07
categories: [前端技术]
tags: [前端,必备工具,livejs]
---

公司的台式机一直没有用到，于是乎想到能否重复利用起来，在笔记本上做开发，在大显示器上看效果。
有了这样的想法之后，找到了 [Live.js](http://livejs.com/)，
它可以让你在开发的时候不用切换窗口（Alt + Tab），可以让你不用到页面 F5 刷新页面，
只要修改了任何 html、css 或者 js 的代码，页面便会自动重新加载，从而达到显示最新页面效果的功能。

先来看看它的**特性**：

* 支持 html、css、javascript 三种格式
* 只支持同域网页
* 不支持 file:// 协议

如何**使用**：

1) 将 livejs 链接加入到书签中，使用的时候点击书签即可，但是这种方式只能支持 css

2) 下载 livejs 文件到开发目录中，并且在页面中加入：

	<script src="live.js"></script>

这种方法可以支持 html、css、javascript 三种格式，
但是很多时候我们在实际开发中并不想在所有的页面加入该代码。

**工作原理**：

工作原理比较简单，通过 setTimeout 每秒监听所有的 html、css 和 js 文件的 HEAD，
对比 Header 中的 value，假如不一样就重新加载文件，
对于 html 和 js 文件使用 document.location.reload() 的方式；
对于 css 文件使用 css?now=new Date() * 1 的方式。

这就解释了为什么使用书签的方式只能支持 css，因为在 html 改变之后，还必须手动在按书签才能继续使用。

扩展为**浏览器插件**

到这里，其实使用起来还是比较不方便的。在此基础上，我把它拓展成 chrome 的插件。
默认是不开启 livejs，点击之后开启监听，并将状态保存到 localstorage 中。

* 源码已经放到 github 上：[livejs](https://github.com/wenzhixin/livejs)，欢迎 fork
* 插件地址：[livejs](https://chrome.google.com/webstore/detail/livejs/fnenjmjepccoionjgdgimlnppidghbbg)
* 演示视频：[土豆演示](http://www.tudou.com/programs/view/5DJkdSuo5lk/)
