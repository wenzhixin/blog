---
title: 制作漂亮的邮件模板
date: 2014-01-24
categories: [前端技术]
tags: [邮件模板]
---

上一篇中讲到如何通过 [nodejs 发送通知邮件](/2014/01/23/node_send_email)，在发送通知邮件的时候，
假如可以有漂亮的邮件模板就更好了，但是出于安全的原因，
邮件一般不支持 link 或者 style 样式，只能通过内联的方式。

想着内联就内联，先写个 [demo](/demos/mail_template.html) 看看呗，于是有了下面的代码：

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>邮件模板</title>
</head>
<body>
<div class="panel" style="width: 300px;margin: 20px;border-radius: 4px;border: 1px solid #bce8f1;">
    <div class="panel-title" style="padding: 10px 15px;color: #31708f;background-color: #d9edf7;border-color: #bce8f1;border-radius: 4px 4px 0 0;">
        测试标题
    </div>
    <div class="panel-body" style="padding: 15px;color: #3a87ad;font-size: 30px;text-align: center;">
        测试内容
    </div>
</div>
<div class="panel panel-success" style="width: 300px;margin: 20px;border-radius: 4px;border: 1px solid #d6e9c6;">
    <div class="panel-title" style="padding: 10px 15px;color: #3c763d;background-color: #dff0d8;border-color: #d6e9c6;border-radius: 4px 4px 0 0;">
        测试标题
    </div>
    <div class="panel-body" style="padding: 15px;color: #468847;font-size: 30px;text-align: center;">
        测试内容
    </div>
</div>
<div class="panel panel-danger" style="width: 300px;margin: 20px;border-radius: 4px;border: 1px solid #ebccd1;">
    <div class="panel-title" style="padding: 10px 15px;color: #a94442;background-color: #f2dede;border-color: #ebccd1;border-radius: 4px 4px 0 0;">
        测试标题
    </div>
    <div class="panel-body" style="padding: 15px;color: #b94a48;font-size: 30px;text-align: center;">
        测试内容
    </div>
</div>
</body>
</html>
```

可以看到使用内联样式开发会比较耗时，会写重复的样式，而且维护起来也十分费时。

那么有没有什么办法可以不用这么麻烦呢，要是可以将普通的 css 样式自动变为内联样式就好了。

想着如何实现的时候（有空自己实现个）找到了 [The Automatic CSS Inliner Tool](http://beaker.mailchimp.com/inline-css)。

有了自动转换工具，那就简单了。首先，编写普通的 html 代码，把 css 样式放到 style 标签中：
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title>邮件模板</title>
    <style>
        .panel {
            width: 300px;
            margin: 20px;
            border-radius: 4px;
            border: 1px solid #bce8f1;
        }
        .panel-title {
            padding: 10px 15px;
            color: #31708f;
            background-color: #d9edf7;
            border-color: #bce8f1;
            border-radius: 4px 4px 0 0;
        }
        .panel-body {
            padding: 15px;
            color: #3a87ad;
            font-size: 30px;
            text-align: center;
        }
        .panel-success {
            border: 1px solid #d6e9c6;
        }
        .panel-success .panel-title {
            color: #3c763d;
            background-color: #dff0d8;
            border-color: #d6e9c6;
        }
        .panel-success .panel-body {
            color: #468847;
        }
        .panel-danger {
            border: 1px solid #ebccd1;
        }
        .panel-danger .panel-title {
            color: #a94442;
            background-color: #f2dede;
            border-color: #ebccd1;
        }
        .panel-danger .panel-body {
            color: #b94a48;
        }
    </style>
</head>
<body>
<div class="panel">
    <div class="panel-title">
        测试标题
    </div>
    <div class="panel-body">
        测试内容
    </div>
</div>
<div class="panel panel-success">
    <div class="panel-title">
        测试标题
    </div>
    <div class="panel-body">
        测试内容
    </div>
</div>
<div class="panel panel-danger">
    <div class="panel-title">
        测试标题
    </div>
    <div class="panel-body">
        测试内容
    </div>
</div>
</body>
</html>
```

然后使用上面说的工具，点击 ```Convert It!``` 转换即可生成我们想要的模板了。
