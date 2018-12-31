---
title: Ubuntu 12.10 添加 node 应用为自启动服务
date: 2013-12-30
categories: [操作系统]
tags: [Ubuntu,node]
---

开发 node 应用之后，启动的方式一般是通过 ```node app``` 或者 ```node app &``` 来运行，
十分不方便，这里将以本 blog 应用为例介绍如何添加为自启动的服务。

**环境**

* 用户名：username
* blog 位置：/home/username/blog

首先服务名取为 blog：
```
sudo vi /etc/init/blog.conf
```

输入以下内容：
```
# blog

description "blog"

start on filesystem or runlevel [2345]
stop on runlevel [!2345]

setuid useranme
chdir /home/username/blog

respawn

exec /usr/bin/nodejs /home/useranme/blog/app.js
```

保存，便可以使用以下命令了：
```
sudo service blog start
sudo service blog restart
sudo service blog stop
sudo service blog status
```
