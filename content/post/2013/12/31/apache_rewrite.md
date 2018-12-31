---
title: apache 重写链接
date: 2013-12-31 00:00:00
categories: [后台技术]
tags: [nginx,rewrite,query string]
---

#### 安装启用 mod_rewrite

在安装启用之前，编写 info.php 文件
```php
<?php phpinfo();?>
```

从浏览器中打开，使用 Ctrl + F 进行查找 mod_rewrite 是否在 Loaded Modules 中，
已经存在就表示我们已经安装，不存在的话，那么，需要进行安装：
```
sudo a2enmod rewrite
```

修改 AllowOverRide 为 AllowOverRide All
```
sudo vi /etc/apache2/sites-enabled/default
```

#### 使用正则重写链接

这里我们将 restfull 的 url 转发为 php 文件。

新建 .htaccess 文件
```
RewriteEngine on
RewriteRule ^/api/.*$ /api.php [L]
```

* RewriteEngine：表示启用 rewrite
* RewriteRule：表示这是一条 rewrite 规则
* L：该属性表示规则匹配成功后就不需要匹配其他规则了

在 api.php 中，通过下面的变量来获取想要的值
```
$request_method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];
$request_query = $_GET;
$request_data = file_get_contents('php://input');
```

#### 迁移网站重写规则

迁移网站的时候，我们需要将旧地址都重写到新地址上去
```
RewriteEngine on
RewriteRule ^/old.php$ /new.php [R=301,L]
```
R=301：该属性表示请求 old.php 的时候返回一个 301 的重定向