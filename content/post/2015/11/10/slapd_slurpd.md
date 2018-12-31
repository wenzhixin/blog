---
title: ldap 管理指南
date: 2015-11-10
categories: [操作系统]
tags: [ldap, slapd, slurpd, gosa]
---

### 1. slapd 和 slurpd 介绍

本章介绍如何编译、配置和运行独立的 LDAP 守护进程（slapd）和独立的更新复制守护进程（slurpd），该内容主要是针对系统管理员。

#### 1.1 什么是目录服务

目录服务（英语：Directory service）是一个储存、组织和提供信息访问服务的软件系统，在软件工程中，一个目录是指一组名字和值的映射。它允许根据一个给出的名字来查找对应的值，与词典相似。像词典中每一个词也许会有多个词义，在一个目录中，一个名字也许会与多个不同的信息相关联。类似地，就像一个词会有多个不同的发音和多个不同的词义，目录中的一个名字可能会有多个不同类型的值。

目录也许只提供范围非常小的节点类型和数值类型，也可能对任意的或可扩展的一组类型提供支持。在一个电话目录中，节点就是姓名而数值项就是电话号码。在DNS中，节点是域名而数值项是IP地址（还有别名，邮件服务器名等等）。在一个网络操作系统的目录中，节点是那些由操作系统所管理的资源，包括用户、计算机、打印机和其它共享资源。互联网问世以来，有许多目录服务得到应用，但是本文主要关注那些源自X.500的目录服务。

目录服务遵循LDAP和X.500协议。目录服务的一个最常用例子是DNS服务。微软的Active Directory是目录服务的一个著名实现。

#### 1.2 什么是 LDAP

轻型目录访问协议（英文：Lightweight Directory Access Protocol，缩写：LDAP）是一个开放的，中立的，工业标准的应用协议，通过IP协议提供访问控制和维护分布式信息的目录信息。 目录服务在开发内部网和与互联网程序共享用户、系统、网络、服务和应用的过程中占据了重要地位。例如，目录服务可能提供了组织有序的记录集合，通常有层级结构，例如公司电子邮件目录。同理，也可以提供包含了地址和电话号码的电话簿。

#### 1.3 LDAP 是如何工作的

LDAP目录的条目（entry）由属性（attribute）的一个聚集组成，并由一个唯一性的名字引用，即专有名称（distinguished name，DN）。例如，DN能取这样的值：“ou=groups,ou=people,dc=scutech,dc=com”。

```
         dc=com

      |dc=scutech
       /          \
 ou=people     ou=groups
```

LDAP目录与普通数据库的主要不同之处在于数据的组织方式，它是一种有层次的、树形结构。所有条目的属性的定义是对象类object class的组成部分，并组成在一起构成schema；那些在组织内代表个人的schema被命名为white pages schema。数据库内的每个条目都与若干对象类联系，而这些对象类决定了一个属性是否为可选和它保存哪些类型的信息。属性的名字一般是一个易于记忆的字符串，例如用cn为通用名（common name）命名，而"mail"代表e-mail地址。属性取值依赖于其类型，并且LDAPv3中一般非二进制值都遵从UTF-8字符串语法。例如，mail属性包含值 `user@example.com`；jpegPhotos属性一般包含JPEG/JFIF格式的图片。

#### 1.4 什么是 slapd

Slapd 是 LDAP 的独立服务，可以在不同的 UNIX 系统下运行，你可以将其作为自己的目录服务器。Slapd 包含很多特性和功能：
* 可选数据库：LDBM，基于磁盘的高性能数据库；SHELL，一个可以任意操作 UNIX 命令和 shell 脚本的数据库；PASSWD，简单的密码文件数据库。
* 支持多个数据库实例
* 通用的数据库接口
* 权限访问控制
* 多线程
* 可复制

#### 1.5 什么是 X.500 协议

X.500是计算机目录服务的标准系列。最早是ITU-T X.500开发，前身为CCITT的，并于1988年首次批准，此一目录可以成为全球目录的一部分。

X.500协议包括：

* DAP (Directory Access Protocol)
* DSP (Directory System Protocol)
* DISP (Directory Information Shadowing Protocol)
* DOP (Directory Operational Bindings Management Protocol)

#### 1.6 什么是 slurpd

Slurpd 是一个提供复制服务的 UNIX 进程，它负责分发到主 slapd 更改数据库的各种 slapd 的副本。

### 2. 安装配置 slapd

#### 2.1 安装 slapd 和 ldap-utils

这里以 ubuntu 为例，说明如何安装和配置 slapd，通过 apt-get 来进行安装

```
sudo apt-get install slapd ldap-utils
```

#### 2.2 新增配置文件

```
sudo vi /etc/ldap/slapd.conf
```
```
database ldbm
suffix  "dc=scutech,dc=com"
rootdn "cn=admin, dc=scutech,dc=com"
rootpw secret
directory "/var/lib/ldap"
```

重启 slapd
```
sudo service slapd restart
```

查询数据
```
ldapsearch -x -LLL -b dc=scutech,dc=com
```

可以看到我们添加的 admin 的数据
```
dn: dc=scutech,dc=com
objectClass: top
objectClass: dcObject
objectClass: organization
o: scutech.com
dc: scutech

dn: cn=admin,dc=scutech,dc=com
objectClass: simpleSecurityObject
objectClass: organizationalRole
cn: admin
description: LDAP administrator
```

#### 2.3 新增用户
```
vi my.ldif
```
```
dn: dc=scutech,dc=com
o: scutech.com
objectclass: organization

dn: cn=admin, dc=scutech,dc=com
cn: zhixin
sn: wen
mail: wenzhixin2010@gmail.com
objectclass: person
```
这里可以包含任何想要的属性值

```
ldapadd -cx -D cn=admin,dc=scutech,dc=com -w password -f my.ldif
```
