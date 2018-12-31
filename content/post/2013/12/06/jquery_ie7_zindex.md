---
title: 使用 jQuery 修复 IE7 z-index 的 bug
date: 2013-12-06 00:00:00
categories: [前端技术]
tags: [IE7,z-index]
---

### 现象：

先来看下这段代码：

```
td {
	text-align: center;
}
.parent {
	width: 300px;
	height: 30px;
	position: relative;
	display: inline-block;
	background: #f00;
	border: 1px solid #aaa;
}
.parent1 {
	width: 200px;
	background: #000;
}
.child {
	width: 200px;
	height: 200px;
	position: absolute;
	z-index: 1000;
	top: 100%;
	left: -1px;
	background: #fff;
	border: 1px solid #aaa;
}
.none {
	display: none;
}

<table border="0">
  <tr>
    <td>
    <div class="parent parent1">
      <div class="child"></div>
    </div>
    </td>
  </tr>
  <tr>
    <td>
    <div class="parent parent2">
      <div class="child none"></div>
    </div></div>
    </td>
  </tr>
</table>
```

在非 IE7 下的浏览器的显示效果：

![](/2013/12/06/1.png)

在 IE7 下：

![](/2013/12/06/2.png)

### 原因：

这是因为同个 parent 在 IE7 的渲染下，后面的元素的 z-index 比前面的 大 的 bug。

### 解决：

可以使用 jQuery 设置 css 中 z-index 的值：

```
var zIndex = 1000;
$('.parent').each(function() {
	$(this).css('z-index', zIndexNumber);
	zIndex -= 10;
});
```
