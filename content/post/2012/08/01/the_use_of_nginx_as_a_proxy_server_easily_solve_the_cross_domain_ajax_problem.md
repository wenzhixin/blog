---
title: 使用 nginx 作为代理服务器轻松解决 Ajax 跨域问题
date: 2012-08-01
categories: [前端技术]
tags: [Ajax,跨域,nginx]
---

#### 1、安装 nginx：

	sudo apt-get install nginx

#### 2、配置 nginx：

	sudo vi /etc/nginx/sites-enabled/default

输入内容：

	server {   
	        listen 8080;
	    
	        location /api {   
	                proxy_pass http://myserver/api;
	                access_log off;
	        }
	}

#### 3、重启

	sudo /etc/init.d/nginx restart

#### 4、使用：

	var SERVER_URI = "/api"; 
