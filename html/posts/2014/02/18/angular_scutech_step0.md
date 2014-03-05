## 一步一步学习 AngularJS（一）

分类：前端技术 | 标签：AngularJS | 发布时间：2014-02-18 00:00:00

___

今天开始一步一步学习 AngularJS 的教程之旅。

在这一小节中，我们将学习最基础、同时也是重要的代码结构和数据绑定。

在开始之前，我们先来看看 [演示](/demos/angular-scutech/step0)，
也可以通过链接下载 [zip](/demos/angular-scutech/step0.zip) 包。

可能没有让你觉得很兴奋，不过一切都只是开始。

可以看到页面显示“现在还没有任何内容！”，通过查看 html 的代码，
可以看到一些我们所需要的 Angular 的简单的关键字。

文件```index.html```

```
<!doctype html>
<html lang="en" ng-app>
<head>
    <meta charset="utf-8">
    <title>Angular Scutech</title>
    <link rel="stylesheet" href="lib/bootstrap/css/bootstrap.css">
    <script src="lib/angular/angular.js"></script>
</head>
<body>

<p>现在还没有任何{{'内容' + '！'}}</p>

</body>
</html>
```

**这些代码都做了什么事情呢？**

指令```ng-app```：

```
<html ng-app>
```

```ng-app```标签代表 Angular 中名叫```ngApp```的指令
（Angular 使用连接符-来定义它的标签，如```ng-app```，
与其相对应的规则为驼峰命名，如```ngApp```），这里表示我们的应用程序是作用于根元素
```html```下，对开发者而言可以将 angular 应用于整个页面中，
也可以作为你的应用的一部分，例如用到了其他的框架。

样式标签：

```
<link rel="stylesheet" href="lib/bootstrap/css/bootstrap.css">
```

表示我们的应用是基于 [bootstrap](http://getbootstrap.com) 的。

脚本标签：

```
<script src="lib/angular/angular.js"></script>
```

引用 angular 的脚本，当脚本加载完成之后，Angular 会寻找```npApp```指令，
假如找到这个标签，Angular 会为项目解析该标签下的元素，并启用应用程序。

绑定表达式的双括号行：

```
现在还没有任何{{'内容' + '！'}}
```
这一行演示了 Angular 的核心功能——数据模板绑定，通过```{{}}```来绑定我们的内容。
绑定标签告诉 Angular 运行括号内的表达式并插入到相对应的 DOM 中，当表达式进行改变的时候，
DOM 中的内容会相对应的作出改变，这就是所谓的实时动态绑定。

这里的表达式可以是一个变量，也可以是一个运算符，在插入数据之前，
Angular 会先解析并运行想对应的表达式。

**启用 AngularJS 应用程序**

在上面的内容中，我们知道，使用```ngApp```标签可以自动启用我们的程序。
当然，你也可以通过[手动](http://docs.angularjs.org/guide/bootstrap)来启用 Angular。

在启用的过程中，Angular 主要做了三件事情：

* [injector](http://docs.angularjs.org/api/auto/service/$injector) 会被自动创建用于依赖注入

* 接下来 injector 会创建根变量```root scope```作为应用程序的数据模块

* Angular 会从```ngApp```根元素开始，“编译”解析，处理所有的指令和绑定。

在本小节中，我们的应用程序很简单，我们只是添加了简单的静态绑定，数据模型是空的。

![](/posts/2014/02/18/tutorial_0.png)

**扩展练习**

试着添加其他的绑定元素，并查看结果，例如：
```
<p>1 + 2 = {{ 1 + 2 }}</p>
```

---

* [一步一步学习 AngularJS（一）](/2014/02/18/angular_scutech_step0)
* [一步一步学习 AngularJS（二）](/2014/02/19/angular_scutech_step1)
* [一步一步学习 AngularJS（三）](/2014/02/20/angular_scutech_step2)
* [一步一步学习 AngularJS（四）](/2014/02/21/angular_scutech_step3)
* [一步一步学习 AngularJS（五）](/2014/02/22/angular_scutech_step4)
* [一步一步学习 AngularJS（六）](/2014/02/23/angular_scutech_step5)
* [一步一步学习 AngularJS（七）](/2014/02/24/angular_scutech_step6)
* [一步一步学习 AngularJS（八）](/2014/02/27/angular_scutech_step7)
* [一步一步学习 AngularJS（九）](/2014/02/28/angular_scutech_step8)
* [一步一步学习 AngularJS（十）](/2014/03/01/angular_scutech_step9)
* [一步一步学习 AngularJS（十一）](/2014/03/02/angular_scutech_step10)
* [一步一步学习 AngularJS（十二）](/2014/03/03/angular_scutech_step11)