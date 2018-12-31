---
title: Android 界面不支持 position fixed 问题
date: 2013-11-21 21:50:00
categories: [移动开发]
tags: [Android,position,fixed]
---

在 Android 中，部分浏览器不支持 css 的 position: fixed 属性。

详细的支持情况见：http://caniuse.com/css-fixed

对于不支持的情况，我们可以通过以下的解决方法来解决该问题，记录下。

**使用 viewport 标记**
```html
<meta name="viewport" content="width=100%; initial-scale=1; maximum-scale=1; minimum-scale=1; user-scalable=no;" />
```

详细参数解释：

* width：视口的宽度。可以使用像素值，但推荐使用device-width关键字。表示依照设备屏幕的宽度。
 
* height：视口的高度。不用指定。

* initial-scale：初始缩放值。比如1.0表示一个视口像素等于一个屏幕像素。

* minimum-scale：最小比例值。范围从0至10.0
 
* maximum-scale：最大比例值。范围从0至10.0
 
* user-scalable：用户是否可以缩放视口。值可以是：  
1, yes, or true: 允许用户缩放  
0, no, or false: 不许用户缩放  

**使用 position: absolute 代替**

可以简单的使用 position: absolute 代替，但是在桌面端会显示不正常，我们可以通过判断 userAgent 来指定 position 的值。

代码如下：
```javascript
if (navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) {
	$div.css('position', 'absolute');
} else {
	$div.css('position', 'fixed');
}
```

**使用 js 库**

[iScroll](https://github.com/cubiq/iscroll)

注：  
该库也没有使用过，有待研究...