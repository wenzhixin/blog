---
title: 虚拟机安装 Android_x86 系统，用于开发、测试 Android 程序
date: 2012-06-02 00:00:00
categories: [移动开发]
tags: [android,android_x86]
---

#### 1、下载镜像：

从 http://www.android-x86.org/download 下载 android_x86 iso 镜像（例如 android-x86-2.3-RC1-eeepc.iso）

#### 2、安装系统：

使用虚拟机 VirtualBox 来安装系统，步骤如下：

（1）选择目标 OS：Linux

（2）目标 OS 版本：others

（3）内存：512MB

（4）硬盘：VDI drive，动态大小，1GB

（5）启动并选择下载的 iso 镜像文件

（6）从 boot 菜单中选择 install to hard disk（安装到硬盘）。

（7）创建一个新的分区，格式化为 ext3 格式，并选择该分区进行系统安装

#### 3、添加手机分辨率模式：

在终端下输入：

（1）VBoxManage setextradata "android2.3" "CustomVideoMode1" "320x480x16"

（2）VBoxManage setextradata "android2.3" "CustomVideoMode2" "480x800x16"

#### 4、修改 Android 系统的 Grub 配置：

（1）启动 Android 系统并选择 Debug mode（调试模式）

（2）修改 menu.lst 文件：

	mount -o remount,rw /mnt
	
	vi /mnt/grub/menu.lst

修改启动参数：

	androidboot_hardware=eeepc
	androidboot_hardware=generic_x86 

在 DPI=240 / DPI=160 后添加 

	UVESA_MODE=480x800/UVESA_MODE=320x480

（3）保存并重启系统

#### 5、AVD 和 Eclipse 连接到 Android 系统：

（1）进入命令行模式（Alt+F1），输入：netcfg 查看当前 IP 地址

（2）进入 android 的 platform-tools 目录，输入：./adb connect IP地址

（3）Eclipse 下，run 并选择该 Android 系统便可

___

ps：

（1）在 Android 系统屏幕上没有看到鼠标指针，可通过 VirualBox 菜单禁止 mouse integration（鼠标整合）( Host Key + I）

（2）"Windows 键"相当于 Android 的 Home 按钮

（3）"Esc" 相当于 Android 的 Back 

（4）按钮F2 相当于 Android 的 Menu 按钮

（5）F3 相当于 Android 的 Search 按钮

（6）Alt+F1 => 切换到控制台模式

（7）Alt+F7 => 切换到图形界面模式 
                                            