---
title: 一步一步学习 AngularJS（八）
date: 2014-04-22
categories: [前端技术]
tags: [AngularJS]
---

[上一节](/2014/03/10/angular_scutech_step6)

在这一小节，我们将学习如何创建布局模板，和如何通过添加路由来创建多页面的应用，
将使用新的 Angular 模块```ngRoute```。

在开始之前，我们先来看看 [演示](/demos/angular-scutech/step7)，
也可以通过链接下载 [zip](/demos/angular-scutech/step7.zip) 包。

* 当你通过浏览器打开地址```index.html```时，会自动跳转到```index.html#products```并且显示产品列表。
* 当你点击某个产品时，会跳到相对应的产品信息页面中。

**依赖**

用到路由需要提供 angular 的依赖```angular-route.js```，我们把它加入到```index.html```中：

```
<script src="lib/angular/angular.js"></script>
<script src="lib/angular/angular-route.js"></script>
```

这样我们就可以使用```ngRoute```模块了。

**多页面，路由和布局模板**

我们的应用正在慢慢的变强大起来，在前几节中，我们提供了一个单页面（产品列表），并且所有的模板都放在```index.html```
中，下一步是增加一个页面来显示我们列表中每个产品的详细信息。

增加产品的详细信息页面，我们可以扩展```index.html```的内容，但是这样的话，随着页面的增加，我们的页面会变得凌乱起来。
在这里，我们使用布局模板来解决这一问题。

**模板**

首先，我们新建 partials 文件夹，用于存放模板文件。并新建```partials/list.html```：

```
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
    <div class="col-md-3">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="搜索" ng-model="query" />
        </div>
        <div class="form-group">
            <select class="form-control" ng-model="order">
                <option value="name">名称</option>
                <option value="age">发布时长</option>
            </select>
        </div>
    </div>
    <ul class="col-md-9 list-group">
        <li class="list-group-item" ng-repeat="product in products | filter:query | orderBy:order">
            <a href="#/product/{{product.id}}">
                <h4 class="list-group-item-heading">
                    <img ng-src="{{product.image}}" />
                    {{product.name}} - {{product.age}}年
                </h4>
            </a>
            <p class="list-group-item-text">
                {{product.info}}
            </p>
        </li>
    </ul>
</div>
```

我们把```index.html```中的内容 copy 到```list.html```了，并在 body 间加入了```ngView```指令，
```
<body ng-controller="ListCtrl">

<div ng-view></div>

</body>
```

接着，我们添加```partials/detail.html```文件，简单的加入：
```
detail view for {{productId}}
```
用于显示当前产品的 ID 信息。

**APP 模块**

在之前的小节中，我们仅仅只用到了```controllers.js```文件，为了更好的组织我们的代码结构，
在这里加入```app.js```，用于控制我们应用的入口和路由的配置信息：

```
var scutechApp = angular.module('scutechApp', [
    'ngRoute',
    'controllers'
]);

scutechApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/products', {
                templateUrl: 'partials/list.html',
                controller: 'ListCtrl'
            }).
            when('/products/:productId', {
                templateUrl: 'partials/detail.html',
                controller: 'DetailCtrl'
            }).
            otherwise({
                redirectTo: '/products'
            });
    }]);
```

这里配置了主模块，并且加入了```ngRoute```，表示我们将启用路由控制我们的界面。

* when('/products')：当 url 地址为 products 时，我们使用```list.html```模板，定义了控制器为```ListCtrl```
* when('/products/:productId')：当 url 地址为产品详细信息时，
我们使用```detail.html```模板，定义了控制器为```DetailCtrl```
* otherwise：表示默认为```/products```

因为在这里指定了控制器对应不同的模板页面，所以在```index.html```不需要在指定```ng-controller```了，
加入app.js之后，我们的```index.html```文件为：

```
<!doctype html>
<html lang="en" ng-app="scutechApp">
<head>
    <meta charset="utf-8">
    <title>Angular Scutech</title>
    <link rel="stylesheet" href="lib/bootstrap/css/bootstrap.css">
    <script src="lib/angular/angular.js"></script>
    <script src="lib/angular/angular-route.js"></script>
    <script src="js/app.js"></script>
    <script src="js/controllers.js"></script>
</head>
<body>

<div ng-view></div>

</body>
</html>
```

**控制器**

文件```controllers.js```：

```
var controllers = angular.module('controllers', []);

controllers.controller('ListCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('data/products.json').success(function(data) {
            $scope.products = data;
        });
        $scope.order = 'age';
    }
]);

controllers.controller('DetailCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.productId = $routeParams.productId;
    }
]);
```

注意到，我们创建了一个名叫```controllers```的module，对应 app.js 中的控制器名称，
用于告诉 AngularJS 使用相对应控制器（对于大型应用，你可能需要创建多个模块）。
在```DetailCtrl```中，用到了```$routeParams```，用于获取 url 的参数，
如：```/products/:productId```，直接用```$routeParams.productId```即可。

**扩展练习**

添加```{{order}}```绑定到```index.html```中，你会发现，该值一直为空，
这是因为我们把控制器的范围指定为具体的模块中去了，例如```ListCtrl```对应```list.html```，
```DetailCtrl```对应```detail.html```。

[上一节](/2014/03/10/angular_scutech_step6)

---

* [一步一步学习 AngularJS（一）](/2014/02/18/angular_scutech_step0)
* [一步一步学习 AngularJS（二）](/2014/02/19/angular_scutech_step1)
* [一步一步学习 AngularJS（三）](/2014/02/20/angular_scutech_step2)
* [一步一步学习 AngularJS（四）](/2014/02/21/angular_scutech_step3)
* [一步一步学习 AngularJS（五）](/2014/02/22/angular_scutech_step4)
* [一步一步学习 AngularJS（六）](/2014/02/23/angular_scutech_step5)
* [一步一步学习 AngularJS（七）](/2014/03/10/angular_scutech_step6)
* [一步一步学习 AngularJS（八）](/2014/04/22/angular_scutech_step7)
