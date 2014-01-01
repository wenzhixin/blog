## lscache 介绍

分类：前端技术 | 标签：localStorage、lscache | 发布时间：2014-01-02 00:00:00

___

### 介绍

[lscache](https://github.com/pamelafox/lscache) 是一个带有时间戳的缓存库，提供类似内存缓存行为。
使用 html5 localStorage 模拟内存缓冲功能，这样就可以在客户端缓冲数据，
并对每块数据关联一个过期时间。如果超过 localStorage 的限制（大约 5MB），
它试图删除最近过期的项目以释放空间。如果浏览器不支持 localStorage，则返回 null。 

### 方法

#### lscache.set

将数据存储到 localStorage 中，在指定分钟后到期。

参数：

* key (string)
* value (Object|string)
* time (number: optional)

#### lscache.get

获取未过期的关键字为 key 的数据。

参数：

* key (string)

#### lscache.remove

删除关键字为 key 的数据。

参数：

* key (string)

#### lscache.flush

删除所有的 lscache 数据。

#### lscache.setBucket

添加 CACHE_PREFIX 使 lscache 用不同的分区。

参数：

* key (string)

### 使用实例

使用 lscache 获取 Youtube 的 API 数据，并且缓存 10 分钟：
```
var key = 'youtube:' + query;
var json = lscache.get(key);
if (json) {
  processJSON(json);
} else {
  fetchJSON(query);
}

function processJSON(json) {
  // ..
}

function fetchJSON() {
  var searchUrl = 'http://gdata.youtube.com/feeds/api/videos';
  var params = {
   'v': '2', 'alt': 'jsonc', 'q': encodeURIComponent(query)
  }
  JSONP.get(searchUrl, params, null, function(json) {
    processJSON(json);
    lscache.set(key, json, 10);
  });
}
```