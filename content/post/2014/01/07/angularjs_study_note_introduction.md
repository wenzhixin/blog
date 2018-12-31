---
title: AngularJS学习笔记——AngularJS简介
date: 2014-01-07 00:00:00
categories: [前端技术]
tags: [AngularJS]
---

自己在前端开发中还有很多新知识要学习，今天开始进入《用 AngularJS 开发下一代 Web 应用》一书的学习之旅。

AngularJS是一款开源 JavaScript函式库，由Google维护, 主要用于单页面应用开发。
目标是增强基于浏览器的应用，并带有MVC模式功能，这为了使得开发和测试变得更加容易。

### 一些概念

**客户端模板**

传统的 web 应用会在服务器中创建 HTML，然后和数据生成页面一起发送到浏览器中。
而现在单页面应用则会把模板存放在客户端中，而服务器则是仅仅为这些模板提供静态资源和数据。

hello world：
```
<!doctype html>
<html lang="en" ng-app>
<head>
	<meta charset="UTF-8" />
	<title>hello</title>
	<script src="assets/angular.min.js"></script>
</head>
<body>
  <input type="text" ng-model="name" />
  <h2>Hello {{name}}!</h2>
</body>
</html>
```

从 hello world 中可以看到：

* html 里没有 class 或者 ID 来标记哪里添加事件。
* 数据绑定，改变数据页面也会随之改变。

**Model View Controller (MVC)**

MVC 的核心理念：把管理数据的代码（model）、应用逻辑代码（controller）和展示数据的代码（view）清晰的分离开。

AngularJS 中，视图是 Document Object Model（DOM，文档对象模型），控制器为 JavaScript 类，模型数据被存储在对象的属性中。

**数据绑定**

使用 jQuery 开发，我们会把获取的数据插入到 DOM 中，或者直接操作 DOM 的内容。

而在 AngularJS 中，仅仅声明 UI 中的 DOM 映射到某个 JavaScript 属性，然后修改 JavaScript 属性，就可以自动更新 DOM 中的值。

**依赖注入**

开发风格：类只是简单的获取所需要的东西，并不需要创建所需要的东西。这种风格叫迪米特法则，也叫最小知识原则。

例如：$scope 对象表示 Controller 模型中的内部状态；$location 对象表示浏览器 URL 地址状态。

**指令**

AngularJS 引入了强大的 DOM 转换引擎，用来扩展 HTML 语法。

如：

* {{}}：表示数据绑定
* ng-controller：指定控制器范围
* ng-model：把输入数据绑定到模型的属性上
