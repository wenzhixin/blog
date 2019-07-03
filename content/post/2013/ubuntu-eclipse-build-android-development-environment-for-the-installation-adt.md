---
title: Ubuntu 下 eclipse 搭建 Android 开发环境安装 ADT 的问题
date: 2012-04-10
categories: [移动开发]
tags: [android]
---

1、无法连接到 Repository： [https://dl-ssl.google.com/android/eclipse/](https://dl-ssl.google.com/android/eclipse/)
或者 [http://dl-ssl.google.com/android/eclipse/](http://dl-ssl.google.com/android/eclipse/)

解决：下载 zip 包进行本地安装（如：[ADT-18.0.0](http://dl.google.com/android/ADT-18.0.0.zip)）或者通过翻墙设置代理


2、长时间停留在 calculating requirements and
dependencies（计算需求和依赖性 ）

解决：把“Contact all update sites during install to find required
software”（寻找指定的软件前先访问所有更新站点）前面的勾去掉


3、在安装 ADT 时出现如下错误：

Cannot complete the install because one or more required items could not
be found.Software being installed: Android Development Tools
8.0.1.v201012062107-82219 (com.android.ide.eclipse.adt.feature.group
8.0.1.v201012062107-82219)Missing requirement: Android Development Tools
8.0.1.v201012062107-82219 (com.android.ide.eclipse.adt.feature.group
8.0.1.v201012062107-82219) requires 'org.eclipse.gef 0.0.0' but it could
not be found

原因：由 apt-get install eclipse 所安装的 eclipse
插件不全，导致缺少org.eclipse.wst.sse.core

解决：

（1）添加想对应 eclipse 版本的主要更新源，如：Indigo - http://download.eclipse.org/releases/indigo

（2）选择列表的最后一项 Web,XML,Java EE and OSGi Enterprise
Development，点击Next并安装


4、试用 adb 连接 android 的时候出现如下错误：

error while loading shared libraries: libncurses.so.5: wrong ELF class:
ELFCLASS64

解决：

（1）sudo apt-get install lib32ncurses5
