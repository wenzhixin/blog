## 简单的博客 RSS 聚合

分类：数据库 | 标签：RSS、聚合、数据库 | 发布时间：2013-11-04 01:00:00

___

#### 1. 前言

将博客的 RSS 内容聚合起来，这样方便查看，今天就来研究如何简单的将 RSS 的内容存到数据库（MySQL）中。

#### 2. 创建数据库表

	CREATE TABLE links (  
	    id int NOT NULL AUTO_INCREMENT,  
	    name varchar(250) NOT NULL,
	    url varchar(250) NOT NULL,
	    time timestamp NOT NULL DEFAULT current_timestamp,
	    PRIMARY KEY (id),
	    UNIQUE (url)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8;
	
数据库表只有名称和链接地址两个字段，这里的 url 是唯一的，可以防止插入重复的数据。

#### 3. 插入数据 INSERT IGNORE

INSERT IGNORE INTO 与 INSERT INTO 的区别是：
INSERT IGNORE 会忽略数据库中已经存在的数据。
如果数据库没有数据，就插入新的数据，
如果有数据的话就跳过这条数据。

例如我们连续插入数据：

	INSERT IGNORE INTO links(name, url) values('wenyi', 'http://wenzhixin.net.cn');
	
第一条是：

	Query OK, 1 row affected

其他的都是：

	Query OK, 0 rows affected
	
查看数据库，也是只有一条记录。

#### 4. 编写代码

使用 nodejs 来编写代码，主要涉及的是对 RSS 订阅源的解析以及将解析出来的文件写进数据库中。

* RSS 解析模块使用 [node-feedparser](https://github.com/danmactough/node-feedparser)
* MySQL 模块使用 [node-mysql](https://github.com/felixge/node-mysql)

#### 5. 注意的地方

默认情况下，使用 INSERT IGNORE 之后，即使在没有插入数据的情况下，自增长的主键也会变化，这并不是我们想要的。

可以通过设置 [innodb auto increment configurable](http://dev.mysql.com/doc/refman/5.1/en/innodb-auto-increment-handling.html#innodb-auto-increment-configurable)，避免这种情况。

* 需要将数据库表的 ENGINE 设置为 InnoDB（ENGINE=InnoDB）
* 需要在 MySQL 的配置文件中添加 innodb_autoinc_lock_mode = 0

具体设置方法（Ubuntu 下）：

	sudo vi /etc/mysql/my.cnf
	
在 [mysqld] 下增加：

	innodb_autoinc_lock_mode = 0
