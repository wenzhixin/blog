---
title: 一步一步学习 AngularJS（四）
date: 2014-02-21
categories: [前端技术]
tags: [AngularJS]
---

[上一节](/2014/02/20/angular_scutech_step2)
[下一节](/2014/02/22/angular_scutech_step4)

在这一小节，我们增加一个简单的```input```输入框，用于搜索。

在开始之前，我们先来看看 [演示](/demos/angular-scutech/step3)，
也可以通过链接下载 [zip](/demos/angular-scutech/step3.zip) 包。

**控制器**

我们没有改变控制器的任何代码。

**模板**

文件：```index.html```
```
<div class="container">
    <div class="col-md-3">
        <input type="text" class="form-control" placeholder="搜索" ng-model="query" />
    </div>
    <ul class="col-md-9 list-group">
        <li class="list-group-item" ng-repeat="product in products | filter:query">
            <h4 class="list-group-item-heading">{{product.name}}</h4>
            <p class="list-group-item-text">{{product.info}}</p>
        </li>
    </ul>
</div>
```

我们修改我们的模板代码，```col-md-3```、```col-md-9```
都是 bootstrap 提供的类，表示将搜索栏和列表分别放在左右两边，```form-control```
将 input 设置为 bootstrap 的风格。

看到为 input 输入框增加了```ng-model```指令，表示我们的模型是```query```，
而在```ng-repeat```中加入了 filter 函数用于处理输入框的模型。

当你在输入框中输入内容的时候会立即看到列表的变化。

这些新代码表明了：

* 数据绑定：这是 AngularJS 的一个核心功能，当页面加载后，AngularJS 在模型中绑定了相同的名字的变量，
从而保证视图和模型之间的同步。

* 使用```filter```函数过滤内容：```filter```函数使用```query```参数去创建新的只包含输入框内容的列表。
从而自动更新列表的内容，达到搜索的功能。

**扩展练习**

增加一个绑定显示当前的搜索内容：
```
<p>输入的内容：{{query}}</p>
```

假如我想把搜索内容显示在页面的标题上呢？

是不是通过设置：
```
<title>Angular Scutech：{{query}}</title>
```

就可以了呢？通过实践我们可以知道，并不能达到我们想要的结果，这是为什么呢？

因为我们的控制器是放在 body 标签上的，这样使用 query 变量的话就超出我们的作用域了：
```
<body ng-controller="ListCtrl">
```

我们可以把控制移动到 html 标签上，就可以了：
```
<html lang="en" ng-app="scutechApp" ng-controller="ListCtrl">
```

但是这里有个小问题，就是使用```{{}}```的时候在最初加载的时候，显示为```Angular Scutech：{{query}}```，很不美观。

在 AngularJS 中，我们可以使用```ngBind```（用于绑定变量，例如```ng-bind="query"```）
或者```ngBindTemplate```（用于绑定模块，例如```ng-bind-template="Angular Scutech：{{query}}"```）
来代替双括号进行数据绑定，例如我们用下面的代码就可以了：
```
<title ng-bind="Angular Scutech：{{query}}">Angular Scutech</title>
```

到这里，你是不是对 AngularJS 的数据绑定有所理解了呢:-)

[上一节](/2014/02/20/angular_scutech_step2)
[下一节](/2014/02/22/angular_scutech_step4)

---

* [一步一步学习 AngularJS（一）](/2014/02/18/angular_scutech_step0)
* [一步一步学习 AngularJS（二）](/2014/02/19/angular_scutech_step1)
* [一步一步学习 AngularJS（三）](/2014/02/20/angular_scutech_step2)
* [一步一步学习 AngularJS（四）](/2014/02/21/angular_scutech_step3)
* [一步一步学习 AngularJS（五）](/2014/02/22/angular_scutech_step4)
* [一步一步学习 AngularJS（六）](/2014/02/23/angular_scutech_step5)
* [一步一步学习 AngularJS（七）](/2014/03/10/angular_scutech_step6)
* [一步一步学习 AngularJS（八）](/2014/04/22/angular_scutech_step7)
