---
title: 搭建小型下载服务器(raspberry pi)
date: 2013-07-01 21:23:00
categories: [后台技术]
tags: [raspberry pi,服务器]
---

#### 1. 购买设备

1) 单板机：我购买的是树莓派raspberry pi B型 512MB，购买地址为（我是在淘宝上购买的，声明不是广告哦）：
[官方地址](http://cn.element14.com/jsp/search/productdetail.jsp?sku=2191863)
[淘宝地址](http://item.taobao.com/item.htm?spm=a1z09.5.0.39.DeSxZD&id=22893320935)

2) SD 卡：推荐 8G 内存

3) 电源：可以使用安卓手机的电源，2000mA / 5V 的就OK了

#### 2. 下载系统

下载地址：[http://www.raspberrypi.org/downloads](http://www.raspberrypi.org/downloads)

我下载的是 Raspbian “wheezy”，使用跟 ubuntu 差不多，推荐使用

#### 3. 安装系统，设置固定 IP

1) 接上和拔下 SD 卡，通过命令确认 SD 卡的设备号

	sudo fdisk -l

2) 解压下载的镜象

3) 用dd命令把镜象文件写入到SD卡，设备块名是/dev/mmcblk0p1，请改为自己对应的设备名称

**警告！这步将会擦除SD卡内的数据，如果选择了错误的存储设备，会导致硬盘数据丢失。**

	dd if=wheezy-raspbian.img of=/dev/mmcblk0p1 bs=512k
	
4) 设置固定 IP

	sudo vi /etc/network/interfaces
	
将内容

	iface eth0 inet dhcp
	
改为

	iface eth0 inet static
	address 192.168.1.10 (此处 192.168.1.10 为分配的固定 ip)
	netmask 255.255.255.0
	gateway 192.168.1.1
	dns-nameservers 192.168.1.1
	
重启服务

	sudo /etc/init.d/networking restart

#### 4. 挂载移动硬盘

1) 安装 ntfs-3g

	sudo apt-get install ntfs-3g

2) 使用命令查找设备号 

	sudo fdisk -l
	
3) 创建挂载目录

	sudo mkdir /media/usb1
	
4) 挂载硬盘，/dev/sda5 为移动硬盘设备号

	sudo mount -t ntfs-3g /dev/sda5 /media/usb1
	
5) 设置开机自动加载

	sudo vi /etc/fstab
	
加入内容

	/dev/sda5      /media/usb1           ntfs-3g defaults         0       0

#### 5. 安装 web 服务器

使用 nginx 作为 web 服务器

	sudo apt-get install nginx

#### 6. 安装下载工具

使用 aria2 作为下载工具

	sudo apt-get install aria2
	
启动服务

	aria2c --enable-rpc --rpc-listen-all &

#### 7. 搭建下载管理系统

使用 [webui-aria2](https://github.com/ziahamza/webui-aria2) 作为管理界面

下载 [webui-aria2](https://github.com/ziahamza/webui-aria2/archive/master.zip) 
并解压到 nginx 的 www 目录下即可 /usr/share/nginx/www/

#### 8. 浏览器访问并设置下载目录

访问： http://192.168.1.10/webui-aria2 

通过 Settings 设置下载目录为移动硬盘，便可以开始使用我们的小型服务器啦！