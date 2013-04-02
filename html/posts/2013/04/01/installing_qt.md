## Ubuntu 安装 QT 4.8

分类：开发工具 | 标签：QT | 发布时间：2013-04-01 22:30:00

___

### 1. 下载并解压安装包

下载：[Qt libraries 4.8.4 for Linux/X11](http://releases.qt-project.org/qt4/source/qt-everywhere-opensource-src-4.8.4.tar.gz)

解压：

	tar xvf qt-everywhere-opensource-src-4.8.4.tar
	
### 2. 编译库并安装 Library

	cd qt-everywhere-opensource-src-4.8.4
	./configure
	
	//o: opensource
	
	make
	
	make install
	
### 3. 设置 QT Creator

* 选择：工具 - 选项 - 构建并执行

* 设置QT版本：新增，选择目录

* 设置 Kits

___

### 出现的问题

#### 1. Basic XLib functionality test failed!

错误：

	Basic XLib functionality test failed!
	You might need to modify the include and library search paths by editing
	QMAKE_INCDIR_X11 and QMAKE_LIBDIR_X11 in /home/zhu/Qt/qt-x11-opensource-src-4.5.2/mkspecs/linux-g++
	
解决：

	sudo apt-get install libX11-dev libXext-dev libXtst-dev
	
