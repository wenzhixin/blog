---
title: Temporary Tablespace is Empty 解决方法（ORA-25153）
date: 2014-04-28
categories: [数据库]
tags: [Oracle,25153]
---

### 问题：

当我们对 Oralce 数据库进行操作的时候，出现了：
```
ORA-25153: Temporary Tablespace is Empty
```
的错误，提示 temporary 表空间为空。

### 思路：

* 当前用户没有设置表空间权限
* 表空间状态为 offline
* 当前用户没有指定表空间文件

### 解决：

#### 1. 查看当前用户

```sql
SQL> show user;

USER is "SYS"
```

#### 2. 查看当前用户是否已经设置了表空间权限

```sql
SQL> select username,temporary_tablespace from dba_users where username='sys';

USERNAME                       TEMPORARY_TABLESPACE
------------------------------ ------------------------------
SYS                            TEMP
```

假如为空，我们需要增加权限：

```sql
SQL> alter user sys temporary tablespace temp;
```

#### 3. 查看表空间状态

```sql
SQL> select tablespace_name, status from dba_tablespaces where tablespace_name='temp';

TABLESPACE STATUS
---------- ---------
TEMP       ONLINE
```

假如为 OFFLINE，我们需要改为 ONLINE：

```sql
SQL> alter tablespace temp online;
```

#### 4. 查看当前用户是否指定表空间文件

```sql
SQL> select tablespace_name, file_name from dba_temp_files;

TABLESPACE FILE_NAME
---------- --------------------------------------------------
TEMP       /opt/oracle/oradata/orcl/temp01.dbf
```

假如为空，我们需要先查看文件是否存在（windows 下为安装目录下的 oradata/orcl/temp01.dbf）：

```shell
ls /opt/oracle/oradata/orcl/temp01.dbf

/opt/oracle/oradata/orcl/temp01.dbf
```

在增加表空间文件：

```sql
SQL> alter tablespace temp add tempfile '/opt/oracle/oradata/orcl/temp01.dbf';
```

搞定！！！
