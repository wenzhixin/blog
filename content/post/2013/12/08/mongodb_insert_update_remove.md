---
title: MongoDB 创建、更新及删除文档
date: 2012-12-08 08:24:00
categories: [数据库]
tags: [MongoDB]
---

#### 1、插入文档：insert

1) 基本用法：

    db.name.insert(文档内容);

例子：

    db.users.insert({"username": "wenyi", "age": 25});

2) 从其他数据库导入数据，使用 mongoimport 命令

3) 原理与作用:

插入数据时只检查文档大小（不超过 4M），不做别的数据验证，简单地将文档原样存进数据库中。
这种方式可以让数据库更加安全，远离注入式攻击。

#### 2、删除文档：remove

1) 基本用法：

    db.name.remove(索引);

例子：

    db.users.remove();
    db.users.remove({"username": "wenyi"});

2) db.users.remove() 与 db.drop_collection("users") 的区别：

* 两者都是删除整个集合

* 前者会保留所有的索引，后者删除所有的索引

* 前者删除速度慢，后者删除速度快

#### 3、更新文档：update

1) 基本用法：

    db.name.update(索引, 修改的文档);

例子：

    db.users.update({"username": "wenyi"}, {"username": "wenyi", "age": 26}});

2) 使用修改器：是种特殊的键，用来指定复杂的更新操作，更新文档部分内容

* $set: 用来指定一个键的值，如果该键不存在，则创建它。用于更新模式或增加用户自定义键
* $unset: 用来删除某个键

例子：

    db.users.update({"username": "wenyi"}, {"$set": {"age": 26}}});
    db.users.update({"username": "wenyi"}, {"$set": {"blog": "wenyi.tk"}}});
    db.users.update({"username": "wenyi"}, {"$unset": {"blog": 1}}});

* $inc: 用来增加已有键的值，或者在键不存在时创建一个键。用于分析数据、因果关系、投票或者有变化数值的地方

例子：

    db.users.update({"username": "wenyi"}, {"$inc": {"age": 1}}});
    db.games.update({"name": "my_game"}, {"$inc": {"score": 100}}});

注：只能用于整数、长整数或双精度浮点数

* $push: 向一有数组末尾加入元素，不存在则创建新数组
* $pop: 从数组任何一端删除元素。{$pop: {key: 1}} 从末尾删除一个元素；{$pop: {key: -1}} 从头尾删除一个元素
* $pull: 基于特定的条件来删除元素
* $: 用来定位查询文档已经匹配的元素

例子：

    db.posts.update({"name": "my_blog"}, {"$push", {"comments": {"name": "test", "content": "这是一条评论"}});
    db.posts.update({"name": "my_blog"}, {"$pop", {"comments": 1});
    db.posts.update({"name": "my_blog"}, {"$pull", {"comments.$.name": "test"});

3) upsert: 特殊的更新，没有符合更新条件的文档，便会以创建一个新的文档。

4) 其他命令：

* getLastError: 查看上次更新信息

参数:

    {
        "err": "err", //错误信息
        "updatedExisting": true / fase,
        "n": n, //文档更新条数
        "ok": true / false //更新结果

* findAndModify: 返回已更新的文档

用法：

    db.name.findAndModify({
        "findAndModify": "string", //集合名
        "query": "string", //查询文档
        "sort": string", //排序条件
        "update": "string", //更新文档
        "remove": bool, //是否删除文档
        "new": bool //返回更新前（默认）和更新后的文档
    } 
