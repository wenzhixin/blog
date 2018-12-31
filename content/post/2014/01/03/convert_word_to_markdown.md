---
title: ubuntu 下将 word 文件转换为 markdown
date: 2014-01-03
categories: [前端技术]
tags: [标签]
---

主要介绍如何将 word 文件转换为 markdown 文件。

#### 第一步：安装 unoconv 和 pandoc
```
sudo apt-get install unoconv pandoc
```

#### 第二步：将 word 文件转换 html

```
unoconv -f html -o file.html file.docx
```
* -f html：指定我们要转为 html 格式（format）
* -o file.html：表示输出（output）的文件名为 file.html
* file.docx：表示要转换的文件为 file.docx

#### 第三步：将 html 转换为 markdown

```
pandoc -f html -t markdown -o file.md file.html
```
* -f html：指定我们要从什么文件（from）转换
* -t markdown：指定我们要转为 markdown 格式（to）
* -o file.md：表示输出（output）的文件名为 file.md
* file.docx：表示要转换的文件为 file.html

#### 第四步：将图片拷贝到 images 中

转换出来后会有很多图片，需要将图片拷贝到 images 文件夹中，
然后在替换 md 中的 ![]( 为 ![(images/ 即可。
