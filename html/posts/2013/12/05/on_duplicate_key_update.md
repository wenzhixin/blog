## ON DUPLICATE KEY UPDATE

分类：数据库 | 标签：插入或更新 | 发布时间：2013-12-05 00:00:00

___

有些时候，操作 sql 语句需要判断记录是否存在，不存在则插入存在则更新，可以考虑使用 ON DUPLICATE KEY UPDATE。

在 INSERT INTO 语句末尾指定了 ON DUPLICATE KEY UPDATE，并且插入行后，
如何导致在一个 UNIQUE 索引或 PRIMARY KEY 中出现重复值，则在出现重复值的行执行 UPDATE 语句；
如果不会导致唯一值列重复的问题，则插入新行。

例如，现有有个很简单的表：

```
create table user (
	id int not null auto_increment,
	username varchar(250) not null,
	primary key (id)
) engine=innodb default charset=utf8;
```

按照正常的思路，先判断是否存在：

```
select * from user where id = 1;
```

不存在则：

```
insert into user(username) values('wenyi');
```

存在则：
```
update user set username = 'wenyi' where id = 1;
```

那么使用 ON DUPLICATE KEY UPDATE 就可以用一条语句表示：

```
insert into user(id, username) values(1, 'wenyi') on duplicate key update username = 'wenyi';
```

___

注：ON DUPLICATE KEY UPDATE只是MySQL的特有语法，并不是SQL标准语法。

更多信息见 [http://dev.mysql.com/doc/refman/5.1/zh/sql-syntax.html#insert](http://dev.mysql.com/doc/refman/5.1/zh/sql-syntax.html#insert)
