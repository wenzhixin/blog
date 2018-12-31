---
title: Ubuntu 安装配置 vim
date: 2013-03-26 16:57:00
categories: [操作系统]
tags: [vim]
---

#### 安装

    sudo apt-get install vim

#### 配置

    sudo vi ～/.vimrc
    
内容（显示行数、不备份）：

	source $VIMRUNTIME/vimrc_example.vim
	set nu
	set nobackup
	
___ 

资料：[简明 Vim 练级攻略](http://coolshell.cn/articles/5426.html)