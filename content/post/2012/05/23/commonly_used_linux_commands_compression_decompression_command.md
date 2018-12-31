---
title: linux常用命令——压缩解压命令
date: 2012-05-23
categories: [后台技术]
tags: [linux]
---

命令：gzip (GNU zip)

功能：压缩文件

权限：所有用户

语法：gzip 选项[文件]

压缩后格式：.gz

说明：只能压缩文件，不保存源文件

___

命令：gunzip (GNU unzip)

功能：解压缩 .gz 的压缩文件

权限：所有用户

语法：gunzip 选项[压缩文件]

说明：只能解压文件

___

命令：tar

功能：压缩打包目录

权限：所有用户

语法：tar 选项[cvf][目录]

-c 产生 .tar 打包文件

-x 解包 .tar 文件

-v 显示详细信息

-f 指定压缩后/解压的文件名

-z 打包同时压缩/解压缩

压缩后格式：.tar.gz

例子：tar -cvfz file.tar.gz dir

tar -xvfz file.tar.gz

___

命令：zip

功能：压缩文件或目录

权限：所有用户

语法：zip 选项[-r][压缩后文件名称][文件或目录]

-r 压缩目录

压缩后格式：.zip

___

命令：unzip

功能：解压 .zip 的压缩文件

权限：所有用户

语法：unzip [压缩文件]

说明：.zip 文件能与 windows 想兼容

___

命令：bzip2

功能：压缩文件

权限：所有用户

语法：bzip 选项[-k][文件]

-k 产生压缩文件后保留源文件

压缩后格式：.bz2

___

命令：bunzip2

功能：解压缩 .bz2 的文件

权限：所有用户

语法：bunzip2 选项[-k][压缩文件]

-k 解压缩后保留源文件
