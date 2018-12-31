---
title: 彻底研究CSS——深入理解盒子模型
date: 2012-05-04
categories: [前端技术]
tags: [CSS,盒子模型]
---

1、盒子模型的内部结构

 \* 在 CSS 中，一个独立的盒子模型由
content（内容）、border（边框）、padding（内边距）和 margin（外边距）4
个部分组成。

 \*
一个盒子实际所战的宽度（或高度）是由“内容+内边距+边框+外边距”组成的。通过设定
width 和 height 来控制内容所占的矩形大小，内边距、边框和外边距分别用
padding、border 和 margin 来表示。

![彻底研究CSS——深入理解盒子模型](http://ww3.sinaimg.cn/mw600/88a9c274jw1dsm7ooransj.jpg)


2、边框（border）

 \* 主要包括三个属性，分别是 color（颜色）、width（粗细）和 style（样式）。

（1）border-color：边框颜色，通常设置为十六进制的值

（2）border-width：边框粗细程度，可设为thin、medium、thick 和<length\>（具体的数值）。默认值为“medium”，浏览器解析为 2px 宽。

（3）border-style：可设为none、hidden、dotted、dashed、solid、double、groove、ridge、inset
和
outset。由于浏览器支持问题，一般使用none、hidden、dotted、dashed、solid、double。hidden
可用来解决边框冲突问题。


 \* 边框的缩写形式：对于不同的边框设置不同的属性值。

（1）指定 2 个属性值，第一个表示上下边框的属性，第二个表示左右边框的属性。

（2）指定 3
个属性值，第一个表示上边框的属性，第二个表示左右边框的属性，第三个表示下边框的属性。

（3）指定 4 个属性值，一次表示上、右、下、左边框的属性，即顺时针排序。

（4）单独指定边框的属性，用border-top、border-right、border-bottom 和
border-left 表示。


ps：当有多条规则作用于同个边框时，后面的设置会覆盖前面的设置。


3、内边距（padding）

 \* padding 用于控制内容与边框之间的距离。padding 属性可以设置 1-4
个属性值。

（1）设置 1 个属性值，表示上下左右 4 个内边距都为该值。

（2）设置 2 个属性值，第一个表示上下内边距的值，第二个表示左右内边距的值。

（3）设置 3
个属性值，第一个表示上内边距的值，第二个表示左右内边距的值，第三个表示下内边距的值。

（4）设置 4 个属性值，一次表示上、右、下、左内边距的值，即顺时针排序。

（5）单独设置边框的属性，用padding-top、padding-right、padding-bottom 和
padding-left 表示。


4、外边距（margin）

 \* margin 指的是元素与元素之间的距离。margin 属性值的设置方法与 padding
一样，可以设置不同的数值代表相应的含义。


5、盒子之间的关系

 \* 一个 HTML
文档并不是一个简单的文本文件，而是一个具有层次结构的逻辑文档，每一个 HTML
元素都左右这个层次结构中的一个节点存在。CSS
的目的是使网页的表现形式和内容结构分离，CSS 控制网页的表现形式，HTML
控制网页的内容结构。


 \* 标准文档流：简称“标准流”，指在不使用其他的与排列和定位相关的特殊 CSS
规则时，各种元素的排列规则。

（1）块级元素（block
level）：以一个块的形式表现出来，并且跟同级的兄弟块一次垂直排列，左右撑满。代表标记为<div\>。

（2）行内元素（inline）：元素横向排列，到最右端自动换行。代表标记为 \<span\>。


6、盒子在标准流中的定位原则

 \* 行内元素之间的水平
margin：当两个行内元素紧邻时，它们的距离为第一个元素的 margin-right
加上第二个元素的 margin-left。


 \* 块级元素之间的垂直 margin：两个块级元素之间的距离不是第一个元素
margin-bottom 和第二个元素 margin-top
的总和，而是两者的最大值。这个现象称为 margin 的“塌陷”现象，即较小的
margin 塌陷到较大的 margin 中。


 \* 嵌套盒子之间的 margin：子块的 margin 以父块的 content 为参考。


 \* 设置为负值的
margin：会使被设为附属的快像相反的方向移动，甚至覆盖在另外的块上。
