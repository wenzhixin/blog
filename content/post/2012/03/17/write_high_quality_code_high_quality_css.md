---
title: 编写高质量代码——高质量的CSS
date: 2012-03-17 00:00:00
categories: [前端技术]
tags: [CSS]
---

1、解析网页模式和DTD

（1）解析网页模式主要有标准模式和怪异模式。怪异模式是为了兼容老式浏览器下的代码，应该避免触发怪异模式，选用标准模式。

（2）DTD（Document Type Definition），即文档类型定义，是一种保证 HTML
文档格式正确的有效方法，可以通过比较 HTML 文档和 DTD
文件来看文档是否符合规范，以及元素和标签使用是否正确。

（3）按照 W3C 的标准，需要在 HTML 的最开始声明文件的 DTD 类型。如果漏写 DTD
声明，Firefox 会按照标准模式来解析网页，但在 IE 中就会触发怪异模式。


2、如何组织 CSS

（1）应用 CSS 的能力分为两部分：一是 CSS 的 API，重点是如何用 CSS
控制页面内元素的样式；二是 CSS 框架，重点是如何对 CSS
进行组织。其中，如何更好地组织 CSS 是编写高质量 CSS 的关键。

（2）推荐的组织 CSS 的方法：base.css + common.css + page.css

（3）base 层：位于三者的最底层，提供 CSS reset
功能和力度最小的通用类—原子类。

 • base 层相对稳定，基本上不需要维护。

 • CSS
reset：一开始就将浏览器的默认样式全部去掉，通过重新定义标签的样式，覆盖浏览器提供的默认样式。

 • 通用原子类是一系列常用的基本类，包括：文字、定位、长度和宽度。

 • “通用性”表现在它们是网站最常用的类，任何页面都可以随意使用。

 • “原子性”表现在它们是最基础的样式，一个类只设置一个样式，不可再分。

（4）common 层：位于中间层，提供组件级的 CSS 类。

 • common 层是网站级的，不同的网站有不同的 common 层，同一个网站只有一个
common 层。

 •  在团队合作中，common 层最好由一个人负责，统一管理。

（5）page 层：位于最高层，提供页面级的样式。

 • page 层是页面级的，每个页面都有自己的 CSS


3、模块化 CSS——在 CSS 中引入面向对象编程思想

（1）如何划分模块——单一职责

 •
模块与模块之间尽量不要包含相同的部分，如果有相同部分，应将它们提取出来，拆分成一个独立的模块。

 • 模块应在保证数量尽可能少的原则下，坐到尽可能简单，以提高重用性。

（2）CSS 的命名——使用命名空间

 •
命名结合骆驼命名法和划线命名法来进行命名，其中骆驼命名法用于区别不用单词，划线用于表明从属关系。

（3）挂多个 class 还是新建 class——多用组合，少用继承


4、低权重原则——避免滥用子选择器

（1）CSS
的选择符都是有权重的，当不同的选择符的样式设置有冲突时，会采用权重高的选择符作为设置的样式。权重的规则：HTML
标签的权重为 1，class 的权重为 10，id 的权重为 100。

（2）如果 CSS
的选择符权重相同，那么样式会遵循就近原则，那个选择符最后定义，就采用哪个选择符的样式。

（3）使用子选择器，会增加 CSS
选择符的权重，从而对其他选择符产生影响，所以应该尽量使用子选择器。为了保证样式容易被覆盖，提高可维护性，CSS
选择符需要保证权重尽可能低。


5、CSS sprite

（1）CSS sprite 技术是将网站的多张背景图片合并为一张，然后利用
background-position 属性来展示所需要的部分。

（2）CSS sprite 主要能解决试用多张图片加载时出现空白的问题，以及减少 HTTP
请求次数，从而降低服务器的压力。

（3）CSS sprite 技术的使用范围：

 • 只能合并用于背景的图片，对于\<img src="" /\>设置的图片，不能合并到 CSS
sprite 中。

 • 对于横向和纵向都平铺的图片，也不能使用 CSS
sprite。对于需要横向平铺的图片，合并的图片只能垂直排列；对于需要纵向平铺的图片，合并的图片只能水平排列。


6、CSS 常见问题

（1）id 和 class：同一个网页中，相同的 id 只能出现一次，不可重复，而 class
可以任意出现多次，因此，应尽量使用 class，少用 id。

（2）超链接标签样式问题：a 标签的四种状态需要排序才能发挥作用，顺序是 link
-\> visited -\> hover -\> active，也叫做 love hate 原则，即
l(link)ov(visited)e h(hover)a(active)te。

（3）块级元素和行内元素的区别：

 • 块级元素会独占一行；行内元素不会独占一行

 • 块级元素可以设置 width、height 属性；行内元素设置 width、height
属性无效

 • 块级元素可以设置 margin 和 padding 属性；行内元素设置 margin 和
padding
属性，水平方向（margin-left、margin-right、padding-left、padding-right）有效，垂直方向（margin-top、margin-bottom、padding-top、padiding-bottom）无效

 • 块级元素的 display 属性对应 display: block；行内元素的 display
属性对应 display: inline。可以通过修改 display
属性来切换块级元素和行内元素

（4）png图片：IE 6 下对 png
的透明支持不好，可以利用滤镜功能来解决问题，格式：progid:
DXImageTransform.Microsoft.AlphaImageLoader(src='png图片路径',
sizingMethod='crop')

（5）多版本 IE 并存方案：CSS 的调试利器 IETester
