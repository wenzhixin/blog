## 使用 nginx 作为代理服务器的路径问题

分类：服务器 | 标签：nginx、proxy_pass、路径 | 发布时间：2013-07-17 15:31:00

___

继上篇文章：[使用 nginx 作为代理服务器轻松解决 Ajax 跨域问题](http://qing.blog.sina.com.cn/2292826740/88a9c27433001xt5.html)，
使用 proxy 来解决 Ajax 跨域的问题，方便我们开发测试。

但是很多时候，我们的服务器地址是这样的：

	a: 192.168.1.14
	b: 192.168.1.15
	c: 192.168.1.16
	...

我们需要将

	127.0.0.1/a 代理到 a 服务器
	127.0.0.1/b 代理到 b 服务器
	127.0.0.1/c 代理到 c 服务器
	...

那么应该怎么设置呢？

	location /a {   
		proxy_pass http://192.168.1.14;
		access_log off;
	}
	
通过试验可以发现，这样代理的实际地址为

	http://192.168.1.14/a
	
并不是我们想要的，为什么会这样呢？

答案在与 proxy_pass 中路径是否有加上/：

**当路径加上了/，相当于是绝对根路径，则 nginx 不会把 location 中匹配的路径部分代理。**

**如果没有/，则会把匹配的路径部分也给代理。**

通过以上结论，我们知道应该如何设置了

**代理到同一台服务器的多个项目下：**

	location /a/ {   
		proxy_pass http://192.168.1.14;
		access_log off;
	}
	location /b/ {   
		proxy_pass http://192.168.1.14;
		access_log off;
	}
	location /c/ {   
		proxy_pass http://192.168.1.14;
		access_log off;
	}
	
分别代理为：

	http://127.0.0.1/a  ->  http://192.168.1.14/a
	http://127.0.0.1/b  ->  http://192.168.1.14/b
	http://127.0.0.1/c  ->  http://192.168.1.14/c
	
**代理到不同服务器上：**

	location /a/ {   
		proxy_pass http://192.168.1.14/;
		access_log off;
	}
	location /b/ {   
		proxy_pass http://192.168.1.15/;
		access_log off;
	}
	location /c/ {   
		proxy_pass http://192.168.1.14/;
		access_log off;
	}
	
分别代理为：

	http://127.0.0.1/a  ->  http://192.168.1.14
	http://127.0.0.1/b  ->  http://192.168.1.15
	http://127.0.0.1/c  ->  http://192.168.1.16