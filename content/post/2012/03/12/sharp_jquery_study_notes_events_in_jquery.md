---
title: 《锋利的jQuery》学习笔记——jQuery中的事件
date: 2012-03-12
categories: [前端技术]
tags: [jQuery,事件]
---

​**1. 加载 DOM**
```
$(document).ready(function() {
	//代码
});
```

(1)执行时机：window.onload
方法在网页中所有的元素（包括愿你苏的所有关联文件）完全加载后才执行，而
$(document).ready() 在 DOM 完全就绪时就可以被调用

 • $(window).load()与 window.onload 等价

(2)可多次使用：window.onload 方法只能执行一次，而$(document).ready()
多次使用，根据注册的顺序依次执行

(3)简写方式
```
$().ready(function() {
	//代码
});
```

```
$(function() {
	//代码
});
```

​**2. 事件绑定**

 • bind(type[ , data], fn)

 • one(type[ ,data], fn)-只执行一次

(1)第一个参数type表示事件类型：blur、focus、load、resize、scroll、unload、click、dblclick、mousedown、mouseup、mousemove、mouseover、mouseout、mouseenter、mouseleave、change、select、submit、keydown、keypress、keyup和error等

(2)第二个为可选参数，为做 event.data 属性传递给事件对象的额外数据

(3)第三个参数是用来绑定的处理函数

 • 事件简写：$(variable).bind(type [, data], fn) 简写为
$(variable).type(fn)


​**3. 合成事件**

(1)hover(fn, fn)方法-是 mouseover(fn) 和 mouseout(fn) 的合成

(2)toggle(fn1, fn2, ...)

 • 用于模拟鼠标连续单击事件，当点击事件时重复对设置的函数进行调用

 • 用于切换元素的可见状态


​**4. 事件冒泡**

(1)事件冒泡是指事件会按照 DOM 的层次结构像水泡一样不断向上直至顶端

(2)事件冒泡可能会引起预料之外的效果，可以使用

 • event.stopPropagation()-停止事件冒泡

 • event.preventDefault()-阻止默认行为

 • return false-停止事件冒泡或者阻止默认行为


​**5. 事件对象的属性**

 • event.type()-获取事件的类型

 • event.target()-获取到触发事件的元素

 • event.relatedTarget()-获取触发事件的相关元素

 • event.pageX()-获取鼠标相对于页面的 x 坐标

 • event.pageY()-获取鼠标相对于页面的 y 坐标

 •
event.which()-在鼠标单击事件中获取鼠标的左(1)、中(2)、右健(3)；在键盘事件中获取键盘的按键

 • event.metaKey()-键盘事件中获取 ctrl 按键

 • event.originalEvent()-指向原始的事件对象


​**6. 移除事件**

 • unbind([type][ ,data])

(1)第一个参数为事件类型，第二个参数为要移除的函数

(2)没有参数，删除所有绑定的事件

(3)提供事件类型为参数，只删除该类型的绑定事件

(4)提供处理函数作为第二个函数，只删除提供的特定事件


**7. 模拟事件操作**

(1)模拟点击事件

 • $(variable).trigger("click")

 • $(variable).click()

(2)触发自定义事件

 • $(variable).bind("customEvent", fn);

   $(variable).trigger("customEvent");
