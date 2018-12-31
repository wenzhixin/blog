---
title: windows 下同步文件到远程服务器中
date: 2014-01-06 00:00:00
categories: [操作系统]
tags: [windows,ubuntu,rsync]
---

#### 安装 cwRsync

下载 [cwRsync 客户端](/2014/01/06/cwRsync_4.0.5_Installer.zip)

解压并安装到指定目录，例如：C:\Program Files\cwRsync

#### 配置环境变量：

系统变量 Path中后面加入 C:\Program Files\cwRsync\bin;

创建新的系统变量 HOME = C:\Program Files\cwRsync\home  (其实这个路径是告诉cygWin本地的home路径在哪里)

进入 cmd 中：
```
cd C:\Program Files\cwRsync\
mkdir home
cd home
mkdir .ssh
```

进入 C:\Program Files\cwRsync\home\\.ssh 下新建文件 config，输入以下信息
```
host server
	HostName ip.address
	User username
	IdentityFile ~/.ssh/id_rsa
```

#### 使用

```
rsync -vzr /cygdrive/c/blog/ server:~/blog
```

* -vzr：表示压缩
* /cygdrive/c/blog：表示需要同步的文件夹，对应c:\blog
* server：表示配置的远程服务器
* ~/blog：表示远程服务器的地址
