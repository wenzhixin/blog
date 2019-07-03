---
title: 使用 apache2 作为代理服务器轻松解决 Ajax 跨域问题
date: 2014-06-05
categories: [后台技术]
tags: [Ajax,apache2,http代理,跨域]
---

### 介绍

我们知道，使用 JavaScript 进行开发 Ajax 应用的时候会有跨域访问的问题，而用代理便可以解决跨域访问的问题。
那么应该如何开启 apache2 的 http 代理模块呢？

模块 [mod_proxy](http://www.2cto.com/shouce/ApacheManual/mod/mod_proxy.html)实现了Apache的代理/网关。
它实现了以下规范的代理 FTP， CONNECT（用于SSL）， HTTP/0.9， HTTP/1.0，和 HTTP/1.1。
此模块经配置后可用上述或其它协议连接其它代理模块。

### 启动

在 apache2 的安装目录下，有这样的两个目录：

* /etc/apache2/mods-enabled/ 已经被启用的模块
* /etc/apache2/mods-available/ 当前系统中可用的模块

我们可以使用下列命令来启用（或禁用）proxy 模块：

```
sudo a2enmod proxy
sudo a2enmod proxy_http

sudo a2dismod proxy
sudo a2dismod proxy_http
```

启用完之后重启 apache 即可：
```
sudo service apache restart
```

### 配置

新建配置文件：
```
sudo vi /etc/apache2/site-enabled/proxy.conf
```

```
<IfModule mod_proxy.c>
	ProxyPass /api http://wenzhixin.net.cn/api
	ProxyPassReverse /api http://wenzhixin.net.cn/api
</IfModule>
```

这里使用了 [ProxyPass](http://www.2cto.com/shouce/ApacheManual/mod/mod_proxy.html#proxypass) 和 [ProxyPassReverse](http://www.2cto.com/shouce/ApacheManual/mod/mod_proxy.html#proxypassreverse) 指令：

* ProxyPass：将一个远端服务器映射到本地服务器的URL空间中
* ProxyPassReverse：调整由反向代理服务器发送的HTTP回应头中的URL

保存，重启 apache2。

到这里，我们就可以通过直接访问 ```http://127.0.0.1/api```来代理远程服务器的 api 接口了，从而解决了跨域的问题。

___

相关问题：[使用 nginx 作为代理服务器轻松解决 Ajax 跨域问题](/2012/08/01/the-use-of-nginx-as-a-proxy-server-easily-solve-the-cross-domain-ajax-problem)
