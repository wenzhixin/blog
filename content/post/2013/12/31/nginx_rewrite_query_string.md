---
title: Nginx rewrite query string
date: 2013-12-31 09:00:00
categories: [后台技术]
tags: [nginx,rewrite,query string]
---

**rewrite 的正则是不匹配 query string 的**，  
默认情况下，query string 会自动追加到rewrite 后的地址上。

例如：
```
rewrite ^/read.php$ /api.php
```
那么：

访问 read.php?tid=123 的时候实际上已经 rewrite 到了 api.php?tid=123 上了

**nginx 中 $args 变量保存了 query string 中的值**,  
例如 ?tid=123，那么可以使用 $arg_tid 来匹配 tid 的值

**而不想自动追加 query string，则在 rewrite 地址的末尾添加 ?**
```
rewrite ^/read.php$ /api.php?tid=$arg_tid&func=post?
```