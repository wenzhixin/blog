## Ubuntu 12.10 桌面美化及软件安装

分类：开发工具 | 标签：桌面美化 | 发布时间：2013-03-29 11:01:00

___

### 1. 安装 QQ 聊天工具

下载安装包 deb

[wine qq 2012 for linux Ubuntu](http://www.longene.org/forum/viewtopic.php?f=6&t=4700)

安装：

	sudo dpkg -i WineQQ2012-20121221-Longene.deb

效果图：

![](/posts/2013/03/29/1.png)


### 2. 安装 cairo dock 工具栏

	sudo add-apt-repository ppa:cairo-dock-team/ppa
	sudo apt-get update
	sudo apt-get install cairo-dock cairo-dock-plug-ins

效果图：

![](/posts/2013/03/29/2.png)
	
### 3. 隐藏 unity 工具栏

安装 CompizConfig Settings Manager：

	sudo apt-get install compizconfig-settings-manager
	
打开 CompizConfig设置管理器 -> 桌面 -> Ubuntu Unity Plugin

将 Hide Luancher 选项修改为 Autohide