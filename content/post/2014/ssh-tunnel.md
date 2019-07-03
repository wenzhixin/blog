---
title: ssh tunnel（隧道）
date: 2014-03-15
categories: [操作系统]
tags: [ssh,tunnel]
---

### 问题描述：

公司内部机器限制了登录，只能通过某台指定的机器才能上网，我们这里叫做中转服务器。
例如邮件服务器，而一般中转服务器是 linux 系统。
你想要登录到内部的机器，只能通过 ssh 登录到邮件服务器，然后在 ssh 登录到内部的机器。
如果内部的机器是 windows 系统，或者还需要传输文件，会变的相当的麻烦：

* 两次登录

* 不能开图形界面

* 需要在中转服务器中安装额外的软件

* 文件传输受限于中转服务器的存储空间

### 问题解决：

使用强大的 ssh tunnel（隧道），就可以通过一次 ssh 进行远程端口的映射，从而完成以上麻烦的步骤。
```
ssh -fN -L local_port:remote_host:remote_port bridge_user@bridge_host
```

**参数：**

* -fN：表示在后台运行 ssh 并不执行远程命令

* -L：表示使用 ssh tunnel 将远程端口映射到本地

* local_port：本地的端口

* remote_host：远程服务器的地址

* remote_port：远程服务器的端口

* bridge_user：中转服务器的用户名

* bridge_host：中转服务器的地址

例如，我们需要访问的内部机器的IP为：192.168.1.10，为windows，开启了远程桌面（端口为3389），
中转服务器的地址为：zhixin@mail.wenzhixin.net.cn，那么我们使用以下命令：

```
ssh -fN -L 3389:192.168.1.10:3389 zhixin@mail.wenzhixin.net.cn
```

即可将远程服务器的 3389 映射到本地中，现在要登录远程服务器，只需要使用登录到 127.0.0.1:3389 即可。
