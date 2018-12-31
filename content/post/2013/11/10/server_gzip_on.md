---
title: 为你的网站开启 gzip 压缩功能（nodejs、nginx）
date: 2013-11-10 23:22:00
categories: [后台技术]
tags: [gzip,nodejs,nginx]
---

开启网站的 gzip 压缩功能，通常可以高达70%，也就是说，如果你的网页有30K，压缩之后就变成9K，
对于大部分网站，显然可以明显提高浏览速度（注：需要浏览器支持）。

测试工具：[google speed](http://developers.google.com/speed/pagespeed/insights/)

#### nodejs + express

对于 nodejs + express 框架，启用方法非常简单，启用 compress() 中间件即可，
通过 gzip / deflate 压缩响应数据，这个中间件应该放置在所有的中间件最前面以保证所有的返回都是被压缩的。

代码如下：

	app.use(express.logger());
	app.use(express.compress());
	app.use(express.static(__dirname + '/html'));
	app.use(express.methodOverride());
	app.use(express.bodyParser());
	
#### nginx

编辑 nginx 的配置文件

	sudo vi /etc/nginx/nginx.conf
	
在 Gzip Settings 中加入如下设置：
	
	##
	# Gzip Settings
	##

	gzip on;
	gzip_min_length 1k;
	gzip_buffers 4 16k;
	gzip_comp_level 5;
	gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php;
	
1) gzip

* 语法：gzip on/off
* 默认值：off
* 作用域：http, server, location
* 说明：开启或者关闭 gzip 模块，这里使用 on 表示启动

2) gzip_min_length

* 语法：gzip_min_length length
* 默认值：gzip_min_length 0
* 作用域：http, server, location
* 说明：设置允许压缩的页面最小字节数，页面字节数从header头中的Content-Length中进行获取。默认值是0，不管页面多大都压缩。建议设置成大于1k的字节数，小于1k可能会越压越大。|

3) gzip_buffers

* 语法: gzip_buffers number size
* 默认值: gzip_buffers 4 4k/8k
* 作用域: http, server, location
* 说明：设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流。4 16k 代表以 16k 为单位，按照原始数据大小以 16k 为单位的4倍申请内存。

4) gzip_comp_level

* 语法: gzip_comp_level 1..9
* 默认值: gzip_comp_level 1
* 作用域: http, server, location
* 说明：gzip压缩比，1 压缩比最小处理速度最快，9 压缩比最大但处理最慢（传输快但比较消耗cpu）。这里设置为 5。

5) gzip_types

* 语法: gzip_types mime-type [mime-type ...]
* 默认值: gzip_types text/html
* 作用域: http, server, location
* 说明：匹配MIME类型进行压缩，（无论是否指定）"text/html" 类型总是会被压缩的。这里设置为 text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php。