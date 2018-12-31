---
title: 如何为 NodeJs 设置 Nginx 代理服务器
date: 2014-09-18
categories: [后台技术]
tags: [Nginx,NodeJs,http代理]
---

很多时候，我们需要为 NodeJs 设置反向代理，例如本博客后台 NodeJs 的应用监听的端口为 3333，通过 Nginx 便可以轻松代理为 80 端口，那么应该如何设置呢？

首先设置 `upstream`：
```
upstream app_blog {
    server 127.0.0.1:3333;
}
```

设置 `server`：
```
server {
    listen 80 default;
    server_name wenzhixin.net.cn wenzhixin.*;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;

        proxy_pass http://app_blog;
        proxy_redirect off;
    }
}
```

重启 `nginx`：
```
sudo service nginx restart
```

大功告成！根据我们的设置，所有通过 80 的请求（头部信息）都会跳转到 3333 端口。
