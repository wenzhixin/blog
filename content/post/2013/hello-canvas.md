---
title: html5 canvas 画布入门
date: 2013-11-12
categories: [前端技术]
tags: [canvas,入门]
---

今天开始学点新东西，canvas 画布，它是一个 HTML5 的一个新元素，
它没有自己的行为，但是定义了一个 API 支持脚本化客户端绘图操作。

既然是入门，也来个 hello world 小程序吧。

	<!doctype html>
	<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>hello canvas</title>
		<style>
			body {
				background: #ddd;
			}
			#canvas {
				background: #fff;
			}
		</style>
	</head>
	<body>
		<canvas id="canvas" width="600" height="300"></canvas>
		<script>
			var canvas = document.getElementById('canvas'),
				context = canvas.getContext('2d');

			context.font = '38pt Arial';
			context.fillStyle = 'cornflowerblue';
			context.strokeStyle = 'blue';

			context.fillText('Hello Canvas', canvas.width / 2 - 150, canvas.height / 2 + 15);
			context.strokeText('Hello Canvas', canvas.width / 2 - 150, canvas.height / 2 + 15);
		</script>
	</body>
	</html>

效果：
![](/2013/11/12/1.png)

需要注意的是，在这里，我们是通过设置 canvas 元素的 width 与 height，来改变元素大小的。
假如通过 css 来设置 canvas 元素的大小，两者的效果并不一样。

	#canvas {
		width: 600;
		height: 300;
	}

	<canvas id="canvas"></canvas>

效果：
![](/2013/11/12/2.png)

这是因为 canvas 元素有元素本身大小与元素绘图表面大小两套尺寸。
设置 width 和 height 时，实际上是同时修改了该元素本身大小和元素绘图表面大小；
而设置 css，只会改变元素本身大小，并不会改变元素绘图表面大小。
默认情况下元素本身大小与元素绘图表面大小都为 300 x 150。
当元素本身大小与元素绘图表面大小不一样大小时，浏览器会对绘图表面进行缩放。
