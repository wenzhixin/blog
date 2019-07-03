---
title: lxc 小贴士：创建、自动启动、设置存放目录
date: 2015-03-04
categories: [操作系统]
tags: [lxc]
---

平时使用 lxc 比较多，在这里记录下容易忘记的点。

### 创建

很简单，创建一个 ubuntu 系统（trusty），详细见[LXC简介](http://www.malike.net.cn/blog/2013/11/10/lxc-tutorial/)。

创建文件：`vi trusty.conf`：

```bash
lxc.network.type = veth
lxc.network.flags = up
lxc.network.name = eth0
lxc.network.link = lxcbr0
```

```bash
sudo MIRROR="http://ftp.cuhk.edu.hk/pub/Linux/ubuntu" \
     SECURITY_MIRROR="http://ftp.cuhk.edu.hk/pub/Linux/ubuntu" \
     lxc-create -n trusty -f trusty.conf -t ubuntu -- -r trusty
```

接着，启动 lxc：
```bash
lxc-start -d -n trusty
```

这里的参数 `-d` 是必要的，表示以 daemon 的方式运行。

所有的 lxc 容器创建后的默认用户名密码为：ubuntu。

### 自动启动

我想让我的 lxc 容器自动启动，可以通过编辑 `/var/lib/lxc/[container_name]/config` 文件：
```bash
# Autostart
lxc.start.auto = 1
lxc.start.delay = 5
```

这里假如有多个容器的话会等待 5 秒。

### 设置存放目录

由于 lxc 默认的存放目录为 `/var/lib/lxc`，很容易导致 `/` 容量不足，这里可以通过软链接的方式进行设置：
```bash
sudo mv /var/lib/lxc ~/lxc
ln -s ~/lxc /var/lib/lxc
```
