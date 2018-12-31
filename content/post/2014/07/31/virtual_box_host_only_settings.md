---
title: VirtualBox 设置 Host-Only 上网
date: 2014-07-31 15:33:00
categories: [操作系统]
tags: [VirtualBox,Host-Only]
---

我们平时在使用 VirtualBox 虚拟机的时候，工作场所内部网和家里内部网的网段不相同，使用 DHCP 获取 IP 地址的方式导致虚拟机的地址会经常改变，从而不方便使用，特别是使用 ssh 配置 key 连接到虚拟机的方式。

参考文章[Ubuntu 11.10 VirtualBox 的 Host-only 网卡上外网和 DHCP 永久地址](http://www.malike.net.cn/blog/2011/12/20/vbox-hostonly-dhcp/)，我们可以设置固定的 IP 地址，例如：```192.168.56.101```，但是却不能解决上外网的问题。

于是，想实现虚拟机上网，可以为虚拟机再添加一块网卡，通过 NAT 方式，轻松达到连接外网的效果，具体步骤如下：

#### 1. 为 VirtualBox 添加虚拟网卡，连接方式为 NAT：

![](/2014/07/31/1.png)

#### 2. 启动添加的网卡：

```sh
sudo ifconfig eth1 up
sudo dhclient eth1
```

#### 3. 修改配置信息并重启：

```sh
sudo vim /etc/network/interfaces
```

```sh
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface (Host-only)
auto eth0
iface eth0 inet dhcp

# The second network interface (NAT)
auto eth1
iface eth1 inet dhcp
```

```sh
sudo /etc/init.d/networking restart
```
