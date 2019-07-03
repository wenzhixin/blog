---
title: Cordova 开发属于自己的插件（plugin）
date: 2014-03-20
categories: [移动开发]
tags: [cordova,插件,Android]
---

在上一篇文章 [cordova 初识之命令行工具](http://wenzhixin.net.cn/2014/02/11/cordova-command-line) 中，我们讲到了如何使用命令行快速地创建我们的 app 应用，并添加和运行各种平台。

在实际的项目开发中，需要用到 cordova 的插件，进行各个不同平台的辅助开发，我们可以通过 [plugins.cordova.io](http://plugins.cordova.io/) 对现有插件的搜索，以及安装。

插件的安装和使用，详细可以通过查阅 Cordova 的官网文档 [The Command-Line Interface](http://cordova.apache.org/docs/en/3.4.0/guide_cli_index.md.html#The%20Command-Line%20Interface) 以及某前端大大张鑫旭的文章：[PhoneGap/Cordova控制iOS7状态栏的显隐/颜色](http://www.zhangxinxu.com/wordpress/2014/03/phonegap-cordova-ios-statusbar-style/)。

但是更多的时候，我们需要开发属于我们自己的插件。通过查看官方文档 [Plugin Development Guide](http://cordova.apache.org/docs/en/3.4.0/guide_hybrid_plugins_index.md.html#Plugin%20Development%20Guide)，你会发现，**坑爹**啊，这文档怎么还是以前 2.x 的开发文档？？自己在编写插件的过程中，花了不少时间，在这里讲一下如何开发属于自己的插件。

通过命令行创建 app 应用之后，你会发现目录结构是这样子的：

```
├── platforms
|    ├── android
|    ├── ios
|    ├── wp7
|    └── ...
├── plugins
|    ├── org.apache.cordova.device
|    └── ...
├── config.xml
└── www
```

这里的 ```platforms``` 是我们应用支持的平台目录，```plugins``` 是我们安装的插件目录，```config.xml``` 是应用的配置信息（应用名称、描述等），```www``` 是我们的 web 工程目录。

我们知道，Cordova 3.x 的插件机制改变了，只需要通过简单的命令行即可安装和删除所需要的插件，而我们自己开发的插件，最终是要添加到 ```plugins``` 目录中的。

那么，就让一起开始，**制作属于我们自己的插件** 吧，这里以 ExtraInfo（获取 app 额外信息） 为例子，我们在当前目录下（当然可以放在别的目录下）创建 ExtraInfo 文件夹，先看下具体的目录结构：

```
ExtraInfo
├── src
|    ├── android
|    |    └── ExtraInfo.java
|    ├── ios
|    └── ...
├── www
|    └── ExtraInfo.js
└── plugin.xml
```

这里的 ```src``` 对应不同的平台，```www``` 放我们的 javascript 文件，```plugin.xml``` 是插件的配置文件。

先来看看 ```plugin.xml``` 的内容：
```
<?xml version="1.0" encoding="utf-8"?>
<plugin id="cn.net.wenzhixin.cordova" version="0.0.1"
        xmlns="http://apache.org/cordova/ns/plugins/1.0"
        xmlns:android="http://schemas.android.com/apk/res/android">
    <name>ExtraInfo</name>
    <description>Description</description>
    <js-module name="ExtraInfo" src="www/ExtraInfo.js">
        <clobbers target="cordova.plugins.ExtraInfo"/>
    </js-module>
    <platform name="android">
        <config-file parent="/*" target="res/xml/config.xml">
            <feature name="ExtraInfo">
                <param name="android-package" value="cn.net.wenzhixin.cordova.ExtraInfo"/>
            </feature>
        </config-file>
        <source-file src="src/android/ExtraInfo.java" target-dir="src/cn/net/wenzhixin/cordova"/>
    </platform>
</plugin>
```

有几个关键的字段需要解释下：

* id: 插件的标识，即发布到 [plugins.cordova.io](http://plugins.cordova.io/) 的 ID
* name：插件的名称
* description：描述信息
* js-module：对应我们的 javascript 文件，```src``` 属性指向 ```www/ExtraInfo.js```
* platform：支持的平台，这里仅仅用到了 android

```
<config-file parent="/*" target="res/xml/config.xml">
    <feature name="ExtraInfo">
        <param name="android-package" value="cn.net.wenzhixin.cordova.ExtraInfo"/>
    </feature>
</config-file>
<source-file src="src/android/ExtraInfo.java" target-dir="src/cn/net/wenzhixin/cordova"/>
```
这里是插件的配置信息，最后会添加到 ```res/xml/config.xml``` 文件中，并且将我们的 ```src/android/ExtraInfo.java```，复制到 android 的 package 包中。

接下来，```ExtraInfo.js``` 的内容很简单：
```
var exec = require('cordova/exec');

exports.getExtra = function(success, error) {
    exec(success, error, "ExtraInfo", "getExtra", []);
};
```

用过 Nodejs 或者了解过 AMD、CMD 的话（当然，没了解过也没关系），一定会觉得很熟悉。简单的说，```require``` 用于引入我们的类，```exports``` 用于导出我们的方法。这里对外公开了 ```getExtra``` 方法，以便我们在 app 中可以用到。

最后看 ```ExtraInfo.java``` 的内容：
```
public class ExtraInfo extends CordovaPlugin {

    public boolean execute(String action, JSONArray args, CallbackContext callbackContext)
            throws JSONException {
        Activity activity = this.cordova.getActivity();
        if (action.equals("getExtra")) {
            Intent i = activity.getIntent();
            if (i.hasExtra(Intent.EXTRA_TEXT)) {
                callbackContext.success(i.getStringExtra(Intent.EXTRA_TEXT));
            } else {
                callbackContext.error("");
            }
            return true;
        }
        return false;
    }
}
```

继承了 CordovaPlugin 类，并重写 ```execute``` 方法，使用 action 来判断我们在 javascript 中调用的方法名，成功的话调用 ```callbackContext.success(message)```，失败调用 ```callbackContext.error(message)``` 方法，分别对应 javascript 文件中的 ```success``` 和 ```error``` 回调函数。

当然，这里只用到 android 平台，其他的平台也是一样的，ios 使用 object-c、wp7 使用 c# 语言，例子见[Plugin Development Guide](http://cordova.apache.org/docs/en/3.4.0/guide_hybrid_plugins_index.md.html#Plugin%20Development%20Guide)。

到了这里，我们的插件就编写完成了。可以通过下面的命令添加插件：
```
cordova plugin add ExtraInfo #目录名称，也可以是 git 的地址
```

查看我们的 ```plugins``` 目录，会发现在该目录下已经华丽丽地生成我们自己的插件 ```cn.net.wenzhixin.cordova``` 了。

对了，好像把最关键的事情给忘记了，这里貌似还没提到我们应该如何在 app 中使用自己的插件呢。前面提到说按照文档来坑爹了，是因为使用 ```window.getExtra```，会报 ```getExtra is not defined``` 的错误。

通过查看生成的文件信息，可以知道，应该这样使用我们的插件：

```
document.addEventListener('deviceready', function() {
    var extraInfo = cordova.require('cn.net.wenzhixin.cordova.ExtraInfo');

    extraInfo.getExtra(function(message) {
        // alert(message);
    }, function(message) {
        // alert(message);
    });
});
```

最后，像平时的开发，觉得及时更新文档还是比较重要的，虽然自己花了不少时间，不过至少更加明白了 Cordova 插件的原理，同时也希望本文可以帮到你。
