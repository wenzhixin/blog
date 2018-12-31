---
title: Ubuntu 终端下使用 sshproxy 代理
date: 2013-01-23 20:43:00
categories: [操作系统]
tags: [sshproxy]
---

#### 1. 安装 tsocks

	sudo apt-get install tsocks
	
#### 2. 修改配置信息

	sudo vi /etc/tsocks.conf
	
找到最后几行，修改
	
	server = 192.168.0.1
	server_port = 1080

为

	server = 127.0.0.1
	server_port = 12345
	
#### 3. 使用代理（命令前加上 tsocks）

	tsocks wget https://github.com
	tsocks git clone / push / pull ...

___

#### 可能遇到的问题

* 问题：
tsocks server is not on a local subnet

* 解决：
将 /etc/tsocks.conf 中的 local = 192.168.0.0/255.255.255.0 改成与设置的 server 同网段
	
___
	
设置 sshproxy 篇：
[Ubuntu 设置 sshproxy 代理](/2012/10/24/ubuntu_sshproxy)
