---
title: Oracle 获取DDL语句入门小记
date: 2014-02-13
categories: [数据库]
tags: [Oracle,DDL]
---

### sqlplus 登录

在操作系统命令行下：

**方法1：**
```
sqlplus / as sysdba #这是典型的操作系统认证，不需要listener进程
sqlplus system/password as sysdba #这种连接方式只能连接本机数据库，同样不需要listener进程
```

**方法2：**
```
sqlplus /nolog
CONNECT username/password@host[:port][/service_name]
```

### 查看当前用户
```
select user from dual;
```

### 查看 databases
```
select name from v$database;
```

### 查看 tables
```
select owner, table_name from dba_tables;
select owner, table_name from all_tables; # do not have access dba_tables;
select table_name from user_tables; # you own
```

### 获取一个SCHEMA下的所有建表、视图和建索引的语法

```
set pagesize 0
set long 90000
set feedback off
set echo off
spool schema.sql
select dbms_metadata.get_ddl('TABLE', u.table_name) from user_tables u;
select dbms_metadata.get_ddl('VIEW', u.VIEW_name) from user_views u;
select dbms_metadata.get_ddl('INDEX', u.index_name) from user_indexes u;
spool off;
```

### 获取单个的建表、视图和建索引的语法

```
set pagesize 0
set long 90000
set feedback off
set echo off
spool <table_name>.sql
select dbms_metadata.get_ddl('TABLE', '<table_name>', '<SCHEMA>') from dual;
select dbms_metadata.get_ddl('VIEW', '<view_name>', '<SCHEMA>') from dual;
select dbms_metadata.get_ddl('INDEX', '<index_name>', '<SCHEMA>') from dual;
spool off;
```

### 获取某个 SCHEMA 的建全部存储过程的语法

```
set pagesize 0
set long 90000
set feedback off
set echo off
spool procedures.sql
select dbms_metadata.get_ddl('PROCEDURE', u.object_name)
from user_objects u
where object_type = 'PROCEDURE';
spool off;
```

### 获取指定名称的建存储过程的语法

```
set pagesize 0
set long 90000
set feedback off
set echo off
spool <Procedure_Name>.sql
select text
from all_source
where name= '<procedure_name>';
spool off;
```
