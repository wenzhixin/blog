---
title: 如何使用 python 连接 Oracle（网站）
date: 2014-08-04
categories: [数据库]
tags: [Oracle,python]
---

首先，由于网站部署在远程服务器的局域网上面，所以需要通过 [ssh tunnel（隧道）](/2014/03/15/ssh-tunnel) 的方式进行本地的映射，主要映射两个端口：

* Oracle 服务：```ssh -fN -L 1521:ip:1521 server```
* 远程桌面：```ssh -fN -L 3389:ip:3389 server```

python 连接 Oracle 主要使用 cx_Oracle。

### 步骤：

1. 下载 Instant Client Package - Basic 和 Instant Client Package - SDK 的 rpm 安装包：http://www.oracle.com/technetwork/topics/linuxx86-64soft-092277.html

2. 转换为 deb 包：

```
sudo apt-get install alien
sudo alien oracle-instantclient12.1-basic-12.1.0.2.0-1.x86_64.rpm
sudo alien oracle-instantclient12.1-devel-12.1.0.2.0-1.x86_64.rpm
```

3. 安装 deb 包：

```
sudo dpkg -i oracle-instantclient12.1-basic_12.1.0.2.0-2_amd64.deb
sudo dpkg -i oracle-instantclient12.1-devel_12.1.0.2.0-2_amd64.deb
```

4. 设置环境变量（加到 .bashrc 中）

```
export ORACLE_HOME=/usr/lib/oracle/12.1/client64/
export LD_LIBRARY_PATH=$ORACLE_HOME/lib
export NLS_LANG=AMERICAN_AMERICA.WE8ISO8859P1 # 设置 Oracle 编码，解决乱码问题
```

5. 安装 cx_Oracle：

```
sudo apt-get install python-dev python-pip
sudo env ORACLE_HOME=$ORACLE_HOME pip install cx_Oracle
```

6. 使用：

```
import cx_Oracle

conn = cx_Oracle.connect('user', 'password', '127.0.0.1/orcl')
cursor = conn.cursor()
cursor.execute('select * from table')
```

可能遇到的问题:

```
ImportError: libaio.so.1: cannot open shared object file: No such file or directory
```

解决:

```
sudo apt-get install libaio1 libaio-dev
```
