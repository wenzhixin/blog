---
title: 在 Ubuntu 14.04 server 上部署 meteor 应用
date: 2015-07-06 22:30:00
categories: [操作系统]
tags: [meteor,部署]
---

### 关于 Meteor.js

[Meteor.js](http://meteor.com/) Meteor 是一个构建在 Node.js 之上的平台，用来开发实时网页程序。Meteor 位于程序数据库和用户界面之间，保持二者之间的数据同步更新。使用 Meteor，几小时之内就能开发出一个正常运行的实时网页程序。

### 编译部署 meteor 应用到服务器

* 将我们的应用编译到 build 中
```bash
cd myapp
meteor build --directory ../build
```

* 使用 rsync 同步到服务器上
```bash
cd ../
rsync -avz build/bundle hostname:/home/myapp
```

### 安装 mongodb

```bash
sudo apt-get install mongodb-server
```

### 编写 upstart 脚本

```
sudo vi /etc/init/myapp.conf
```

```bash
#!upstart
description "Meteor Up - myapp"
author      "Arunoda Susiripala, <arunoda.susiripala@gmail.com>"

start on runlevel [2345]
stop on runlevel [06]

respawn

limit nofile 65536 65536

script

    # leave as 127.0.0.1 for security
    export BIND_IP=127.0.0.1

    # the port nginx is proxying requests to
    export PORT=3000

    # this allows Meteor to figure out correct IP address of visitors
    export HTTP_FORWARDED_COUNT=1

    # MongoDB connection string using myapp as database name
    export MONGO_URL=mongodb://localhost:27017/myapp

    # The domain name as configured previously as server_name in nginx
    export ROOT_URL=https://myapp.wenzhixin.net.cn

    exec node /home/myapp/bundle/main.js

end script
```

启动：
```
sudo start myapp
```

### 配置 nginx

```bash
server {
    listen 80; 
    server_name myapp.wenzhixin.net.cn;

    location / { 
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;

        proxy_pass http://127.0.0.1:3000;
        proxy_redirect off;
    }
}
```

访问 myapp.wenzhixin.net.cn
