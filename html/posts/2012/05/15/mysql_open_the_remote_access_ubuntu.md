## MySQL开启远程访问权限（ubuntu）

分类：数据库 | 标签：MySQL、远程访问权限 | 发布时间：2012-05-15 00:00:00

___

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