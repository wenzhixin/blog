---
title: 栅格化布局和常用框架比较
date: 2013-11-25
categories: [交互设计]
tags: [栅格化]
---

在使用了Bootstrap、Foundation 之后，其实已经接触到栅格化布局这一概念。
今天接触了 skeleton 后，特别强调了栅格化布局，那么何为栅格化布局？

#### 1. 栅格化布局

栅格英文为 grid，是一种平面设计的方法与风格。运用固定的格子设计版面布局，其风格工整简洁。

在样式设计中，把页面等分成N个小的模块，每等份的宽度是Xpx，不同个数的模块组合成不同的栏目宽度，
分别是：(1*X)px，(2*X)px、(3*X)px、……、(N*X)px。而页面的宽度就是 W = (N*X)px。这就是栅格化布局。

为什么要使用栅格化布局呢？它有以下的优势：

* 能大大提高网页的规范性。在栅格系统下，页面中所有组件的尺寸都是有规律的。
这对于大型网站的开发和维护来说，能节约不少成本。
* 基于栅格进行设计，可以让整个网站各个页面的布局保持一致。
这能增加页面的相似度，提升用户体验。
* 对于设计师们来说，灵活地运用栅格系统，能做出很多优秀和独特的设计。

#### 2. 常用框架对比

这里列举了几种常用的 css 框架，更多信息见起网站：

| | [Bootstrap 3](http://getbootstrap.com) | [Bootstrap 2](http://getbootstrap.com/2.3.2/) | [Foundation v5](http://foundation.zurb.com/) | [Foundation v4](http://foundation.zurb.com/docs/v/4.3.2/) | [Foundation v3](http://foundation.zurb.com/docs/v/3.2.5/) | [Skeleton](http://getskeleton.com/) |
| --- | --- | --- | --- | --- | --- | --- |
|基本宽度 | 浮动布局 (480px, 768px, 992px, 1200px) | 浮动和固定布局 (724px, 940px, 1170px; 小于 768px 是单行垂直布局) | 浮动布局 (默认最大宽度为 62.5em) | 浮动布局 (默认最大宽度为 62.5em) | 浮动布局 (最大宽度为 100%) | 960px |
| 列数 | 12 | 12 | 自定义 1-16 (默认为 12) | 自定义 1-16 (默认为 12) | 自定义 12-24 | 16 |
