---
title: html5 canvas 画图实例——rotate
date: 2012-05-20 00:00:00
categories: [前端技术]
tags: [html5,canvas]
---

接口：context.rotate(angle) 

功能：按给定的弧度旋转,按顺时针旋转。

说明：rotate 方法旋转的中心始终是canvas 的原点，使

用translate 方法可以改变它。



例子：

效果：

![html5 canvas
画图实例——rotate](http://ww2.sinaimg.cn/mw600/88a9c274jw1dt4ons6vzyg.gif)


![html5 canvas
画图实例——rotate](http://ww1.sinaimg.cn/mw600/88a9c274jw1dt4onxroqvg.gif)


![html5 canvas
画图实例——rotate](http://ww4.sinaimg.cn/mw600/88a9c274jw1dt4oo3hq50g.gif)


代码：
```
<canvas id="canvas" height="400"></canvas>
<script type="text/javascript">

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
context.fillStyle = "#000";
context.fillRect(0, 0, 400, 400);
context.translate(200, 200);

for (var i = 1; i < 6; i++) {
    context.fillStyle = "rgb(255, " + (255 - 51 * i) + ", " + (51 * i)+ ")";
    for (var j = 0; j < i * 6; j++) {
        context.rotate(Math.PI * 2 / (6 * i));
        context.fillRect(0, 30 * i, 10, 10);
        context.beginPath();
        context.arc(0, 30 * i, 10, 0, Math.PI * 2, true);
        context.fill();
    }
}
</script>
```