## 一步一步学习 AngularJS（三）

分类：前端技术 | 标签：AngularJS | 发布时间：2014-02-20 00:00:00

___

[上一节](/2014/02/19/angular_scutech_step1)
[下一节](/2014/02/21/angular_scutech_step3)

在这一小节，我们使用 Angular 来动态生成上一节的页面。

在开始之前，我们先来看看 [演示](/demos/angular-scutech/step2)，
也可以通过链接下载 [zip](/demos/angular-scutech/step2.zip) 包。

一个应用可以有很多种代码结构，对于 Angular 来说，我们推荐使用
[Model–View–Controller（MVC）](http://en.wikipedia.org/wiki/Model%E2%80%93View%E2%80%93Controller)
来组织代码结构。现在，让我们使用 Angular 和 JavaScript 代码来为我们的应用程序添加
model（模型）、view（视图）和 controller（控制器）。

查看演示，可以看到跟上一节我们使用静态页面一样的页面。

**View（视图）和 Template（模板）**

在 Angular 中，View（视图）是通过 HTML 的 Template（模板）来显示 Model（模型）的。
也就是说，无论在任何时候，模型发生了变化，Angular 会刷新相对应的绑定节点，
从而更新视图。

文件```index.html```：

```
<!doctype html>
<html lang="en" ng-app="scutechApp">
<head>
    <meta charset="utf-8">
    <title>Angular Scutech</title>
    <link rel="stylesheet" href="lib/bootstrap/css/bootstrap.css">
    <script src="lib/angular/angular.js"></script>
    <script src="js/controllers.js"></script>
</head>
<body ng-controller="ListCtrl">

<div class="navbar navbar-inverse" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">项目名称</a>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#">产品列表</a></li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</div>

<div class="container">
    <ul class="list-group">
        <li class="list-group-item" ng-repeat="product in products">
            <h4 class="list-group-item-heading">{{product.name}}</h4>
            <p class="list-group-item-text">{{product.info}}</p>
        </li>
    </ul>
</div>
</body>
</html>
```

这里我们使用```ng-repeat```指令来代替产品列表，然后使用两个表达式：```{{product.name}}```
和```{{product.info}}```来绑定我们的产品信息。

```
<li ng-repeat="product in products">
```
li 标签中使用了重复器，告诉 Angular 去对每个 product 创建一个 li 标签，使用第一个 li 标签的模板。

我们新增一个新的指令，叫做```ng-controller```，并且设置为 ListCtrl，这里对应模型中的控制器。

**Model（模型） 和 Controller（控制器）**

控制器```ListCtrl```现在加入了数据模型（一个简单的产品列表数组），这里的控制器只是简单的拥有 ```$scope```
属性的一个方法：

文件```js/controllers.js```：
```
var scutechApp = angular.module('scutechApp', []);

scutechApp.controller('ListCtrl', function ($scope) {
    $scope.products = [
        {
            'name': '鼎甲信息仓（Infokist）',
            'info': '一款将自主研发的一系列数据软件与云存储硬件深度整合为一体的数据保护系统。'
        },
        {
            'name': '鼎甲迪备（DBackup）',
            'info': '一款分布式运维级数据库存储备份管理软件，广泛支持主流的操作系统平台以及数据库类型。'
        },
        {
            'name': '鼎甲安备（AnBay）',
            'info': '一款为文件系统提供全面的SaaS（Software-as-a-Service）数据保护的“云备份”产品。'
        },
        {
            'name': '鼎甲奥备（OBackup）',
            'info': '一款通过简单的图形化界面操作就可迅速完成的Linux操作系统备份和裸机恢复软件。'
        },
        {
            'name': '鼎甲智备（WBackup）',
            'info': '一款基于云存储的远程异的移动终端备份软件。'
        },
        {
            'name': '鼎甲数据卫士（GBackup）',
            'info': '一款专门用于Windows系统的各种类型文件、文件夹以及程序的单机备份和恢复的软件。'
        }
    ];
});
```

我们定义了```ListCtrl```控制器，并且注册到 Angular 的 module：```scutechApp```中，
注意到我们在上面的 html 中设置了```ng-app="scutechApp"```，与这里的 module 相对应，
从而让 Angular 知道如何启用我们的应用程序。

即使控制器没有做任何事情，但它起了决定性的作用。通过提供我们的模型数据，
控制器允许我们建立模型和视图之间的双向绑定。我们可以看到：

* 指令```ngController```是位于```body```标签中的，与之相对应的```ListCtrl```是位于```controllers.js```中，
表示我们的控制器范围是作用于 body 下的。

* ```ListCtrl```控制器将数据作为```$scope```的一个属性值```products```。这里的 scope 继承于 root scope，
当应用程序启动的时候自动被创建。

**Scope**

在 Angular 中，Scope 的概念是至关重要的，Scope 将视图、模板、模型和控制器紧紧结合在了一起。
同时，使用 Scope 让视图、模型和控制器起到了解藕的效果，但是又做到了同步。
即数据模型与视图的双向绑定，所以任何数据的改变都会在视图中显示出来，反之亦然。

**扩展练习**

在```index.html```中添加新的绑定：
```
<p>产品个数：{{products.length}}</p>
```

使用表格显示我们的产品：
```
<table class="table table-bordered">
    <tr>
        <th>编号</th>
        <th>名称</th>
        <th>描述</th>
    </tr>
    <tr ng-repeat="product in products">
        <td>{{$index + 1}}</td>
        <td>{{product.name}}</td>
        <td>{{product.info}}</td>
    </tr>
</table>
```

[上一节](/2014/02/19/angular_scutech_step1)
[下一节](/2014/02/21/angular_scutech_step3)

---

* [一步一步学习 AngularJS（一）](/2014/02/18/angular_scutech_step0)
* [一步一步学习 AngularJS（二）](/2014/02/19/angular_scutech_step1)
* [一步一步学习 AngularJS（三）](/2014/02/20/angular_scutech_step2)
* [一步一步学习 AngularJS（四）](/2014/02/21/angular_scutech_step3)
* [一步一步学习 AngularJS（五）](/2014/02/22/angular_scutech_step4)
* [一步一步学习 AngularJS（六）](/2014/02/23/angular_scutech_step5)
* [一步一步学习 AngularJS（七）](/2014/03/10/angular_scutech_step6)