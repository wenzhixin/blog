---
title: Ubuntu 无法找到更新源的问题
date: 2014-07-21 00:00:00
categories: [操作系统]
tags: [Ubuntu,更新源]
---

### 问题：

前段时间，Ubuntu 官方源已经停止了对非长期维护版（如 11.10，12.04，12.10 和 13.04）的支持，并且从归档服务器上移除了这些版本信息，导致无法更新软件和安装不了新软件。例如使用 apt-get update, apt-get upgrade, apt-get install 都无法正常工作。

### 解决方法

最好的办法是，升级系统到最新的版本（或者重装），例如升级到 14.04。但是有时候会觉得升级或者重装会很麻烦（说到底是懒），那么可以使用旧源 [http://old-releases.ubuntu.com](http://old-releases.ubuntu.com) 进行更新。

方法如下：

* 使用```sed```命令：
```
sudo sed -i -e 's/archive.ubuntu.com\|security.ubuntu.com/old-releases.ubuntu.com/g' /etc/apt/sources.list
```

* 或者使用```vim```编辑替换：
```
sudo vi /etc/apt/sources.list
:%s/archive.ubuntu.com\|security.ubuntu.com/old-releases.ubuntu.com/g
```

更新：
```
sudo apt-get update
sudo apt-get upgrade
```