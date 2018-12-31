---
title: CSS 自定义字体
date: 2014-04-21
categories: [前端技术]
tags: [CSS,自定义字体]
---

### 介绍

通过 CSS 的 @font-face 属性可以实现在网页中嵌入任意字体，例如自定字体、或者是自定义图标（bootstrap）。
为了能在主流浏览器中都能正常显示自定义的字体，我们需要使用字体的三种文件格式：

* .TTF或.OTF，适用于Firefox 3.5、Safari、Opera
* .EOT，适用于Internet Explorer 4.0+
* .SVG，适用于Chrome、IPhone

一般情况下，最常见的字体是.TTF文件，我们需要通过这种文件格式转换为其余两种文件格式。

### 使用

使用前，需要对字体进行声明：

```
@font-face {
    font-family: 'fontName';
    src: url('fontName.eot');
    src: url('fontName.eot') format('embedded-opentype'),
         url('fontName.woff') format('woff'),
         url('fontName.ttf') format('truetype'),
         url('fontName.svg#FontNameRegular') format('svg');
}
```

使用：
```
body {
    font-family: fontName;
}
```

### 工具

上面讲到转换文件格式的，可以通过在线网站
[http://everythingfonts.com/font-face](http://everythingfonts.com/font-face) 进行转换，
只要上传 ttf 文件即可，然后会自动生成 css 和其他字体。
