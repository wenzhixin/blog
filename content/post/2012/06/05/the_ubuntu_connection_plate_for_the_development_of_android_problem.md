---
title: ubuntu 连接平板进行 Android 开发的问题
date: 2012-06-05 00:00:00
categories: [移动开发]
tags: [Android]
---

ubuntu 下连接平板进行 Android 开发，在 eclipse 下会显示乱码(???)并无法使用，解决方法如下：

1、设置平板：

系统设置-应用程序-开发-USB调试，打勾该选项

2、在终端下输入：lsusb

找到平板电脑的相应信息：

	Bus 002 Device 036: ID 18d1:0002 Google Inc.

3、新建文件，添加以下内容（idVendor 对于相应的 ID 号）：

	sudo vi /etc/udev/rules.d/70-android.rules
	
	SUBSYSTEM=="usb", ATTR{idVendor}=="18d1", MODE="0666", GROUP="plugdev"

4、修改权限并重启udev：

	sudo chmod +x /etc/udev/rules.d/70-android.rules
	sudo /etc/init.d/udev restart

5、进入 platform-tools 目录，输入：
	./adb kill-server
	./adb devices
