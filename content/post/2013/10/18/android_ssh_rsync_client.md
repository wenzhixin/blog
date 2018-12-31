---
title: 安卓 ssh 和 rsync 同步客户端的实现
date: 2013-10-18 09:30:00
categories: [移动开发]
tags: [Android,ssh,rsync]
---

#### 1. 介绍

基于安卓的 ssh 和 rsync 客户端，可用于对服务器指定的目录进行同步到手机。
在这里我们使用 Dropbear 的 dbclient 作为 ssh 的客户端。

Dropbear是一个相对较小的SSH服务器和客户端。
它运行在一个基于POSIX的各种平台。
Dropbear是开源软件，在麻省理工学院式的许可证。
Dropbear是特别有用的“嵌入”式的Linux（或其他Unix）系统，如无线路由器。

#### 2. 准备工作

在使用之前，需要先编译 dropbear 的可执行文件，详细的编译步骤见：
[BuildingDropbear](http://code.google.com/p/droidsshd/wiki/BuildingDropbear)

或者直接下载已经帮我们编译好的文件：
[dropbearmulti](http://code.google.com/p/droidsshd/downloads/detail?name=dropbearmulti&can=2&q=)

rsync 可以到网站上找到相应的文件：
[Rsync](http://www.samba.org/ftp/rsync/)

或者直接下载已经编译好的文件：
[rsync](/2013/10/18/rsync_gz)

#### 3. 如何使用

关键代码如下：

	ArrayList<String> list = new ArrayList<String>();
	list.add(binDir + "/rsync"); // rsync 的 bin 目录
	list.add("-avzO"); // 同步参数
	list.add("--progress"); // 显示进度
	list.add("-e"); // 用于指定端口，或者 key
	list.add(binDir + "/ssh -y -i " + homeDir + "/id_rsa"); // id_rsa 的存放目录
	list.add(Config.SERVER); // 同步服务器地址目录，如 admin@wenzhixin.net.cn:~/
	list.add(Config.ROOT); // 需要同步到的目录
	try {
		ProcessBuilder pb = new ProcessBuilder(list.toArray(new String[] {}));
		pb.directory(binDir);
		Map<String, String> env = pb.environment();
		env.clear();
		env.putAll(System.getenv());
		pb.redirectErrorStream(true);
		Process p = pb.start();

		BufferedReader bis = new BufferedReader(new InputStreamReader(p.getInputStream()));
		String line;
		while ((line = bis.readLine()) != null) {
			log(line); // 显示日志
		}
		bis.close();
		p.waitFor();
		p.destroy();
	} catch (Exception e) {
		log(e.getMessage());
	}

#### 4. 需要注意的问题

1) 如何生成 id_rsa 和 authorized_keys，从而跳过密码的验证

生成 id_rsa，拷贝到手机客户端下：

	dropbearkey -t rsa -f ~/.ssh/id_rsa

生成 authorized_keys，并拷贝到服务器 ~/.ssh/ 下：

	dropbearkey -y -f ~/.ssh/id_rsa | grep “^ssh-rsa ” >> authorized_keys

2) 跳过 known_hosts 提示和密码验证

	ssh -y -i id_rsa

* -y 表示跳过 known_hosts
* -i 指定 id_rsa 进行认证
