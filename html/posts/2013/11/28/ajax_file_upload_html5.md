## Ajax 文件上传——通过 html5 的方法

分类：前端技术 | 标签：Ajax 文件上传、html5 | 发布时间：2013-11-28 21:17:00

___

#### html5 方法 

上篇文章讲到 Ajax 文件上传是如何通过 iframe 的方法，这里我们通过 html5 的方法来进行文件的上传。

在 html5 标准中，XMLHttpRequest 对象被重新定义，称为“XMLHttpRequest Level 2”，其中包含了文件相关的新特性：

* 支持上传、下载字节流，比如文件、blob以及表单数据
* 增加了上传、下载中的进度事件

关于 XMLHttpRequest Level 2，阮一峰有一篇文章介绍的很详细，就不多做解释了，详细见：

* [官网 XMLHttpRequest2](http://www.w3.org/TR/XMLHttpRequest2/)
* [XMLHttpRequest Level 2 使用指南](http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html)

首先，创建一个 XMLHttpRequest2 的实例：
```javascript
var xhr = new XMLHttpRequest();
```

添加 file 控件，这里我们使用 multiple 属性来支持多文件的选择。
```html
<input id="filename" type="file" multiple="multiple" />
```

获取并保存选择的多个文件。
```javascript
var files = document.getElementById('filename').files;
```

接下来，要介绍的是另一个 html5 推出的新对象：FormData。

FormData 对象是用户的表单数据的集合，
它以键值对的形式存储了表单数据，其值能够包括数字、字符串以及文件。  
我们通过这个对象，来向服务器提交我们的文件数据。

```javascript```
var formData = new FormData();
formData.append('filename', files[index]); // index 为第 n 个文件的索引
xhr.open('post', url); // url 为提交的后台地址
xhr.send(formData);
```
这样就完成了一次文件的上传，多个文件我们遍历多个文件重复这个步骤即可。

接下来是对上传事件的监听：
```javascript
xhr.upload.addEventListener("progress", uploadProgress, false); // 处理上传进度
xhr.addEventListener("load", uploadComplete, false); // 处理上传完成
xhr.addEventListener("error", uploadFailed, false); // 处理上传失败
xhr.addEventListener("abort", uploadCanceled, false); // 处理取消上传
```
在不同的事件中做不同的处理在完成所有的文件上传后再显示结果，使用 html5 的方法是不是很简单呢。

#### 使用 html5 的 jQuery 插件

[jquery-html5-upload](https://github.com/mihaild/jquery-html5-upload)

#### 浏览器支持情况

因为用到了新的特性，所以只有在支持这些新对象的浏览器下才可以支持我们的代码，
可以通过[这里](http://caniuse.com/)查看浏览器的支持情况。

最后，对于不支持的浏览器，我们做了降级处理，优先使用 html5 方法，
在浏览器不支持的情况下，使用上一篇提到的 iframe 的方法，
当然也可以考虑将介绍到的两个 jQuery 插件合并起来。