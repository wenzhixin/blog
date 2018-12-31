---
title: windows7 下 Bad owner or permissions 问题
date: 2014-01-15 00:00:00
categories: [操作系统]
tags: [windows7,rsync]
---

**问题：**

ssh 或者 rsync 的时候出现以下错误：
```
Bad owner or permissions on ~/.ssh/config
```

**原因：**

权限问题，需要将配置文件和 key 文件修改成当前用户和 600

**解决：**

下载 [chown.zip](/2014/01/15/chown.zip)，

解压放到 C:\Program Files\cwRsync\bin 下，在 cmd 下：

```
cd C:\Program Files\cwRsync\home\.ssh

chmod 600 config id_rsa
chown user config id_rsa
```

命令解释：

* chmod：改变文件权限为当前用户可读写
* chown：改变文件所属用户为 user，用户名为计算机用户，查看：C:\Users 可以看到
