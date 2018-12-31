---
title: 通过 vim 编辑网页文本输入框
date: 2014-08-30
categories: [前端技术]
tags: [文本输入框,vim]
---

对于文本编辑和编写代码，我们常常会用到 vim，使用 vim 的好处在这里就不多说了。那么能不能在浏览器中的文本输入框中也使用 vim 来编辑呢，编辑完之后再自动保存回去？答案当然可以！

使用这种方式，我们可以将编写的内容随时保存到临时文件中，或者可以打开已经保存的文件中继续编辑。

### 使用的环境

* 浏览器：chrome
* 操作系统：Ubuntu 14.04

### 安装和使用

* 安装 gvim：
```
sudo apt-get install vim-gnome
```

* 下载后台脚本：
```
# mkdir ~/bin
cd ~/bin
wget http://opencoder.net/edit-server
chmod +x edit-server
```

* 编辑配置后台脚本信息：
```
vi edit-server
```
```
our $REQUIRE_AUTH = 1; # 将这里改为 our $REQUIRE_AUTH = 0;
our $PORT = 8888; # 将这里改为自己没有用到的端口，例如 our $PORT = 8123;
```

* 增加自动启动后台服务到`.profile`中：
```
vi ~/.profile
```
```
$HOME/bin/edit-server &
```

* 安装浏览器插件 [TextAid](https://chrome.google.com/webstore/detail/ppoadiihggafnhokfkpphojggcdigllp)。

* 配置 TextAid：
安装完成后，焦点在需要输入的文本框时，浏览器 URL 输入框会出现
![](/2014/08/30/2.png)
右击点击选项，将 URL 设置为 http://127.0.0.1:8123 （对应自己设置的端号）
![](/2014/08/30/1.png)

* 开始使用：
在你需要编辑文本输入框时，点击浏览器 URL 出现的图标即可弹出 gvim 的输入框，然后开始享受你的 vim 编辑器吧。

---

> 附：设置 gvim 配色和字体。
```
vi ~/.gvimrc
```
```
colorscheme slate
set guifont=Ubuntu\ Mono\ 12
```
