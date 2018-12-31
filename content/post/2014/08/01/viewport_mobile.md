---
title: 设置 viewport 实现定宽网页 WebApp 下布局自适应
date: 2014-08-01
categories: [前端技术]
tags: [viewport,定宽,自适应]
---

一般来说，我们实现布局自适应可以有以下几种方式：

* 使用流动布局（fluid grid）
* 根据屏幕大小选择加载不同的CSS
* 使用 CSS 的@media规则

详细的介绍，可以参考[自适应网页设计（Responsive Web Design）](http://www.ruanyifeng.com/blog/2012/05/responsive_web_design.html)这篇文章。

这里介绍的是如何让定宽网页在 WebApp 下（或者手机浏览器）实现自适应。例如，我们设计了一套宽度为 640px 的小页面，主要是用于手机查看，但是手机屏幕分辨率实在太多了，要适应每台手机，应该怎么办呢？

首先，我们在 head 中加入：
```
<head>
<meta name="viewport" content="width=device-width, user-scalable=no">
</head>
```

这里表示 viewport 的宽度为匹配设备屏幕的宽度，且禁用缩放。涉及到两个概念：

* [viewport 元素](https://developer.mozilla.org/zh-CN/docs/Mobile/Viewport_meta_tag)
* devicePixelRatio：设备上物理像素和设备独立像素(device-independent pixels (dips))的比例。

由于 iphone 手机和 android 4.0 以上的手机支持修改 viewport 的 width 来改变页面的缩放情况，因此我们**可以将 width 指定为页面设计的宽度**，如此一来，你的页面正好充满 viewport 并全屏显示，而不会缩放。例如：
```
<meta name="viewport" content="width=640px, user-scalable=no">
```

但是对于 android 4.0 以下的手机，不支持设置 viewport 的 width，但是我们**可以设置 Android 的另一参数target-densitydpi，从而达到相同的目的**，计算 target-densitydpi 的公式如下：

```
target-densitydpi = UI-width / device-width * window.devicePixelRatio * 160;
  //UI-width ：WebApp布局宽度
  //device-width ：屏幕分辨率宽度
```

于是，**最终解决方案**如下：

```
<meta name="viewport" content="target-densitydpi=device-dpi, width=640px, user-scalable=no">
```

```js
$(function () {
	var DEFAULT_WIDTH = 640, // 页面的默认宽度
		ua = navigator.userAgent.toLowerCase(), // 根据 user agent 的信息获取浏览器信息
		deviceWidth = window.screen.width, // 设备的宽度
		devicePixelRatio = window.devicePixelRatio || 1, // 物理像素和设备独立像素的比例，默认为1
		targetDensitydpi;

	// Android4.0以下手机不支持viewport的width，需要设置target-densitydpi
	if (ua.indexOf("android") !== -1 && parseFloat(ua.slice(ua.indexOf("android")+8)) < 4) {
    	targetDensitydpi = DEFAULT_WIDTH / deviceWidth * devicePixelRatio * 160;
    	$('meta[name="viewport"]').attr('content', 'target-densitydpi=' + targetDensitydpi +
    			', width=device-width, user-scalable=no');
    }

	// TODO: 其他手机需要特殊处理的在下面
});
```

**存在的问题**：

* 目前只测试 android 和 ios/ipad 手机
* android 下使用 firefox 无法检测出 android 的版本，因此只能忽略 firefox

> ps: 理论上可以利用枚举的方式将通用的手机分辨率记录起来，从而达到适应所有机型的效果。
