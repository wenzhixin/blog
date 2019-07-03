---
title: 使用 js 脚本自动安装最新安备客户端
date: 2013-11-11
categories: [前端技术]
tags: [自动化]
---

每次安备客户端的代码一更新（即使是一行代码），那么我需要做的事情包括：

* 从 FTP 上下载最新的安装包（包括打开 ftp，输入用户名密码，复制，粘贴等）
* 安装客户端软件（双击，下一步，下一步）
* 修改配置文件中的路径指向开发路径（找到配置文件，打开，修改）
* 重启客户端服务（打开服务，找到相应的服务，右击重启）

本着懒人的原则，计算机是我们最好的朋友，应该将重复的事情应该交给计算机去做。

个人比较喜欢 js，坚信 python 能做的，js 照样能做（很简单），有兴趣的话可以一同学习。

花了点时间记录下如何用 js 自动安装最新安备客户端，希望可以举一反三，用到更多的地方，让电脑帮助我们做更多重复的事情。

#### 1. 安装 nodejs

打开[http://nodejs.org/](http://nodejs.org/)，点击 INSTALL 即可。

#### 2. 安装模块

我们使用到了 [ftp 模块](https://github.com/mscdex/node-ftp)，打开 cmd 命令行，进入开发目录，输入：

	npm install ftp

即可完成模块的安装。

#### 3. 编写代码

新建文件 app.js，这里对代码进行了详细的注释

	var fs = require('fs'), // 引入文件系统模块（自带模块）
		Client = require('ftp'), // 引入安装的 ftp 模块
		exec = require('child_process').exec, // 引入 exec 模块，用于运行 cmd 命令
		config = require('./config'), // 引入配置文件，例如 ftp 信息等
		client = new Client();

	function getPackage(callback) {
		client.on('ready', function() { // 连接 ftp 成功
			var year = (new Date()).getFullYear(), // 当前的年份
				path = 'ftp_product_installer/onlinebackup/' + year + '/anbay'; // 软件存放到 ftp 的目录

			client.cwd(path, function(err) { // cd 到 ftp 目录
				client.list(function(err, list) { // 列表文件
					client.cwd(getMaxVersion(list), function(err) { // 进入最大版本号的目录下
						client.list(function(err, list) { // 列表所有文件
							var name = '',
								version = 0;

							// 判断并得到最高版本的 exe 文件名称
							list.forEach(function(item) {
								var m = item.name.match(/^anbay-agent_\d+.\d+.(\d+).\d+.exe$/); // 安装包的格式

								if (m && version < +m[1]) {
									name = item.name;
									version = +m[1];
								}
							});
							// 下载保存安装包到当前目录
							client.get(name, function(err, stream) {
								stream.on('close', function() {
									client.end();
									callback(__dirname + '\\' + name); // 下载完成
								});
								stream.pipe(fs.createWriteStream(name));
							});
						});
					});
				});
			});
		});
		client.connect(config.ftp); // 连接 ftp
	}

	// 获得最大版本号目录
	function getMaxVersion(list) {
		var max = '0.0.0',
			compare = function(a, b) { // 比较版本号
				if (+a[0] < b[0]) return true;
				if (+a[1] < b[1]) return true;
				if (+a[2] < b[2]) return true;
				return false;
			};

		list.forEach(function(item) {
			if (compare(max.split('.'), item.name.split('.'))) {
				max = item.name;
			}
		});
		return max;
	}

	function installPackage(path, callback) {
		var cmd = path + ' /qn /norestart QUIET=1'; // 执行静默安装命令

		exec(cmd, function(err, stdout, stderr) {
			if (err) throw err;
			exec('del ' + path, callback); // 安装完成执行删除下载的安装包
		});
	}

	// 修改配置文件并重启服务
	function updateConfig() {
		var configFile = 'C:/ProgramData/scutech/AnBay/mongoose.conf',
			content = fs.readFileSync(configFile).toString(); // 读取文件内容

		content = content.replace(config.install_path, config.debug_path); // 替换文件内容
		fs.writeFileSync(configFile, content); // 重新将内容写入到文件

		// 重启服务
		exec('sc stop ScutechAnBayAgent', function(err, stdout, stderr) {
			exec('sc start ScutechAnBayAgent', function(err, stdout, stderr) {
				console.log('ok');
			});
		});
	}

	getPackage(function(path) {
		installPackage(path, function(err) {
			updateConfig();
		});
	});

#### 4. 运行脚本

	node app

___

最后附上完整的脚本下载 [anbay-agent-auto-install.zip](/2013/11/11/anbay-agent-auto-install.zip)
