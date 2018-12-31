---
title: 编写高质量代码——高质量的HTML
date: 2012-03-15
categories: [前端技术]
tags: [Web,HTML]
---

**1、使用语义化标签**

 • div-division：分隔

 • span：范围

 • ol-ordered list：排序列表

 • ul-unordered list：不排序列表

 • li-list item：列表项目

 • dl-definition list：定义列表

 • dt-definition term：定义术语

 • dd-definition description：定义描述

 • del-delete：删除

 • ins-insert：插入

 • h1\~h6-header 1 to header 6：标题 1 到标题 6

 • p-paragraph：段落

 • hr-horizontal rule：水平尺

 • a-anchor：锚

 • abbr-abbreviation：缩写词

 • acronym：取首字母的缩写词

 • address：地址

 • var-variable：变量

 • pre-preformatter：预定义格式

 • blockquote：区块引用语

 • strong：加重

 • em-emphasized：加重

 • b-bold：粗体

 • i-italic：斜体

 • big：变大

 • small：变小

 • sup-superscripted：上标

 • sub-subscripted：下标

 • br-break：换行

 • center：区中

 • font：字体

 • u-underline：下划线

 • s-strikethrough：删除线

 • fieldset：域集

 • lengend：图标

 • caption：标题

   注意：有两个无语义的标签 div 和
span，当页面内标签无法满则设计需要时，才使用无语义标签。


**2、使用语义化标签的重要性**

 •
搜索引擎是通过标签来判断内容的语义，使用语义化标签有利于搜索引擎找到网站

 • 使用结构精简、语义清晰的标签有利于维护，降低维护成本


**3、如何检测标签是否语义良好？**

 •
因为浏览器会根据标签的语义给定一个默认的样式，所以判断一个网页标签语义是否良好的方法是：去掉样式，看网页结构是否组织良好有序，是否仍然后良好的可读性。

 • 使用工具：Web Developer


**4、常见模块**

（1）标题和内容

    <h1>标题1<h1>

    <h2>标题2<h2>

    <p>段落1</p>

    <p>段落2</p>

（2）表单

    <form>
        <fieldset>
            <legend>表单名称：表示用途</legend>
            <p>
                <label for="input1">输入框1</label><input type="text" id="input1"/>
            <p>
            <p>
                <label for="input2">输入框2</label><input type="text" id="input2"/>
            <p>
            ...
		</fieldset>
    </form>

（3）表格

表格标题要用 caption，表头要用 thead 包围，主题部分用 tbody
包围，尾部用 tfoot 包围，表头和一般单元格要区分开，表头用 th，一般单元格用
td。


**5、语义化标签应该注意的问题：**

（1）尽可能的少用无语义标签 div 和 span

（2）在语义不明显，既可以用 p 也可以用 div 的地方，尽量用 p

（3）不要使用纯样式标签，如：b、font 和 u 等，改用 CSS 设置
