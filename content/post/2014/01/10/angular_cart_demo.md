---
title: AngularJS学习笔记——购物车实例与解析
date: 2014-01-10 00:00:00
categories: [前端技术]
tags: [AngularJS]
---

通过构建一款实例来了解 AngularJS 的特性，貌似还是比较有效的。

先来看看[效果](/demos/angular/cart.html)。
```
<!doctype html>
<html ng-app>
<head>
	<meta charset="UTF-8" />
	<title>Cart</title>
</head>
<body ng-controller="CartController">
	<h1>Your Order</h1>
	<div ng-repeat="item in items">
	 <span>{{item.title}}</span>
	 <input ng-model="item.quantity" />
	 <span>{{item.price | currency}}</span>
	 <span>{{item.price * item.quantity | currency}}</span>
	 <button ng-click="remove($index)">Remove</button>
	</div>
	<script src="assets/angular.min.js"></script>
	<script>
	  function CartController($scope) {
	    $scope.items = [
	      {title: 'Pots', quantity: 8, price: 3.95},
	      {title: 'Dots', quantity: 17, price: 12.95},
	      {title: 'Pebbels', quantity: 5, price: 6.95}
	    ];
	    $scope.remove = function(index) {
	      $scope.items.splice(index, 1);
	    };
	  }
	</script>
</body>
</html>
```

可以看到很少代码就可以实现基本的购物车功能了，例如：实时更新总价，删除订单。

一起来看看代码是什么意思吧：

* ng-app：告诉 angular 页面中那部分需要接受它的管理，一般放在 html 标签上，表示管理整个页面。
* ng-controller="CartController"：声明控制器 CartController，用于管理 body 标签之间的内容。
* ng-repeat="item in items"：表示对于 items 数组中的每个元素，都把 div 中的 DOM 结构复制一份（包括div自身）。
* {{item.title}}：通过 {{}} 进行数据绑定，更新数据将会实时更新页面。
* ng-model="item.quantity"：ng-model 将会在输入框和 item.quantity 的值之间创建数据绑定关系。
* {{item.price | currency}}：单向绑定，currency 表示过滤器，可以实现美元格式化。
* ng-click="remove($index)"：点击按钮调用 remove 函数，$index 表示循环计数的位置。
* $scope：控制器需要通过 $scope 把数据绑定到 UI 中的元素上。
* $scope.items：定义数组，表示用户购物车的物品列表。
* $scope.remove：定义删除物品函数，点击 Remove 按钮时触发。
