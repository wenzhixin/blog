---
title: div 中无法自动换行、以及单行显示的问题
date: 2012-05-08
categories: [前端技术]
tags: [CSS]
---

1、无法自动换行

 \* 问题：如果 div
输入的是英文字母且没有空格，会导致英文字母不换行直接在同一行输出，导致 div
的宽度远远超出设定的大小。

 \*  原因：因为在 div
中，英文字母之间没有空格的话，默认为一个英文单词，所以单词就一次输出不换行。

 \*  解决：通过设置 css：
```
word-wrap: break-word; /*自动换行*/
```

2、单行显示

 \* 问题：如果希望 div 输入的字符只在一行中显示，超过设定的大小则显示为
...


 \* 解决：通过设置 css：
```
white-space: nowrap; /*不换行*/
overflow: hidden; /*超出的隐藏*/
text-overflow: ellipsis; /*超出部分自动用...来表示*/
```
