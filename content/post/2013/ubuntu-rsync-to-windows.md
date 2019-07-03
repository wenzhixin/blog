---
title: 从 ubuntu 同步文件到 windows
date: 2013-12-01
categories: [操作系统]
tags: [ubuntu,rsync,windows]
---

windows 下使用 cwRsync，ubuntu 使用默认的 rsync。

### 安装 cwRsync

下载 [cwRsync 服务端](https://www.itefix.no/i2/cwrsync)

解压并安装到指定目录，例如：E:\Program Files\ICW

### 配置 cwRsync

修改 rsyncd.conf
```
use chroot = false
strict modes = false
hosts allow = *
log file = rsyncd.log
auth users = backup
secrets file = rsyncd.secrets
transfer logging = yes

uid = 0
gid = 0
charset = UTF-8
read only = false

# Module definitions
# Remember cygwin naming conventions : c:\work becomes /cygwin/c/work
#
[backup]
path = /cygdrive/e/rsync
read only = false
transfer logging = yes
```

新建 rsyncd.secrets，指定用户名和密码
```
backup:password
```

启动 RsyncServer 服务（运行——services.msc）

### 同步文件(ubuntu)

```
rsync -av file username@ip::moduleName
```
* file：对应需要同步的文件或者文件夹
* username：对应配置的用户名（backup）
* ip：对应 windows 服务器的 IP
* moduleName：对于配置中 Module 的名字（backup）

### 其他问题

* 默认端口为 873（netstat -nao 查看是否已在监听）
* 查看服务 RsyncServer 是否启动
