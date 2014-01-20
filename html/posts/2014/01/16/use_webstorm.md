## Ubuntu 使用 WebStorm IDE 小记

分类：前端技术 | 标签：WebStorm | 发布时间：2014-01-16 00:00:00

___

WebStorm 是 jetbrains 公司旗下一款 JavaScript 开发工具，被广大 JS 开发者誉为“Web前端开发神器”。

### 安装

下载：[http://www.jetbrains.com/webstorm/index.html](http://www.jetbrains.com/webstorm/index.html)

解压下载的 gz 包，命令行下运行：

```
cd bin
./webstorm.sh
```

不过 WebStorm 默认情况下是需要收费的，可以申请为开源项目的贡献者来获得 licenses。

### 安装插件

安装完成后，在 File - Settings - Plugins，选择需要安装的插件，例如 AngularJS、Markdown 等。

### 设置项目

在 File - Settings - Directories 下，通过 Add content Root 来设置我们的项目路径

在 File - Settings - JavaScript - Libraries 下，勾选想要支持的库，建议全部勾上（如 NodeJS）。

### 设置外观、字体

在 File - Settings - Editor - Colors & Fonts - Font 下，选择自己想要的主题，
然后 Save as... 保存自己想要的主题名称，设置字体为```Ubuntu Mono```，
字体设置为 16（貌似有点小，相当于 Eclipse 下的 12）

### 显示行数

在 File - Settings - Appearance 下，勾选 Show line numbers 选项。