---
title: 管理 ubuntu 服务器用户
date: 2013-12-28
categories: [操作系统]
tags: [ubuntu,用户]
---

#### 前言

对于刚刚安装（或者购买）的服务器，一般只有 root 用户，那我们需要对其进行用户管理设置。

#### 创建新的用户

创建一个名为 username 的新用户（自己替换为想要的名字）

```
useradd -m username
```

-m, --create-home：表示创建 home 目录

为 username 用户设置密码（不在 useradd 中指定 -p 的方式）

```
passwd username
```

输入两次密码即可

将 username 用户加入 root 组

```
visudo
```

在 root 下面加入
```
root    	ALL=(ALL:ALL) ALL
username	ALL=(ALL) ALL
```

修改用户 sh 为 bash

```
vi /etc/passwd
```

将对应用户信息（一般为最后一行）改为
```
/home/username:/bin/bash
```

接下来退出 root 用户，使用我们新增的用户登录服务器（这一步比较重要，不然设置不对的话，下一步禁用了 root 之后就悲剧了）

#### 禁用 root 用户

由于 root 用户的权限比较可怕，为了安全起见，我们需要将 root 禁用

```
sudo vi /etc/passwd
```

将对应的信息（一般为第一行）改为
```
root:x:0:0:root:/root:/bin/false
```

#### 移动原来文件到用户目录下

查看原来 root 下的目录
```
sudo ls /root
```

移动到用户 home 目录
```
sudo mv /root/www ~/
```

修改文件属性
```
sudo chown -R username.username ~/www
```
