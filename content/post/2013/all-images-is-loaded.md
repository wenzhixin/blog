---
title: jQuery 判断所有图片加载完成
date: 2013-11-22
categories: [前端技术]
tags: [图片,加载完成,Deferred]
---

对于图片的处理，例如幻灯片播放、缩放等，都是依赖于在所有图片完成之后再进行操作。

今天来看下如何判断所有的图片加载完成，而在加载完成之前可以使用 loading 的 gif 图表示正在加载中。

#### 一、普通方法

监听 img 的 load 方法，每 load 一张图片比较一次。关键代码如下：
```javascript
var num = $img.length;

$imgs.load(function() {
	num--;
	if (num > 0) {
		return;
	}
	console.log('load compeleted');
}
```

#### 二、使用 jQuery 中的 Deferred 对象

Deferred 对象是从 jQuery 1.5.0 版本开始引入的一个新功能，详细介绍可以见
[官方文档](http://api.jquery.com/category/deferred-object/)。

简单的说，Deferred 对象就是jQuery的回调函数解决方案，它解决了如何处理耗时操作的问题，
对那些操作提供了更好的控制，以及统一的编程接口。

阮一峰有一篇文章是介绍 Deferred 对象的，写的比较详细，对于入门比较有用。

[jQuery的deferred对象详解](http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html)

在这里，我们用到了：

* deferred.resolve(): Resolve a Deferred object and call any doneCallbacks with the given args.
* deferred.when(): Provides a way to execute callback functions based on one or more objects, usually Deferred objects that represent asynchronous events.
* deferred.done(): Add handlers to be called when the Deferred object is resolved.

关键代码：
```javascript
var defereds = [];

$imgs.each(function() {
	var dfd = $.Deferred();

	$(this).load(dfd.resolve);
	defereds.push(dfd);
});
$.when.apply(null, defereds).done(function() {
	console.log('load compeleted');
});
```

**基本思路：**
每加载完一张图片 resolve()，when() 当所有的 Deferred 完成便执行 done()。

**注：**
因为 $.when 支持的参数是 $.when(dfd1, dfd2, dfd3, ...)，所以我们这里使用了 apply 来接受数组参数。
