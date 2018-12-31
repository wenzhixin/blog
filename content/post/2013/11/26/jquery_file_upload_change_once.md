---
title: jQuery file upload 插件 change 只生效一次
date: 2013-11-26 21:32:00
categories: [前端技术]
tags: [jQuery,file,change]
---

#### 1. 前言

在使用 [AjaxFileUpload 插件](http://www.phpletter.com/Demo/AjaxFileUpload-Demo/)的时候，
发现使用 jQuery 监听 change 事件只生效一次
```javascript
$('#upload').change(function() {

});
```
那么是为什么呢？

#### 2. 原因

找了下原因，原来是 130 行对事件进行了 unbind
```javascript
jQuery(io).unbind()
```

#### 3. 解决

1) 使用 on() 方法（推荐）：

```javascript
$(document).on('change', '#upload', function() {
	
});
```

2) 在 change 起作用之后继续绑定 change 事件

3) 替换原来的 input：

```javascript
$('#upload').replaceWidth('<input id="upload" type="file" />')
```