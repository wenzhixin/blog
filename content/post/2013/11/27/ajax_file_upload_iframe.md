---
title: Ajax 文件上传——通过 iframe 的方法
date: 2013-11-27 00:00:00
categories: [前端技术]
tags: [Ajax 文件上传,iframe]
---

#### 前言

由于安全问题，浏览器不允许通过 XMLHttpRequest（又名XHR）的方式上传文件。

那么如何在不刷新界面的情况下实现文件的上传呢？

#### 解决方法

* 一种方法是使用 Flash，但是需要安装 Flash 插件。

* 使用 iframe 的方法，这里来介绍它是如何工作的。

#### iframe 的方法

假设我们有一个文件类型的输入字段的表单
```html
<input name="filename" type="file" />
```

使用 iframe 的方法可以概括为如下步骤：

1) 禁用原表单的 submit 事件，以方便我们使用自定义 iframe 的 submit 事件。

![](/2013/11/27/iframe-method-step-0.png)

2) 使用 JavaScript 创建一个 iframe 元素并将其插入到当前页面（对用户不可见）。

![](/2013/11/27/iframe-method-step-1.png)

3) 修改 iframe 的 target 属性，使得表单提交的结果显示在新的 iframe 中，而不是当前窗口。

![](/2013/11/27/iframe-method-step-2.png)

4) 提交 iframe 中的表单，例如用 jQuery 的 $('form').submit()。

![](/2013/11/27/iframe-method-step-3.png)

5) 让隐藏的 iframe 导航到新的响应界面，在这里，父窗口并没有打开新的页面或者进行重定向。

![](/2013/11/27/iframe-method-step-4.png)

6) 获取 iframe 的响应内容到父窗口中。

![](/2013/11/27/iframe-method-step-5.png)

7) 删除 iframe，重置原来的表单，提交完成。

![](/2013/11/27/iframe-method-step-6.png)

#### 需要注意的问题

由于使用了 iframe，所以我们无法获得响应接口的响应头和状态码。

为了判断是否已经提交成功，我们需要在返回接口中定义我们需要的响应信息。

例如，在 body 中返回 status：
```json
{
	"status": 200
}
```

#### 使用 iframe 的 jQuery 插件

[AjaxFileUpload 插件](http://www.phpletter.com/Demo/AjaxFileUpload-Demo/)

___

参考：[AJAX File Uploads with the iFrame Method](http://www.alfajango.com/blog/ajax-file-uploads-with-the-iframe-method/)
