---
title: VirtualBox 安装 Mac OS X 10.9 Mavericks 小记
date: 2014-02-10
categories: [操作系统]
tags: [OS,Mac]
---

### 1. 准备工作

安装虚拟机和下载需要的 [iso](http://pan.baidu.com/s/1hqebqYw)：

* 联想 Y470 I5、8G内存
* Ubuntu 12.10
* VirtualBox 虚拟机（4.3.6）
* HackBoot_Mav.iso
* OSXMavericks2.iso

### 2. 新建 Mac 虚拟机

跟着新向导一步一步即可

![](/2014/02/10/images/1.png)

![](/2014/02/10/images/2.png)

![](/2014/02/10/images/3.png)

![](/2014/02/10/images/4.png)

![](/2014/02/10/images/5.png)

![](/2014/02/10/images/6.png)

### 3. 设置虚拟机

去掉 启用 EFI 选项

![](/2014/02/10/images/7.png)

处理器选择 2 核

![](/2014/02/10/images/8.png)

启用 3D 加速

![](/2014/02/10/images/9.png)

设置存储，加入 HackBoot_Mav.iso

![](/2014/02/10/images/10.png)

### 4. 安装 Mac 系统

启动界面

![](/2014/02/10/images/11.png)

选择菜单中的设备——分配光驱——OSXMavericks2.iso，按 F5 界面会变成

![](/2014/02/10/images/12.png)

按 Enter 开始安装

![](/2014/02/10/images/13.png)

选择语言，继续

![](/2014/02/10/images/14.png)

![](/2014/02/10/images/15.png)

选择实用工具——磁盘工具

![](/2014/02/10/images/16.png)

名称处输入——Mavericks——选择抹掉

![](/2014/02/10/images/17.png)

开始安装

![](/2014/02/10/images/18.png)

![](/2014/02/10/images/19.png)

安装完成，强制退出

![](/2014/02/10/images/20.png)

### 5. 安装内核扩展

选择 HackBoot_Mav.iso 重新启动

![](/2014/02/10/images/21.png)

选择菜单中的设备——分配光驱——OSXMavericks2.iso，按 F5 界面会变成

![](/2014/02/10/images/22.png)

再次进入安装系统，这次选实用工具——终端

![](/2014/02/10/images/23.png)

依次输入命令：
```
umount /Volumes/Mavericks
hdiutil attach /dev/disk0s2 -mountpoint /Volumes/mnt
cp -rp /Backup/Kexts/ElliottForceLegacyRTC.kext /Volumes/mnt/System/Library/Extensions
cp -rp /Backup/Kexts/FakeSMC.kext /Volumes/mnt/System/Library/Extensions
cp -rp /Backup/Kexts/NullCPUPowerManagement.kext /Volumes/mnt/System/Library/Extensions
chmod -R 0755 /Volumes/mnt/System/Library/Extensions/ElliottForceLegacyRTC.kext
chmod -R 0755 /Volumes/mnt/System/Library/Extensions/FakeSMC.kext
chmod -R 0755 /Volumes/mnt/System/Library/Extensions/NullCPUPowerManagement.kext
hdiutil detach /Volumes/mnt
```

安装内核扩展，退出终端后, 等待虚拟机的硬盘指示灯熄灭，强制退出

![](/2014/02/10/images/24.png)

### 6. 完成安装

选择 HackBoot_Mav.iso 重新启动，选择 Mavericks，Enter

![](/2014/02/10/images/25.png)

![](/2014/02/10/images/26.png)

设置登录帐号，其他的不注册，不发送

![](/2014/02/10/images/27.png)

大功告成

![](/2014/02/10/images/28.png)

![](/2014/02/10/images/29.png)
