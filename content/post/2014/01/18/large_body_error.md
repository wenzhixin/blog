---
title: nodeJS 和 Nginx 解决客户端发送大数据的问题
date: 2014-01-18
categories: [后台技术]
tags: [nodejs,nginx,large body]
---

nodeJS 和 Nginx 默认情况下都只支持 1MB 的 body 数据，当客户端发送大数据的时候，分别会出现以下错误：

**nodeJS：**
```
Error: request entity too large
```

**解决：**
```
app.use(express.bodyParser({
    limit: 1024 * 1024 * 64 // 64M
}));
```

**Nginx：**
```
client intended to send too large body
```

**解决：**
在 nginx/nginx.conf 中的 http 下加入
```
http {
    ...
    client_max_body_size 64M;
}
```
