## 《锋利的jQuery》学习笔记——认识jQuery

分类：前端技术 | 标签：jQuery | 发布时间：2012-03-10 00:00:00

___

认识jQuery

 

​1. JavaScript中比较流行的JavaScript库：Prototype、Dojo、YUI、Ext
JS、MooTools、jQuery

 

​2. jQuery的理念是写得少，做得多(writeless, do more)，主要的优势：

(1)轻量级；(2)强大的选择器；(3)出色的DOM操作的封装；(4)可靠的事件处理机制；(5)完善的Ajax；(6)不污染顶级变量；(7)出色的浏览器兼容；(8)链式操作方式；(9)隐式迭代；(10)行为层与结构层的分离；(11)丰富的插件支持；(12)完善的文档；(13)开源。

 

​3. jQuery代码风格：

(1)链式操作风格

 • 对于同个对象不超过3个操作，直接写成一行

 • 对于同个对象多个操作，可以按功能块来换行

 • 对于多个对象，可以每个对象写成一行

(2)为代码添加注释

(3)变量风格 - 在变量前加上$

 • var $variable = jQuery 对象;

 • var variable = DOM 对象;

 

​4. jQuery对象和DOM对象的转换

(1)jQuery对象转换为DOM对象：

 • variable = $variable[index];

 • variable = $variable.get(index);

(2)DOM对象转换为jQuery对象：

 • $variable = $(variable)

 • 注意：事件处理中，this 表示 DOM 对象 $(this) 表示 jQuery 对象

 

​5. 解决jQuery和其他库的冲突

(1)jQuery库在其他库之后导入

 • 调用jQuery.noConflit()将变量$控制权转交

 • 自定义一个新的快捷方式var $somequery = jQuery.noConflit();

(2)jQuery库在其他库之前导入

 • 无需调用jQuery.noConflit()，直接使用jQuery，$作为其他库快捷方式

 

​6. 开发工具

 • Eclipse + Apatana studio

 • Apatana studio安装jQuery插件

(1)依次点击 Commands \> Bundle Development \> Install Bundle \> jQuery
进行下载安装

(2)重启Eclipse，选择Project \> properties \> Project Build Path
并勾选最新jQuery


