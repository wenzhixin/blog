---
title: 使用 requestAnimationFrame 实现动画
date: 2014-01-14 00:00:00
categories: [前端开发]
tags: [requestAnimationFrame,动画]
---

requestAnimationFrame 函数是主流浏览器推出来的用来代替旧的```setTimeout```和```setInterval```方法，
从而提高动作的性能。

该函数把绘制动画的任务直接交给浏览器，使用它还是有挺多好处：

* 首先，它仅仅绘制用户可见的动画。这意味着没把 CPU 或电池寿命浪费在绘制处于背景标签，最小化窗口，或者页面隐藏区域的动画上。
* 第二，当浏览器准备好绘制时（空闲时），才绘制一帧，此时没有等待中的帧。意味着用 requestAnimationFrame 绘制动画不可能出现多个排队的回调函数，或者阻塞浏览器。
* 第三，由于浏览器准备好时（空闲时）才绘制帧，不会有等待绘制的帧，没有多余的帧绘制。因此动画更平滑，CPU 和电池使用被进一步优化。

在使用的时候，需要考虑多浏览器之间的兼容问题：
```
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame || 
		window.oRequestAnimationFrame || 
		window.msRequestAnimationFrame ||
		function(/* function */callback, /* DOMElement */element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();

window.cancelAnimFrame = (function() {
	return window.cancelAnimationFrame || 
		window.webkitCancelRequestAnimationFrame || 
		window.mozCancelRequestAnimationFrame || 
		window.oCancelRequestAnimationFrame || 
		window.msCancelRequestAnimationFrame || 
		clearTimeout;
})();
```

---

**问题：如何模拟 fps 数？**
```
var fps = 30;
function draw() {
	setTimeout(function() {
        requestAnimFrame(draw);
        
        // do something
    }, 1000 / fps);
}
```