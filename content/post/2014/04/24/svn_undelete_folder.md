---
title: SVN 如何恢复被删除的文件夹
date: 2014-04-24 23:30:00
categories: [后台技术]
tags: [SVN,恢复被删除]
---

### 问题：

* 你删除了 SVN 版本库上的文件夹，那么你要怎么恢复呢？

### 尝试办法：

* 通过 ```svn revert folder```，会发现找不到该文件夹

* 通过 ```svn merge```，从上个版本恢复回来，但是发现也是有找不到的问题

* 通过从上个版本恢复，然后 ```svn add foler``` 到现有版本库中，这样会导致 log 失效，并不是我们想要的

### 最终解决办法：

通过尝试发现把自己的思路给限死了，有时候就应该这样，换个角度思考问题，
我们所要做的事情很简单，就是恢复文件夹，并且保证 log 的正确性，那么 copy 就能解决这个问题：

```
svn copy svn://svnserver/project/tags@100 http://svnserver/project/tags -m "undeleted folder"
```

表示从 url 为 svn://svnserver/project 的项目中恢复版本号为 100 的 tags 文件夹，并且信息为 "undeleted folder"。