## Debian 安装 nodejs 环境

分类：开发工具 | 标签：Debian、nodejs、安装 | 发布时间：2013-10-29 00:30:00

___

**1. 安装编译包**

	sudo apt-get install python g++ make checkinstall
	
**2. 获取最新的 node 源码**

	mkdir ~/src && cd ~/src
	wget -N http://nodejs.org/dist/node-latest.tar.gz
	tar xzvf node-latest.tar.gz && cd node-v*
	
**3. 配置编译源码**

	./configure
	sudo checkinstall
	
注意，运行 checkinstall 需要 sudo，之后选择 3，将 node 的版本号前的 v 去掉，
例如，这里安装的版本为 v0.10.21，改为 0.10.21 即可。  
这里编译会比较久，需要耐心等待，特别是在 pi 下。

**4. 安装（-i）和卸载（-r）**

	sudo dpkg -i node_*
	sudo dpkg -r node
	
**5. 查看 nodejs 和 npm 的版本**	

	nodejs -v
	npm -v