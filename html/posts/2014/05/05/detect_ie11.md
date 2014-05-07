## 判断浏览器是否为 IE11

分类：前端技术 | 标签：IE11、判断 | 发布时间：2014-05-05 23:00:00

___

项目中需要判断对浏览器的支持，使用 jQuery 去判断一个浏览器是否为 IE11 的时候，会识别错误。

这是因为 IE11 使用了和之前版本不一样的 User-agent：

```
Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv 11.0) like Gecko
```

而 IE10 是：

```
Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)
```

所以目前的做法是通过正则判断 User-agent：

```
var isIE11 = (/Trident\/7\./).test(navigator.userAgent);
```