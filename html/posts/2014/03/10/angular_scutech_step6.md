## 一步一步学习 AngularJS（七）

分类：前端技术 | 标签：AngularJS | 发布时间：2014-03-10 00:00:00

___

[上一节](/2014/02/23/angular_scutech_step5)

在这一小节，我们为列表中的产品添加图片和链接，下一小节将使用链接跳转到详细的页面。

在开始之前，我们先来看看 [演示](/demos/angular-scutech/step6)，
也可以通过链接下载 [zip](/demos/angular-scutech/step6.zip) 包。

现在可以看到产品图片和链接了，现在点击链接还没有任何的反应，因为我们还没进行任何的处理。

**数据**

我们增加了 images 文件夹用于存放我们的图片，并且为产品信息添加了```id```和```image```
两个属性，可以看到文件```data/products.json```（这里只列举了一条记录，
图片路径对应我们的实际的图片文件）：

```
[
    {
        "id": 1,
        "name": "鼎甲信息仓（Infokist）",
        "info": "一款将自主研发的一系列数据软件与云存储硬件深度整合为一体的数据保护系统。",
        "age": 2,
        "image": "images/infokist.png"
    },
    ...
]
```

**模板**

文件```index.html```：

```
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
```

我们增加了超链接并且设置 href 为```#/product/{{product.id}}```，以 id 作为我们的标志，
用于显示更详细的产品内容。

然后我们增加了图片标签，并且设置了 Angular 的```ngSrc```指令。这里你可能会有疑问，为什么不能用 src 属性呢？
需要注意的是，假如我们使用了 src 属性，那么浏览器在加载的时候会发送请求
到```http://localohost/images/{{product.image}}```，使用 F12 可以看到会导致 404 Not Found 的错误，
所以 Angular 提供了```ng-src```属性来避免这种错误。

**扩展练习**

将```ng-src```属性替换为原来的```src```属性，然后通过 F12（Chrome 的审查元素或者 Firefox 的 Firebug）
查看，会发现错误信息，这里可以加深理解 Angular 的工作原理。

[上一节](/2014/02/23/angular_scutech_step5)

---

* [一步一步学习 AngularJS（一）](/2014/02/18/angular_scutech_step0)
* [一步一步学习 AngularJS（二）](/2014/02/19/angular_scutech_step1)
* [一步一步学习 AngularJS（三）](/2014/02/20/angular_scutech_step2)
* [一步一步学习 AngularJS（四）](/2014/02/21/angular_scutech_step3)
* [一步一步学习 AngularJS（五）](/2014/02/22/angular_scutech_step4)
* [一步一步学习 AngularJS（六）](/2014/02/23/angular_scutech_step5)
* [一步一步学习 AngularJS（七）](/2014/03/10/angular_scutech_step6)
* [一步一步学习 AngularJS（八）](/2014/04/22/angular_scutech_step7)