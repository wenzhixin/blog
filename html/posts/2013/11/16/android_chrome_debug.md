## 使用 Chrome 调试和模拟 android 上的页面

分类：前端技术 | 标签：Chrome、android、调试 | 发布时间：2013-11-16 00:00:00

___

#### 介绍

通过电脑调试手机上的页面，对于开发移动页面或者开发自适应的界面很有帮助。

本文主要介绍如何使用 chrome 浏览器调试和模拟 android 上的页面。

#### 1. 如何调试

1) 打开手机 chrome 设置 —— 开发者工具 —— 开启 USB 网页调试  
![](/posts/2013/11/16/1.png)

2) 在终端下（sdk/platform-tools/ 目录下）运行

	./adb forward tcp:9222 localabstract:chrome_devtools_remote
	
3) 在电脑 chrome 中输入 

	http://localhost:9222
	
然后选择需要调试的页面即可  
![](/posts/2013/11/16/2.png)  
![](/posts/2013/11/16/3.png)

#### 2. 如何模拟

1) 打开 chrome 的开发者工具（F12）—— 右下角设置 —— Overrides 

2) 开启 User Agent —— 选择 Chrome（android mobile） —— 并且勾上 Emulate touch events    
![](/posts/2013/11/16/4.png)  
![](/posts/2013/11/16/5.png)

3) 打开想要调试的页面即可  
![](/posts/2013/11/16/6.png)