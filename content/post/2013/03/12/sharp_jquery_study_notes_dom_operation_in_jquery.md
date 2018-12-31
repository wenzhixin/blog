---
title: 《锋利的jQuery》学习笔记——jQuery中的DOM操作
date: 2012-03-12
categories: [前端技术]
tags: [jQuery,DOM]
---

​**1. 什么是DOM？**

 • DOM 是 Document Object Model 的缩写，是指文档对象模型

**​2. DOM操作的分类**

(1)DOM Core-可用来处理任何一种使用标记语言的文档

 • getElementById()

 • getElementByTagName()

 • getAttribute()

 • setAttribute()

(2)HTML\_DOM-提供一些简明的记号来描述各种 HTML 元素的属性

(3)CSS\_DOM-针对 CSS 的操作，主要是获取和设置 style 对象的各种属性

**​3. jQuery中的DOM操作**

(1)查找节点-通过 jQuery 选择器来进行查找

(2)创建节点-使用 jQuery 的工厂函数$()来创建

 • $(html)

(3)插入节点-不仅能创建新的 DOM 元素，也能对原有的 DOM 元素进行移动

 • append()-向每个匹配的元素内部追加内容

 • appendTo()-将所有匹配的元素追加到指定的元素中，与 append 函数相反

 • prepend()-向每个匹配的元素内部前置内容

 • prependTo()-将所有匹配的元素前置到指定的元素中，与 prepend 函数相反

 • after()-在每个匹配的元素之后插入内容

 • insertAfter()-将所有匹配的元素插入到指定元素的后面，与 after 函数相反

 • before()-在每个匹配的元素之前插入内容

 • insertBefore()-将所有匹配的元素插入到指定的元素的前面，与 before
函数相反

(4)删除和清空节点

 • remove()-删除所匹配的元素

 • empty()-清空所匹配元素的所有后代节点

(5)复制节点

 • clone(flag)-flag 表示复制元素的同时是否复制元素中所绑定的事件

(6)替换节点

 • replaceWith()-将所有匹配的元素都替换成指定的 HTML 或者 DOM 元素

 • replaceAll()-与 replaceWith 函数相反

(7)包裹节点

 • wrapAll()-将所有匹配的元素用一个元素包裹起来

 • wrap()-将所有的匹配的元素进行单独的包裹

 • wrapInner()-将每一个匹配的元素的子内容用其他结构化的标记包裹起来


​**4. 属性操作**

(1)获取和设置属性

 • attr(name)-获取属性 name 的值

 • attr(name, value)-设置属性 name 的值为 value

(2)删除属性

 • removeAttr(name)-删除属性 name


​**5. 样式操作**

(1)获取和设置样式

 • css(name)-获取 css 属性 name 的值

 • css(name, value)-设置 css 属性 name 的值为 value

(2)追加和移除样式

 • addClass(className)-追加 className 样式到指定元素

 • removeClass(className)-从指定的元素中移除 className 样式

(3)切换样式

 • toggle(className)-交互切换 clssName 样式

(4)判断样式

 • hasClass(className)-判断是否含有 className 样式


​**6. 设置和获取 HTML、文本和表单的值**

(1)HTML

 • html()-获取指定元素的 html

 • html(html)-设置指定元素的 html

(2)文本

 • text()-获取指定元素的文本内容

 • text(text)-设置指定元素的文本内容

(3)表单

 • val()-获取表单的值

 • val(value)-设置表单的值为 value


**7.遍历节点**

 • children()-用于取得匹配元素的子元素集合

 • next()-用于取得匹配元素后面紧邻的同辈元素

 • prev()-用于取得匹配元素前面紧邻的同辈元素

 • siblings()-用于取得匹配元素前后所有的同辈元素

 • closest()-取得最近的匹配元素

 • find()、filter()、nextAll()、prevAll()、parent()、parents()


**8.CSS\_DOM 中经常使用的方法**

 • width()-获取元素的宽度

 • height()-获取元素的高度

 • offset()-获取元素在当前视窗的相对偏移

 • position()-获取元素相对于最近的一个 position 样式属性设置的 relative
或者 absolute 的祖父节点的相对偏移

 • scrollTop()-获取元素的滚动条距离顶端的距离

 • scrollLeft-获取元素的滚动条距离左侧的距离
