---
title: 通过 css 设置图片的高度与宽度相等
date: 2016-01-11 13:30:00
categories: [前端技术]
tags: [CSS]
---

在图片长宽不相等的情况下，想将长宽设置为相等并且自适应屏幕，可以通过 js 的方式进行设置并通过监听 resize 来实时更新，但是这种方式很麻烦。

这里通过 css 来达到我们想要的效果：

HTML:
```
<div class='box'>
	<img src="...">
</div>
```
需要添加一个父元素来达到我们的目的。

CSS:
```
.box {
	position: relative;
	width: 50%;		/* desired width */
}
.box:before {
	content: "";
	display: block;
	padding-top: 100%; 	/* initial ratio of 1:1*/
}
```
我们在这里定义了一个伪元素并且将其 `padding-top` 设置为 100%，因为这里的 padding-top 是相对于元素的 width 的。

现在我们定义了一个 `.box` 元素，它的长和宽是相等的，现在我们只需要设置 img 的 CSS 即可:
```
.box img {
	position:  absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
}
```