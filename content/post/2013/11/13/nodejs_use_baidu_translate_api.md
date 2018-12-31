---
title: nodejs 使用百度翻译 API
date: 2013-11-13 00:00:00
categories: [前端技术]
tags: [nodejs,翻译]
---

博客（网站）中需要对文章标题进行翻译成英文显示，要求可以批量翻译。

这里使用 nodejs 来对指定内容进行翻译，主要用到的知识点有两个：

* 使用百度翻译 API：http://fanyi.baidu.com/v2transapi
* 使用 node 中的 http.request 接口

#### 1. 百度 API

地址为：http://fanyi.baidu.com/v2transapi

方法：POST

参数格式：

	{
		from: 'zh',
		to: 'en',
		query: '这里是内容'
	}

from：表示源语言（zh表示中文）

to：表示想要翻译的语言（en表示为英文）

query：表示需要翻译的内容

#### 2. http.request 接口

http.request(options, callback)

* host: A domain name or IP address of the server to issue the request to. Defaults to 'localhost'.
* hostname: To support url.parse() hostname is preferred over host
* port: Port of remote server. Defaults to 80.
* localAddress: Local interface to bind for network connections.
* socketPath: Unix Domain Socket (use one of host:port or socketPath)
* method: A string specifying the HTTP request method. Defaults to 'GET'.
* path: Request path. Defaults to '/'. Should include query string if any. E.G. '/index.html?page=12'
* headers: An object containing request headers.
* auth: Basic authentication i.e. 'user:password' to compute an Authorization header.
* agent: Controls Agent behavior.

#### 3. 实现

[github 源码](https://github.com/wenzhixin/baidu-translate-api)

	function translate(query, callback) {
	
		var params = {
				from: 'zh',
				to: 'en',
				query: query
			},
			data = querystring.stringify(params);
			options = {
				host: 'fanyi.baidu.com',
				port: 80,
				path: '/v2transapi',
				method: 'POST',
				headers: {
					'Content-Type':'application/x-www-form-urlencoded',
					'Content-Length': data.length
				}
			};
			
		var req = http.request(options, function(res) {
			var result = '';
			
			res.setEncoding('utf8');
			res.on('data', function(data) {
				result += data;
			});
			res.on('end', function() {
				var obj = JSON.parse(result),
					str = obj.trans_result.data[0].dst;
				
				str = str.replace(/\"/g, '');
				str = str.toLowerCase().split(' ').join('_');
				console.log(str);
			});
		});
		
		req.on('error', function(err) {
			console.log(err);
			setTimeout(function() {
				translation(query, callback);
			}, 3000);
		});
		
		req.write(data);
		req.end();
		
	}