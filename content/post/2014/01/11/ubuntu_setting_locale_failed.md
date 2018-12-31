---
title: ubuntu 解决语言设置错误的问题
date: 2014-01-11 00:00:00
categories: [操作系统]
tags: [ubuntu,locale]
---

在使用 ubuntu 命令行登录的时候，出现：
```
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
    LANGUAGE = (unset),
    LC_ALL = (unset),
    LC_MESSAGES = "zh_CN.UTF-8",
    LANG = "zh_CN.UTF-8"
    are supported and installed on your system.
perl: warning: Falling back to the standard locale ("C").
```
这样的错误，虽说不影响使用，但是感觉挺烦的说。

那么要如何解决呢，有必要记录下：

**安装 localepurge 管理语言文件**
```
sudo apt-get install localepurge
```

选择我们想要的语言，例如 en_US.UTF-8 和 zh_CN.UTF-8。

当然也可以使用以下命令再次进行**配置**：
```
sudo dpkg-reconfigure localepurge
```

**生成自己想要的语言**
```
sudo locale-gen zh_CN.UTF-8 en_US.UTF-8
```

**打印出当前的配置信息**
```
locale
```

到此，搞定！！！

默认情况下终端 ssh 的时候会将本地的 locale 传到服务器中，可以通过命令**指定 ssh 服务器的语言**：
```
LC_ALL=en_US.UTF-8 ssh <host>
```