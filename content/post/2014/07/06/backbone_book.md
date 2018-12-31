---
title: 读《Backbone.js 实战》
date: 2014-07-06 07:31:00
categories: [前端技术]
tags: [Bootstrap,按钮,prop]
---

Backbone 是一个轻量级 JavaScript 的 MVC 框架，配合 Underscore 这个依赖库，我们可以打造出强大的 MVC 应用程序。其实很早就用到 Backbone + Underscore 进行网站和应用程序的开发了，只是国内一直没有相关的书籍，这次看到《Backbone.js 实战》，就买下了。现在对书籍的要求越来越高，对于这本书也认认真真的看了一遍，这里写一下读书的笔记和自己的一些看法。

### 第一章

是对 Backbone 的介绍以及通过第一个 hello,backbone! 的小应用来介绍如何使用 backbone 进行开发，和其他一些书差不多都是以 hello, world 开篇。

### 第二章

主要介绍依赖库 Underscore 的常见函数的使用方法，包括了集合、数组、函数、对象和功能：

![](/2014/07/06/1.png)

![](/2014/07/06/2.png)

我觉得像这些函数的介绍在官方的文档中都是有的，而且也有简单的例子，像这种介绍应该可以完善下的，例如加入一些扩展或者对比什么的。如：

* sortBy 函数默认是返回一个按升序排序的副本列表，那我想反序呢？（p17）
* delay 函数类似于 setTimeout 方法，那为什么还要设计这个函数，它们的区别又是什么？（p22）
* 实例代码 ```return s ? n + ", 先生" : n + ", 女士";```是否可以改成```return n + ", " + s ? "先生" : "女士"```更简短一些呢？（p23）
* defaults 函数与 jQuery 中的 extend 有什么区别？（p26）
* has 函数与 hasOwnProperty 函数有什么区别？（p27）
