---
title: 使用 JavaScript 转换数据单位
date: 2014-09-03 17:31:00
categories: [前端技术]
tags: [JavaScript,数据单位]
---

我们知道，千字节是一个计量单位，虽然从字面上理解代表着1000，但是专业术语`kilobyte`在计算机科学和信息技术等领域有两种含义，分别代表1024（2<sup>10</sup>）和1000（10<sup>3</sup>）。

例如，当我们提到“数据传输速度”和“硬盘存储空间”的时候，千字节代表1000（10<sup>3</sup>）；而提到内存或者CPU高速缓存容量的时候，千字节代表1024（2<sup>10</sup>），这是因为在这里是按照字节码地址存储的。

在实际应用中，我们经常需要将字节码转换为KB、MB、GB等等，这里使用JavaScript对字节码进行转换：

```javascript
function bytesToSize(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1000, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));

   return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
```
