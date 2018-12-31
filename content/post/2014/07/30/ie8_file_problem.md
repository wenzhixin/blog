---
title: IE8 文件上传问题分析小记
date: 2014-07-30 23:31:00
categories: [前端技术]
tags: [IE8,file,文件]
---

先吐槽一番，IE 浏览器让前端开发人员又恨又郁闷，但是没有办法，谁让中国如此多的用户呢。很多时候，一个简单的问题，可能需要花上大半天的时间才能解决，足够浪费时间的了，故在此记录下。

首先，问题是这样的：**在 IE8 下选择上传文件无任何反应，其他浏览器使用正常。**

而同事实现的方法是，将文件选择框隐藏起来，然后通过点击一个按钮来选择上传文件并触发事件：

```html
<form class="hidden" action="url" method="post" enctype="multipart/form-data">
    <input id="file" type="file" name="file">
</form>
<a href="javascript:void(0)" class="btn">Upload</a>
```

```js
$('#button').live('click', function () {
    $('#file').trigger('click');
});
$('#file').live('change', function () {
    // 调用开始上传方法
});
```

上面的```button```和```file```分别是按钮和文件选择框的 ID。```live```是旧版 jQuery 绑定事件的方法，现在已经废弃了。

查阅相关资料，得知这是 jQuery 的一个 bug，**IE8 file 使用```live```方法不能触发 change 事件**，所以将代码改为：

```
$('#button').click(function () {
    $('#file').trigger('click');
});
$('#file').change(function () {
    // 调用开始上传方法
});
```

改完之后是可以触发 change 事件了，但是得到这样的一个错误：```Access is denied```。原因如下：

> IE doesn't allow manipulation of the type="file" input element from javascript due to security reasons. Setting the filename or invoking a click event to show the browser dialog will result in an "Access is denied" error on the form submit.

**使用手动触发点击事件来弹出文件选择框会出现没有权限的错误。**于是，我又对代码进行了改进：
```html
<style>
.pr {
    position: relative;
}
#file {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    opacity: 0;
    filter: alpha(opacity=0);
}
</style>
<form action="url" method="post" enctype="multipart/form-data">
    <a href="javascript:void(0)" class="button pr">
        Upload
        <input id="file" type="file" name="file">
    </a>
</form>
```

注意到 css 样式，我将 file 的透明度设置为 0，放置在按钮上，当点击按钮的时候，实际上点击的是 file，并且删除了按钮的```click```事件，从而解决了手动触发 click 事件所导致的```Access is denied```的问题。

但是接着我又遇到了问题，因为后台是使用 php 的，我们知道，php 用于处理文件上传使用的是 ```$_FILES```，在其他浏览器都正常，但是 IE8 选择文件就会出现空的情况。网上说要设置：

form：
```html
enctype="multipart/form-data"
```

php.ini：
```
file_uploads = On; sounds like you already did this
post_max_size = 8M; change this higher if needed
upload_max_file_size = 8M; change this higher if needed
```

通过检查，都已经设置的了，那就郁闷了，为什么死活没有数据呢？

于是我用了最简单的方法，写了个只有文件上传的demo作为对比，结果是能获取到```$_FILES```的数据的！！！

问题的原因居然是因为 **file 不能嵌套在 a 标签下**，不然会导致获取不到数据，这个又是 IE8 的 bug，问题到此告一段落，却也浪费了我大半天的时间，最后的解决方案如下：

```html
<style>
.pr {
    position: relative;
}
.dil {
    display: inline-block;
}
#file {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    opacity: 0;
    filter: alpha(opacity=0);
}
</style>
<form action="url" method="post" enctype="multipart/form-data">
    <span class="pr dil">
        <a href="javascript:void(0)" class="btn">Upload</a>
        <input id="file" type="file" name="file">
    </span>
</form>
```