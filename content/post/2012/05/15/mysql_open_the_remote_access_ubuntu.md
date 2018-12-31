---
title: MySQL、Postgres 开启远程访问权限（ubuntu）
date: 2012-05-15 00:00:00
categories: [数据库]
tags: [MySQL,远程访问权限]
---

### MySQL

1、编辑 my.cnf 文件：
```
sudo vi /etc/mysql/my.cnf
```

2、将绑定地址行注释掉或者修改为指定 IP
```
#bind-address = 127.0.0.1
```

3、登录 MySQL：
```
mysql -uroot -p123
```

4、添加 root 用户访问权限
```
grant all privileges on *.* to 'root'@'%' identified by '123';
flush privileges;
```

5、查看 user 权限，成功修改权限为 %：
```
select host,user from mysql.user;

+------------+----------------+
| host       | user           |
+------------+----------------+
| %          | root           |
| 127.0.0.1  | root           |
| localhost  | root           |
+------------+----------------+
```

6、重启 MySQL：
```
sudo /etc/init.d/mysql restart
```

### Postgres

1、编辑 postgresql.conf 文件：
```
sudo vi /etc/postgresql/9.4/main/postgresql.conf

# 增加
listen_addresses = '*'
```

2、编辑 pg_hba.conf 文件：
```
sudo vi /etc/postgresql/9.4/main/pg_hba.conf

# 修改
#host    all             all             127.0.0.1/32            md5
host    all             all             0.0.0.0/0               md5
```

3、重启 Postgres
```
sudo service postgresql restart
```
