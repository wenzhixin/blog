---
title: markdown 介绍、解析与编辑器
date: 2013-11-02
categories: [前端技术]
tags: [markdown,解析,编辑器]
---

markdown 是一种轻量级标记语言，它允许使用易读易写的纯文本格式编写文档，然后转换成html文档。
markdown 强调可读性高于一切。其实网上有很多介绍 markdown 的文章，这里涉及到介绍和开发相关。
总结下吧，更多关于 markdown 的介绍，参见 [wiki](http://zh.wikipedia.org/wiki/Markdown)。


### markdown 的语法：

#### 1. 标题

markdown：

    # 一级标题

    ## 二级标题

    ### 三级标题

    #### 四级标题

    ##### 五级标题

    ###### 六级标题

效果：

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

#### 2. 文本

markdown：

    *强调*

    **粗体**

    >引用

效果：

*强调*

**粗体**

>引用

#### 3. 链接与图片

markdown：

    [文翼的博客](http://wenzhixin.net.cn)

    ![logo](http://tp1.sinaimg.cn/2292826740/50/40026623904/1)

效果：

[文翼的博客](http://wenzhixin.net.cn)

![logo](http://tp1.sinaimg.cn/2292826740/50/40026623904/1)

#### 4. 列表

markdown：

    * 项目
      * 子项目
      * 子项目
    * 项目
      * 子项目
      * 子项目
    * 项目

效果：

* 项目
  * 子项目
  * 子项目
* 项目
  * 子项目
  * 子项目
* 项目

#### 5. 下划线和特殊符号

markdown：

    ___
    \*\#\_特殊符号用反斜杠

效果：

___
\*\#\_特殊符号用反斜杠

#### 6. 表格

markdown：

	| 序号 | 网站 | 链接 |
	| --- | --- | --- |
	| 1 | 博客 | http://wenzhixin.net.cn |
	| 2 | github | https://github.com/wenzhixin |

效果：

| 序号 | 网站 | 链接 |
| --- | --- | --- |
| 1 | 博客 | http://wenzhixin.net.cn |
| 2 | github | https://github.com/wenzhixin |


### markdown 解析器

在自己的博客中是将 md 文件通过 nodejs 解析为 html 代码，再显示到页面上的，主要尝试了几个开源的解析器：

* [markdown-js](https://github.com/evilstreak/markdown-js)
* [marked](https://github.com/chjj/marked)
* [node-markdown](https://github.com/andris9/node-markdown)
* [js-markdown-extra](https://github.com/tanakahisateru/js-markdown-extra)

一开始，使用的是 markdown-js，但是它并不支持表格，所以后面换成了 marked，其实功能都差不多，适合自己用就OK，性能就没去做对比了


### markdown 在线编辑器

* [stackedit](https://stackedit.io/)
* [dillinger](http://dillinger.io/)
* [EpicEditor](http://epiceditor.com/)
* [editor](http://lab.lepture.com/editor/)

前面两个都是重量级，功能很完善的，适合在线编辑。
后面两个是轻量级的，对于开发来说，使用很方便。
最后我选择了 editor（国人开发的），界面简洁
