---
title: ubuntu 设置环境变量问题
date: 2014-02-17 00:00:00
categories: [操作系统]
tags: [ubuntu,环境变量]
---

开发的时候需要设置环境变量，但是发现设置了之后，每次重启却没有起作用。

首先，将环境加入

```
export PATH=${PATH}:$HOME/bin
```

到 ~/.bash_profile 文件中，运行

```
source ~/.bash_profile
```
即可让设置的环境变量生效。

但是为什么我每次重启就不起作用了呢，花了好些时间去找原因，
老大的一句话提醒了我，因为你是用 oh-my-zsh，怎么会一样呢？

是啊，恍然大悟，答案就是这么简单。。。

借此机会了解了这几个重要的文件：

* .bash_profile 是最重要的一个配置文件，它在用户每次登录系统时被读取，
里面的所有命令都会被 bash 执行。（在 Debian 中使用 .profile 文件代替 .bash_profile 文件。）

* .bashrc 文件在 bash shell 调用另一个 bash shell 时读取，
也就是在 shell 中再键入 bash 命令启动一个新 shell 时就会去读该文件。
这样可有效分离登录和子 shell 所需的环境。但一般来说都会在 .bash_profile 里调用
.bashrc 脚本以便统一配置用户环境。

* .bash_logout 是在退出shell时被读取。我们可把一些清理工作的命令放到这文件中。

而使用了 oh-my-zsh 之后，有相对应的文件：.zprofile、.zshrc 和 .zlogout

所以，只要在 .zprofile 中加入环境变量即可。