## 一步一步学习 AngularJS（二）

分类：前端技术 | 标签：AngularJS | 发布时间：2014-02-19 00:00:00

___

[上一节](/2014/02/18/angular_scutech_step0)
[下一节](/2014/02/20/angular_scutech_step2)

在这一小节，为了说明 Angular 是如何增强标准 HTML 的，这一节我们来创建静态的 HTML 页面，
顺便也会用到 bootstrap 相关的组件，然后下一节我们将使用 Angular，通过创建模板动态生成和显示相同的页面。

在开始之前，我们先来看看 [演示](/demos/angular-scutech/step1)，
也可以通过链接下载 [zip](/demos/angular-scutech/step1.zip) 包。

页面现在显示鼎甲科技的6个产品列表以及简单的产品介绍。

文件```index.html```

```
<div class="container">
    <ul class="list-group">
        <li class="list-group-item">
            <h4 class="list-group-item-heading">鼎甲信息仓（Infokist）</h4>
            <p class="list-group-item-text">
                一款将自主研发的一系列数据软件与云存储硬件深度整合为一体的数据保护系统。
            </p>
        </li>
        <li class="list-group-item">
            <h4 class="list-group-item-heading">鼎甲迪备（DBackup）</h4>
            <p class="list-group-item-text">
                一款分布式运维级数据库存储备份管理软件，广泛支持主流的操作系统平台以及数据库类型。
            </p>
        </li>
        <li class="list-group-item">
            <h4 class="list-group-item-heading">鼎甲安备（AnBay）</h4>
            <p class="list-group-item-text">
                一款为文件系统提供全面的SaaS（Software-as-a-Service）数据保护的“云备份”产品。
            </p>
        </li>
        <li class="list-group-item">
            <h4 class="list-group-item-heading">鼎甲奥备（OBackup）</h4>
            <p class="list-group-item-text">
                一款通过简单的图形化界面操作就可迅速完成的Linux操作系统备份和裸机恢复软件。
            </p>
        </li>
        <li class="list-group-item">
            <h4 class="list-group-item-heading">鼎甲智备（WBackup）</h4>
            <p class="list-group-item-text">
                一款基于云存储的远程异的移动终端备份软件。
            </p>
        </li>
        <li class="list-group-item">
            <h4 class="list-group-item-heading">鼎甲数据卫士（GBackup）</h4>
            <p class="list-group-item-text">
                一款专门用于Windows系统的各种类型文件、文件夹以及程序的单机备份和恢复的软件。
            </p>
        </li>
    </ul>
</div>
```

其中，```list-group```是bootstap 提供的列表组件（也提供了其他的一些组件），
详细见[列表](http://v3.bootcss.com/components/#list-group)，
通过增加 ```list-group-item```、```list-group-item-heading```、```list-group-item-text```
这些 class 类来显示我们的列表。


**扩展练习**

添加静态内容到```index.html```中，例如：

```
<p>产品个数：6</p>
```

[上一节](/2014/02/18/angular_scutech_step0)
[下一节](/2014/02/20/angular_scutech_step2)

---

* [一步一步学习 AngularJS（一）](/2014/02/18/angular_scutech_step0)
* [一步一步学习 AngularJS（二）](/2014/02/19/angular_scutech_step1)
* [一步一步学习 AngularJS（三）](/2014/02/20/angular_scutech_step2)
* [一步一步学习 AngularJS（四）](/2014/02/21/angular_scutech_step3)
* [一步一步学习 AngularJS（五）](/2014/02/22/angular_scutech_step4)
* [一步一步学习 AngularJS（六）](/2014/02/23/angular_scutech_step5)
* [一步一步学习 AngularJS（七）](/2014/03/10/angular_scutech_step6)