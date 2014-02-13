## cordova 初识之命令行工具

分类：移动开发 | 标签：cordova、命令行、Android | 发布时间：2014-02-11 00:00:00

___

### 1. 准备工作

在使用 cordova 的命令行之前，需要安装各平台对应的 SDK，各个平台对应的操作系统如下：

* iOS (Mac)
* Amazon Fire OS (Mac, Linux, Windows)
* Android (Mac, Linux)
* BlackBerry 10 (Mac, Linux, Windows)
* Windows Phone 7 (Windows)
* Windows Phone 8 (Windows)
* Windows 8 (Windows)
* Firefox OS (Mac, Linux, Windows)

### 2. 安装命令行工具

首先下载安装 [node.js](http://nodejs.org/) （像我安装过的就不用啦）

全局安装 cordova：
```
npm install -g cordova
```

注：

-g 表示安装为全局，有些系统需要 sudo 权限（像 ubuntu）

cordova 的基本命令格式为：
```
cordova command [options]
```

### 3. 创建 app

创建使用```cordova create```

例如，进入工程目录：
```
cordova create hello com.example.hello HelloWorld
```

* 第一个参数```hello```表示在工程目录中创建一个 hello 的文件夹
* 第二个参数```com.example.hello```表示包名（反向域名），用于标志不同的 app
* 第三个参数```HelloWorld```表示项目的名称，可以在 config.xml 文件中修改

### 4. 添加平台

进入创建的项目中：
```
cd hello
```

查看已经安装的平台和支持的平台：
```
cordova platforms list
```

例如，在 ubuntu 下的结果是：
```
Installed platforms:
Available platforms: android, blackberry10, firefoxos, ubuntu
```

在 ubuntu 下，可以通过以下命令添加支持的平台：
```
cordova platform add android
cordova platform add blackberry10
cordova platform add firefoxos
cordova platform add ubuntu
```

在 mac 下，可以通过以下命令添加支持的平台：
```
cordova platform add ios
cordova platform add amazon-fireos
cordova platform add android
cordova platform add blackberry10
cordova platform add firefoxos
```

在 windows 下，可以通过以下命令添加支持的平台：
```
cordova platform add wp7
cordova platform add wp8
cordova platform add windows8
cordova platform add amazon-fireos
cordova platform add android
cordova platform add blackberry10
cordova platform add firefoxos
```

当然，也可以删除不想要的平台：
```
cordova platform remove android
cordova platform rm android
```

### 5. 编译项目

通过下面命令，即可编译项目：
```
cordova build android
```

或者是使用（build 为简写）：
```
cordova prepare android
cordova compile android
```

编译完成后可以看到 platforms/android/bin/ 下已经生成了 apk 文件

### 6. 测试、运行项目

启动 android 虚拟机：
```
cordova emulate android
```

运行 app 项目（在虚拟机或者在真机）：
```
cordova run android
```

运行结果：

![](/posts/2014/02/11/1.png)