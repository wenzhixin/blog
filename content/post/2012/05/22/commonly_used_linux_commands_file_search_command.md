---
title: linux常用命令——文件搜索命令
date: 2012-05-22
categories: [后台技术]
tags: [linux]
---

命令：which / whereis

功能：显示系统命令所在目录

权限：所有用户

语法：which / whereis [命令名称]

___

命令：find

功能：查找文件或目录

权限：所有用户

语法：find [搜索路径][搜索关键字]

选项：-name [\*?] 根据文件名称来查找

-type [fd] 根据类型来查找

-size [+-] 根据文件大小来查找

-user username 查找所有者为 username 的文件

-ctime/-atime/-mtime [+-]
根据修改属性时间/访问时间/修改内容时间来查找

连接符：-a and 逻辑与

  -o or 逻辑或

  -exec 命令 {} \\; 将查找结果作为命令的参数，不做确认

  -ok 命令 {} \\; 将查找结果作为命令的参数，需要确认

例子：find /home/wenyi/ -name test\* -a -type d chmod 775 {} \\;

find /home/wenyi/ -name test\* -a -type f chmod 664 {} \\;

说明：\* 匹配 0 个或多个字符，? 匹配一个字符。

f 表示文件，d 表示文件夹

\+ 表示大于，- 表示小于。

___

命令：locate (list files in database)

功能：根据文件数据库信息查找文件或目录

权限：所有用户

语法：locate [文件名]

说明：因为是根据文件数据库来查找，速度快，但是数据有时不够准确

___

命令：updatedb (update the slocate datenbase)

功能：建立整个系统目录文件数据库

权限：所有用户

语法：updatedb

___

命令：grep

功能：在文件中搜寻字符串匹配的行并输出

权限：所有用户

语法：grep [指定字符串][目标目录]

说明：grep 使用很广，常常作为管道连接符使用
