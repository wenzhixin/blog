## ubuntu 下 PostgreSQL 使用小记

分类：数据库 | 标签：PostgreSQL | 发布时间：2014-01-12 00:00:00

___

[PostgreSQL](http://zh.wikipedia.org/wiki/PostgreSQL) 是自由的对象-关系型数据库服务器（数据库管理系统）。

刚刚入门，记录下：

#### 安装

安装 PostgreSQL 的服务器和客户端：
```
sudo apt-get install postgresql postgresql-client
```

#### 服务

安装完成后 PostgreSQL 已经自动启动了，我们可以通过命令进行操作：
```
# 查看状态
sudo /etc/init.d/postgresql status

# 启动
sudo /etc/init.d/postgresql start

# 停止
sudo /etc/init.d/postgresql stop

# 重启
sudo /etc/init.d/postgresql restart
```

#### 创建新用户

创建数据库用户 root，并指定其为超级用户：
```
sudo -u postgres createuser --superuser root
```

登录数据库控制台，设置 root 用户的密码，退出控制台：
```
sudo -u postgres psql
\password root
\q
```

\password user：表示设置用户的密码

#### 创建数据库

创建 test 数据库，指定用户为 root：
```
sudo -u postgres createdb -O root test
```

也可以删除不需要的数据库，如：
```
sudo -u postgres dropdb test
```

#### 登录数据库

使用 psql 命令：
```
psql -U root -d test -h 127.0.0.1 -p 5432
```

-U 指定用户，-d 指定数据库，-h 指定服务器，-p 指定端口。

实际的使用中，我们创建用户名和数据库跟系统名称一样（系统认证），然后通过：
```
psql
```
即可登录我们指定的数据库。

也可以通过环境变量指定默认的数据库（test）：
```
export PGDATABASE=test
```

#### 常用控制台命令

```
\h：查看SQL命令的解释，比如\h select。
\?：查看psql命令列表。
\l：列出所有数据库。
\c [database_name]：连接其他数据库。
\d：列出当前数据库的所有表格。
\d [table_name]：列出某一张表格的结构。
\du：列出所有用户。
\e：打开文本编辑器。
\conninfo：列出当前数据库和连接的信息。
```

#### 数据库操作

数据库操作为普通的 SQL，不过有 PostgreSQL 自己的语法，详细见文档说明。

创建表：
```
create table user (
	id serial primary key,
	username varchar(20),
	password varchar(20)
);
```

插入数据：
```
insert into user(username, password) values('admin', 'admin');
```

查询数据：
```
select * from user;
```