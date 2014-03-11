## 一步一步学习 AngularJS（五）

分类：前端技术 | 标签：AngularJS | 发布时间：2014-02-22 00:00:00

___

[上一节](/2014/02/21/angular_scutech_step3)
[下一节](/2014/02/23/angular_scutech_step5)

在这一小节，我们增加一个功能可以用来对列表进行排序。

在开始之前，我们先来看看 [演示](/demos/angular-scutech/step4)，
也可以通过链接下载 [zip](/demos/angular-scutech/step4.zip) 包。

可以看到在搜索框下面，我们用一个下拉列表来显示排序的信息。

**模板**

文件```index.html```：

```
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
            <h4 class="list-group-item-heading">{{product.name}} - {{product.age}}年</h4>
            <p class="list-group-item-text">{{product.info}}</p>
        </li>
    </ul>
</div>
```

在这个页面中，我们做了一些修改：

* 首先，我们增加了模型名称为```order```的```select```下拉列表，可以选择按照不同的条件进行排序。

* 我们在过滤器```filter```的后面增加了```orderBy```函数，从而更进一步去处理列表。```orderBy```
是一个接受数组，并对数组进行拷贝排序后返回想要的数组。

Angular 创建了一个从选择框到模型```order```之间的双向绑定，并且作为```orderBy```函数的参数。

**控制器**

文件```js/controllers.js```：
```
var scutechApp = angular.module('scutechApp', []);

scutechApp.controller('ListCtrl', function ($scope) {
    $scope.products = [
        {
            'name': '鼎甲信息仓（Infokist）',
            'info': '一款将自主研发的一系列数据软件与云存储硬件深度整合为一体的数据保护系统。',
            'age': 2
        },
        {
            'name': '鼎甲迪备（DBackup）',
            'info': '一款分布式运维级数据库存储备份管理软件，广泛支持主流的操作系统平台以及数据库类型。',
            'age': 4
        },
        {
            'name': '鼎甲安备（AnBay）',
            'info': '一款为文件系统提供全面的SaaS（Software-as-a-Service）数据保护的“云备份”产品。',
            'age': 3.5
        },
        {
            'name': '鼎甲奥备（OBackup）',
            'info': '一款通过简单的图形化界面操作就可迅速完成的Linux操作系统备份和裸机恢复软件。',
            'age': 3
        },
        {
            'name': '鼎甲智备（WBackup）',
            'info': '一款基于云存储的远程异的移动终端备份软件。',
            'age': 1.5
        },
        {
            'name': '鼎甲数据卫士（GBackup）',
            'info': '一款专门用于Windows系统的各种类型文件、文件夹以及程序的单机备份和恢复的软件。',
            'age': 1
        }
    ];
    $scope.order = 'age';
});
```

我们修改了```products```列表的数据，为每条记录增加了```age```属性，用于排序，对应于上面的：
```
<option value="age">发布时长</option>
```

然后增加了：
```
$scope.order = 'age';
```
表示我们将 age 作为默认的排序值，假如没有为它设置值，下拉列表将会为空，这个可以在扩展练习中尝试下。

这里涉及到了一个很重要的双向绑定的概念。可以看到，当页面加载完成的时候，下拉列表会自动选择“发布时长”，
这是因为我们在控制器中将```order```默认设置为```age```，这里就是从模型（model）到视图（view）的绑定。
而当你改变下拉列表的值（名称）后，模型（model）将会相对应的更新为```name```，列表也会进行重新排序，
这是从视图（view）到模型（model）的绑定。

**拓展练习**

删除控制器中的：
```
$scope.order = 'age';
```

通过F12，可以看到在下拉列表增加了：
```
<option value="? undefined:undefined ?"></option>
```

假如要改变排序的顺序，可以通过加上```-```号，不加的话相当于“asc”，加了就变成了“desc”：
```
$scope.order = '-age';

<option value="-age">发布时长</option>
```

[上一节](/2014/02/21/angular_scutech_step3)
[下一节](/2014/02/23/angular_scutech_step5)

---

* [一步一步学习 AngularJS（一）](/2014/02/18/angular_scutech_step0)
* [一步一步学习 AngularJS（二）](/2014/02/19/angular_scutech_step1)
* [一步一步学习 AngularJS（三）](/2014/02/20/angular_scutech_step2)
* [一步一步学习 AngularJS（四）](/2014/02/21/angular_scutech_step3)
* [一步一步学习 AngularJS（五）](/2014/02/22/angular_scutech_step4)
* [一步一步学习 AngularJS（六）](/2014/02/23/angular_scutech_step5)