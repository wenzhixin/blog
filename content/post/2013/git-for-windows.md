---
title: git for windows 安装和配置
date: 2013-01-04
categories: [操作系统]
tags: [git,windows]
---

#### 1. 安装 msysgit:

[msysgit](http://msysgit.github.com/)

#### 2. 配置用户信息和 alias

gitconfig

	[user]
		name = zhixin
		email = wenzhixin2010@gmail.com
	[alias]
		co = checkout
		ci = commit -a
		st = status
		br = branch
		oneline = log --pretty=oneline --since='2 days ago'
		onelog = log -p -1
