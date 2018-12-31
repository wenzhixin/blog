---
title: 表格固定表头的问题和解决方案
date: 2014-08-10 00:00:00
categories: [前端技术]
tags: [bootstrap-table,固定表头]
---
在写插件[bootstrap table](https://github.com/wenzhixin/bootstrap-table)的时候，当数据过多的时候，需要对表格的 ```thead```进行固定，然后滚动表格的```tbody```。但是在实际的操作上，花了很多的时间在这个问题上，到现在也没有找到完美的解决方案，在这里记录下这个问题。

### 方案一(<=1.0.6)

最开始的解决方法是通过设置```th```中的```div```的 ```position```为```absolute```，从而达到固定表头的效果：

```
<thead>
    <tr>
        <th>
            <div class="th-inner" style="position: absolute; width: 197px;">
                Item ID
            </div>
        </th>
        <th>
            <div class="th-inner" style="position: absolute; width: 346px;">
                Item Name
            </div>
        </th>
        <th>
            <div class="th-inner" style="position: absolute; width: 255px;">
                Item Price
            </div>
        </th>
    </tr>
</thead>
```

这里的```width```，是需要通过对```tbody```的第一行元素的宽度进行计算出来的。

这个方法虽然可行，但是会出现如：
[https://github.com/wenzhixin/bootstrap-table/issues/34](https://github.com/wenzhixin/bootstrap-table/issues/34) 这个问题所描述的当表头文字过长，而表格内容过短，就会显示 ... 的问题，显然这种方法是存在很大的问题的。

### 方案二(<=1.1.2)

参考了很多方法，方案二使用 jQuery 的````clone```方法生成两个相同的 table，并将第一个 table 的```tbody```和第二个 table 的```thead```隐藏起来，这里需要将第一个 table 的```overflow```设置为```hidden```，第二个 table 的```margin-top```设置为第一个 table 表头的负高度。

这个方案适应所有的浏览器，但是会出现如：
[https://github.com/wenzhixin/bootstrap-table/issues/52](https://github.com/wenzhixin/bootstrap-table/issues/52) 这个问题所描述的当使用浏览器自带的搜索时，会出现两处相同的内容，并且出现在表头处（overflow 会自动调整），显然这种方法会对用户造成困扰和极大的影响用户体验。

### 方案三

方案三参考了许多 GitHub 上其他实现固定表头的 jQuery 插件，例如：[fixedheadertable](http://www.fixedheadertable.com/)和[datatables](http://datatables.net/extensions/fixedheader/)，跟方案二有点类似，他们都是通过 clone 表格的```thead```，然后将其固定住，并根据原来 table 的每一列的宽度重新计算设置固定表头的宽度，关键代码如下：
```
this.$body.find('tr:first-child:not(.no-records-found) > *').each(function(i) {
    that.$header_.find('div.fht-cell').eq(i).width($(this).innerWidth());
});
```

这个办法是可行的，但是发现了一个小瑕疵，那就是使用 firefox （其他浏览器都正常使用）的时候，即使表头的宽度和原来表格的宽度一模一样，有时候会渲染的不是很完美（刚刚提到的其他插件也存在这个问题），如下图显示。

![](/2014/08/10/1.png)

___

PS: 或许有更好的实现方法，不断改进。。。
