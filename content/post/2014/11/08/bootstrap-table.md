---
title: 开源所带来的——记 DBackup 4.0 发布和 Bootstrap Table 插件的开发
date: 2014-11-08 02:14:00
categories: [前端技术]
tags: [DBackup,Bootstrap Table]
---

### 源起

最最开始的时候，在写公司的考勤系统，系统的功能十分简单，只需要简单地查询数据和展示数据（无需增加、修改和删除），后台接口使用的是标准的 Restful API，例如接口`/api/url1`返回这样的数组：

```json
[
    {
        "name": "文翼",
        "startTime": "09:00",
        "endTime": "18:00"
    }
]
```

接口`/api/url2`返回这样的数组：

```json
[
    {
        "name": "文翼",
        "job": "Web开发工程师"
    }
]
```

一般的做法是遍历返回来的数据并对每一行的数据进行渲染为`tr`，然后再`append`到表格中。由于自己十分的“懒”，很多时候宁愿写出个工具（当然有时候可能花的时候会更多），也不想写重复的代码，做重复、无用的工作。现在系统有 5 个不同的接口，需要显示为 5 个不同的表格。要是能使用这样的代码，而无需使用 JavaScript 去对不同的 API 接口进行渲染组装，那该多省心省事：

```html
<table data-url="/api/url1">
    <thead>
    <tr>
        <td data-field="name">姓名</td>
        <td data-field="startTime">上班时间</td>
        <td data-field="endTime">下班时间</td>
    </tr>
    </thead>
</table>

<table data-url="/api/url2">
    <thead>
    <tr>
        <td data-field="name">姓名</td>
        <td data-field="job">工作</td>
    </tr>
    </thead>
</table>
```

可以看到，这样的话我们无需写一行 JavaScript 的代码就能实现我们想要的功能了。于是乎，Bootstrap Table 的 1.0.0 版本就这样面世了，只有最最简单的显示的功能，没有单选、多选、排序和分页等复杂的功能。

### 开源和改善

因为 Bootstrap Table 支持标准的 Restful API 接口，我便将其开源到 GitHub 上（6月份），并尝试着模仿 Bootstrap JavaScript Plugin 的文档说明，编写了全英文的文档（其实也没几个属性、方法和事件）。而在当时，由于公司最主要的产品 DBackup，并没有使用 Restful 接口 API，所以无法将其应用到自己的产品开发中。

随着其他的产品也应用到 Bootstrap Table，我便加入了单选、多选、排序等功能。而在 GitHub 上，关注 Bootstrap Table 的人也多了起来，时不时有人给我提建议和一些新的功能，而大部分是很好的建议。并认真地考虑，加上了大部分觉得合理的功能。

到发布 1.2.0 的时候（8月），我在想是不是应该应用到主要产品DBackup呢，只是要使用的话就得重构后台接口。不能浪费了，重构就重构，于是便开始为 DBackup 编写标准的 Restful API 文档，我们在开发的过程中往往习惯了根据后台接口，然后选择前端的实现。而 Bootstrap Table 是根据标准的 Restful API 来实现的，这反而能更好地使产品的接口更加规范化、文档化。

那么，或许你会问，开源又带来了什么？

在 GitHub 上，我们可以看到很多 Web 开源项目，而这些开源项目的工程师也乐于维护和改善这些开源项目，例如：Twitter 的 [bootstrap](https://github.com/twbs/bootstrap)，Facebook 的 [react](https://github.com/facebook/react)，阿里的 [seajs](https://github.com/seajs/seajs)，还有 [node](https://github.com/joyent/node)，[backbone](https://github.com/jashkenas/backbone)，[angular.js](https://github.com/angular/angular.js) 等等。

我在签名档上写道：

> I am making the world better by developing open-source JavaScript libraries.

开源，就是为了使世界更加美好！哈哈，难道不是吗！

![](/2014/11/08/1.png)

![](/2014/11/08/2.png)

时至今日，Bootstrap Table 项目已有 488 个 Star 和 109 个 Fork（分支），47 个 Pull Requests，支持 20 种语言（翻译），以及 4 个插件扩展。除了我自己，有很多热心开发者为其提交了很多有用的代码，插件扩展和建议。

对于插件来说，因为开源，使其不断的完善和改进！

对于公司产品来说，因为开源，越来越规范化和模块化！

对于我来说，因为开源，自己的英文水平、代码规范化以及项目管理相关的方面也在不断提高！

### Bootstrap Table 的强大之处

说了这么多，Bootstrap Table 的强大之处还是需要用个简单的例子来说明，除了上面用 html 的方式外，这里使用 JavaScript 的方式：

定义 html（只需要一句话）：
```html
<table id="table"></table>
```

使用：
```js
$('#table').bootstrapTable({
    url: '/api/url', // 接口 URL 地址
    cache: false, // 不缓存
    height: 400, // 设置高度，会启用固定表头的特性
    striped: true, // 隔行加亮
    pagination: true, // 开启分页功能
    pageSize: 50, // 设置默认分页为 50
    pageList: [10, 25, 50, 100, 200], // 自定义分页列表
    search: true, // 开启搜索功能
    showColumns: true, // 开启自定义列显示功能
    showRefresh: true, // 开启刷新功能
    minimumCountColumns: 2, // 设置最少显示列个数
    clickToSelect: true, // 单击行即可以选中
    sortName: 'name', // 设置默认排序为 name
    sortOrder: 'desc', // 设置排序为反序 desc
    smartDisplay: true, // 智能显示 pagination 和 cardview 等
    columns: [{ // 列设置
        field: 'state',
        checkbox: true // 使用复选框
    }, {
        field: 'id',
        title: 'Item ID',
        align: 'right',
        valign: 'bottom',
        sortable: true // 开启排序功能
    }, {
        field: 'name',
        title: 'Item Name',
        align: 'center',
        valign: 'middle',
        sortable: true,
        formatter: nameFormatter
    }, {
        field: 'price',
        title: 'Item Price',
        align: 'left',
        valign: 'top',
        sortable: true,
        formatter: priceFormatter,
        sorter: priceSorter
    }, {
        field: 'operate',
        title: 'Item Operate',
        align: 'center',
        valign: 'middle',
        clickToSelect: false,
        formatter: operateFormatter,
        events: operateEvents
    }]
});
```

我们可以看到，通过简单的设置，就可以拥有强大的单选、多选、排序、分页，以及编辑、导出、过滤（扩展）等等的功能了：

![](/2014/11/08/3.png)

---

最后，今天，我们的产品 DBackup 发布了 4.0 版本，其中一整个大模块已经全部重构为使用 Bootstrap Table 和标准的 Restful 接口。虽说距离全部还有一段时间和距离，但我坚信，Bootstrap Table 会越做越强大，产品也会越来越规范，越做越好用！
