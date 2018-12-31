---
title: 一步一步学习 AngularJS（六）
date: 2014-02-23 00:00:00
categories: [前端技术]
tags: [AngularJS]
---

[上一节](/2014/02/22/angular_scutech_step4)
[下一节](/2014/03/10/angular_scutech_step6)

在之前几个小节中，我们的列表都是使用固定的数据。
在这一小节，我们使用 $http 请求从后台获取数据。

在开始之前，我们先来看看 [演示](/demos/angular-scutech/step5)，
也可以通过链接下载 [zip](/demos/angular-scutech/step5.zip) 包。

**数据**

我们在当前文件夹下增加了 data 文件夹，并将我们的列表保存为 JSON 格式放到```data/products.json```文件中：
```
[
    {
        "name": "鼎甲信息仓（Infokist）",
        "info": "一款将自主研发的一系列数据软件与云存储硬件深度整合为一体的数据保护系统。",
        "age": 2
    },
    {
        "name": "鼎甲迪备（DBackup）",
        "info": "一款分布式运维级数据库存储备份管理软件，广泛支持主流的操作系统平台以及数据库类型。",
        "age": 4
    },
    {
        "name": "鼎甲安备（AnBay）",
        "info": "一款为文件系统提供全面的SaaS（Software-as-a-Service）数据保护的“云备份”产品。",
        "age": 3.5
    },
    {
        "name": "鼎甲奥备（OBackup）",
        "info": "一款通过简单的图形化界面操作就可迅速完成的Linux操作系统备份和裸机恢复软件。",
        "age": 3
    },
    {
        "name": "鼎甲智备（WBackup）",
        "info": "一款基于云存储的远程异的移动终端备份软件。",
        "age": 1.5
    },
    {
        "name": "鼎甲数据卫士（GBackup）",
        "info": "一款专门用于Windows系统的各种类型文件、文件夹以及程序的单机备份和恢复的软件。",
        "age": 1
    }
]
```

**控制器**

我们 Angular 提供的使用 [$http](http://docs.angularjs.org/api/ng/service/$http) 服务来发送 http 请求，
类似于 jQuery 的 ajax 请求，例如 $http.get 相当于 jQuery 的 $.get，$http.post 相当于 jQuery 的 $.post。

文件```js/controllers.js```：
```
var scutechApp = angular.module('scutechApp', []);

scutechApp.controller('ListCtrl', function ($scope, $http) {
    $http.get('data/products.json').success(function(data) {
        $scope.products = data;
    });
    $scope.order = 'age';
});
```

可以看到，我们通过 http 的 GET 方法，发送请求到地址为 data/products.json（这里相当于我们上面新建的文件，
跟在服务器去获取是一样的道理，但是涉及到跨域的问题，所以这里用本地文件作为演示），服务器返回了一个 JSON
格式的数据，即我们的列表数据。

$http 服务返回了一个 [promise](http://docs.angularjs.org/api/ng/service/$q) 对象，这个 promise
对象有一个```success```的方法，我们使用这个方法来处理异步返回的数据，并且将返回的数据绑定到```$scope.products```
变量中，从而通知我们的视图做出相对应的更新。

$http 服务的使用和 $scope 一样，我们只需要通过注入的方式即可，使用起来很简单。
```
scutechApp.controller('ListCtrl', function ($scope, $http) {...}
```

Angular 的依赖注入提供了一系列的服务给我们使用，例如后面会讲到的 ```$resource```、```$animate```也是一样的道理。
需要注意的是，参数的名称必须是有意义的，因为 Angular 就是通过名字进行依赖查找的。

**$前缀的命名规范**

我们可以创建属于自己的服务，后面应该会提到。根据 Angular 的命名规范，提供的服务都是以 $ 为前缀进行命名的，
例如 $scope、$http、$resource 等等。

也就是说，$前缀在 Angular 中代表提供的服务的命名空间，为了避免与 Angular 提供的服务进行冲突，
我们不建议使用 $前缀进行自定义服务的命名。

**极简化改进**

上面提到，Angular 是通过服务名进行查找，然后依赖注入的，但是这样子就相当于将所有的参数都传递进来了。
这里涉及到一个概念，就是 [极简化](http://zh.wikipedia.org/wiki/%E6%A5%B5%E7%B0%A1%E5%8C%96)，意思是说，
我们只需要传递我们需要的参数就可以了，这样就可以优化我们的程序。

那么，我们应该如何改进我们的程序呢？

有两种方法：

* 可以为控制器方法创建一个```$inject```属性，这个属性是一个保存我们所需要注入的服务的名称，例如：

```
funciton ListCtrl($scope, $http) {...}
ListCtrl.$inject = ['$scope', '$http'];
scutechApp.controller('ListCtrl', ListCtrl);
```

* 使用单行括号来声明我们需要的服务，然后最后一个参数是我们的控制器方法：

```
funciton ListCtrl($scope, $http) {...}
scutechApp.controller('ListCtrl', ['$scope', '$http', ListCtrl]);
```

在实际使用中，我们会使用第二种方法，并且写成了一行，改进后的代码为：

```
var scutechApp = angular.module('scutechApp', []);

scutechApp.controller('ListCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('data/products.json').success(function(data) {
            $scope.products = data;
        });
        $scope.order = 'age';
    }
]);
```

**扩展练习**

在```index.html```的最后面，我们可以通过增加```{{products | json}}```来查看我们的列表信息（JSON格式）。

在控制器```js/controllers.js```中，我们可以通过预处理，只显示两条记录（实际项目中可能会对列表做一些处理）：
```
$scope.products = data.splice(0, 2);
```


[上一节](/2014/02/22/angular_scutech_step4)
[下一节](/2014/03/10/angular_scutech_step6)

---

* [一步一步学习 AngularJS（一）](/2014/02/18/angular_scutech_step0)
* [一步一步学习 AngularJS（二）](/2014/02/19/angular_scutech_step1)
* [一步一步学习 AngularJS（三）](/2014/02/20/angular_scutech_step2)
* [一步一步学习 AngularJS（四）](/2014/02/21/angular_scutech_step3)
* [一步一步学习 AngularJS（五）](/2014/02/22/angular_scutech_step4)
* [一步一步学习 AngularJS（六）](/2014/02/23/angular_scutech_step5)
* [一步一步学习 AngularJS（七）](/2014/03/10/angular_scutech_step6)
* [一步一步学习 AngularJS（八）](/2014/04/22/angular_scutech_step7)