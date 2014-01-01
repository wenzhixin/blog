## bootstrap menu 插件介绍

分类：前端技术 | 标签：bootstrap、menu、插件 | 发布时间：2013-12-29 00:00:00

___

### 前言

平时在定义目录菜单的时候会使用 ul、li 等，定义和维护起来不是很方便，
所以就写成了 bootstrap 的 jQuery 的[插件](https://github.com/wenzhixin/bootstrap-menu)。

### 如何使用

使用起来非常简单，先来看看如何使用吧：

首先引入需要的文件
```
<link rel="stylesheet" href="bootstrap-menu.css" />
<script src="bootstrap-menu.js"></script>
```

接着定义一个 div
```
<div id="menu" class="bs-menu"></div>
```

使用 js 初始化插件，定义了 Menu1 的菜单
```
$('#menu').bootstrapMenu({
	data: [{
		name: 'menu1',
		title: 'Menu1',
		icon: 'images/1.png'
	}]
});
```

效果可以查看 [demo](http://wenzhixin.net.cn/p/bootstrap-menu/)

### 属性

#### width

定义菜单的宽度

类型：整数值

默认：180

#### isOpen

定义是否展开菜单

类型：布尔值

默认：false

#### data

定义菜单数据

类型：对象数组

默认：[]

对象属性值：

* name: 菜单的 name，用于标志
* title：菜单的标题
* icon：菜单的图标
* url：菜单的链接，不填可以通过事件监听
* children：子菜单（有 name、title、url 三个属性）

### 事件

#### onToggle

切换主菜单的时候触发

index：点击菜单的 index 值

例子：
```
$('#menu').bootstrapMenu({
	onToggle: function(index) {
		console.log(index);
	}
});
```

#### onSelect

点击子菜单的时候触发

name：点击的子菜单的 name 指

例子：
```
$('#menu').bootstrapMenu({
	onSelect: function(name) {
		console.log(name);
	}
});
```
