---
title: firefox 利用 Selenium IDE 对 DBackup 进行自动化测试
date: 2013-07-30 01:02:00
categories: [前端技术]
tags: [Selenium IDE]
---

今天看《编写可维护的JavaScript》的时候有一章是专门讲 Selenium 对 JavaScript 进行自动化测试的。
在了解了 Selenium 的强大之后，动手试验了一下 firefox 中的 Selenium IDE，还是挺给力的说，在此记录下。

#### 什么是 Selenium IDE？

> Selenium IDE：一个Firefox插件，可以录制用户的基本操作，生成测试用例。
> 可以运行这些测试用例在浏览器里回放，可将测试用例转换为其他语言的自动化脚本。

了解了概念之后，我们来开始神奇的 Selenium IDE 之旅吧。

#### 安装 Selenium IDE

##### 1. 下载：[http://docs.seleniumhq.org/download/](http://docs.seleniumhq.org/download/) (额，貌似被墙了，从[这里](/2013/07/30/selenium-ide-2.2.0.xpi)下吧)
##### 2. 直接安装，或者拖动 xpi 文件到 firefox 完成安装～
##### 3. 重启 firefox，查看工具发现已经多了 Selenium IDE 菜单，证明我们已经安装成功了～
![](/2013/07/30/1.png)

#### 怎么使用？

##### 1. 打开迪备服务器界面，点击菜单中的 Selenium IDE
![](/2013/07/30/2.png)

##### 2. 点击 Recording 开始录制事件（假如状态已经开始录制了，不用再点开始）
![](/2013/07/30/3.png)

##### 3. 在界面中依次输入用户名、密码，点击登录按钮，登录成功后，再次点击录制按钮关闭录制

##### 4. 可以看到已经自动生成了事件了
![](/2013/07/30/4.png)

我们先看看这里命令的含义（大概了解下就OK了，不用记），很容易理解的：

1) open(url)
- 在浏览器中打开URL，可以接受相对和绝对路径两种形式
- 注意：该URL必须在与浏览器相同的安全限定范围之内

2) type(inputLocator, value)
- 模拟人手的输入过程，往指定的input中输入值
- 也适合给复选和单选框赋值

3) click(elementLocator)
- 点击连接、按钮、复选和单选框
- 如果点击后需要等待响应，则用 "clickAndWait"
- 如果是需要经过 JavaScript 的 alert 或 confirm 对话框后才能继续操作，则需要调用 verify 或 assert 来告诉 Selenium 你期望对对话框进行什么操作。

##### 5. 我们发现最后一项 assertAlert 是指对 alert 的处理，在这里我们并不需要，删除。并将该测试用例保存为 login。

##### 6. 退出登录，并将速度调整为 normal，点击 play current test case，可以发现已经登录成功了！
![](/2013/07/30/5.png)

##### 7. 最后，按照同样的方法（试试看，很简单的）对注册用户也进行了自动化注册，并保存为 register，那么就可以快速的根据 test case 的名称进行自动化测试了。
![](/2013/07/30/6.png)

___

##### 一点想法：

Selenium IDE 只能在 firefox 中使用，那么其他浏览器就无法使用了。
查看生成的文件发现格式是 html 代码，那么是否可以对录制的事件进行转为为其他语言（如 nodejs、python），
然后通过 web 后台服务器进行处理，生成相对应的界面管理，从而就可以指定某个测试用例（汇集起来）在某个浏览器（IE、chrome）启动，并
进行自动化测试呢？未完待续吧...

___

PS：

* DBackup 是一款很牛逼的数据库备份软件，详细介绍和试用可以猛击[这里](http://www.scutech.com/#!c/41)。

* 更多信息见 [http://docs.seleniumhq.org/](http://docs.seleniumhq.org/)
