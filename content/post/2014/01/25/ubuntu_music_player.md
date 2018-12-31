---
title: Ubuntu 下安装音乐播放器
date: 2014-01-25 00:00:00
categories: [操作系统]
tags: [Ubuntu,音乐播放器]
---

对于喜欢听歌的人来说，音乐播放器还是挺重要的，
但是不像 windows 一样，很多流行的播放器都没有 ubuntu 版。

这里记录下安装 Audacious 播放器，还是比较强大的，可以支持 ape 格式的。

![](/2014/01/25/1.png)

**安装：**
```
sudo add-apt-repository ppa:nilarimogard/webupd8
sudo apt-get update
sudo apt-get install audacious audacious-plugins
```

当然歌词显示也是很有必要的，使用 [osd-lyrics](https://code.google.com/p/osd-lyrics/)

**安装：**
```
sudo add-apt-repository ppa:osd-lyrics/ppa
sudo apt-get update
sudo apt-get install osdlyrics
```
