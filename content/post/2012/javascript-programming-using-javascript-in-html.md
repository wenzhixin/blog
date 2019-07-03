---
title: JavaScript高级程序设计——在 HTML 中使用 JavaScript
date: 2012-03-16
categories: [前端技术]
tags: [JavaScript]
---

1、在 HTML 页面中使用 JavaScript的主要方法：使用 script 元素

```
<script type="text/javascript" scr="src.js" charset="charset" defer="defer"></script>
```

 • type：用于表示编写代码使用的脚本语言，一般都是 text/javascript

 • src：表示包含执行代码的外部文件，可选

 • charset：表示通过 src 属性制定的代码的字符集，可选

 • defer：表示脚本可以延迟到文档完全被解析和显示之后再执行，可选


2、标签的位置

（1）将所有的 script 元素都放在页面的 head 元素中:
```
<html>
  <head>
    <title>title</title>
    <script type="text/javascript" src="src1.js"></script>
    <script type="text/javascript" src="src2.js"></script>
  </head>
  <body>
    <!-- 这里放内容 -->
  </body>
</html>
```

(2)将所有的 script 元素都放到 body 元素中，放在页面的内容后面，推荐使用这种方式：
```
<html>
  <head>
    <title>title</title>
  </head>
  <body>
    <!-- 这里放内容 -->
    <script type="text/javascript" src="src1.js"></script>
    <script type="text/javascript" src="src2.js"></script>
  </body>
</html>
```

3、尽可能使用外部文件来包含 JavaScript 代码：

（1）可维护性

（2）可缓存

（3）可使用未来


4、文档模式：需要在文档开始加入表示的文档模式

（1）标准模式：
```
<!-- HTML 4.01 严格型 -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

（2）准标准模式，一般使用过渡型模式：
```
<!-- HTML 4.01 过渡型 -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/loose.dtd">
```

```
<!-- HTML 4.01 框架集型 -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```

5、noscript 元素

 • noscript 元素主要用于当浏览器不支持脚本或者脚本被禁用时，浏览器会显示 noscript 中的内容
