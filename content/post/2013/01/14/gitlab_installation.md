---
title: Ubuntu 11.10 搭建 gitlab 服务器
date: 2013-01-14
categories: [后台技术]
tags: [Ubuntu,gitlab]
---

ps: 请按照顺序一步一步来，并注意查看提示，确保成功！

___

#### 1. 更新系统

	sudo apt-get update
	sudo apt-get upgrade

#### 2. 安装必要的包

	sudo apt-get install -y build-essential zlib1g-dev libyaml-dev libssl-dev libgdbm-dev libreadline-dev libncurses5-dev libffi-dev  wget curl git-core openssh-server redis-server postfix checkinstall libxml2-dev libxslt-dev libcurl4-openssl-dev libicu-dev

#### 3. 安装 python  (一般已经安装了)

	sudo apt-get install python2.7

	# 查看 python 版本 ( 2.5 <= version < 3.0)
	python2 --version

	sudo ln -s /usr/bin/python /usr/bin/python2

#### 4. 下载编译并安装 ruby 1.9.3 (apt-get install 的有问题)

	mkdir /tmp/ruby && cd /tmp/ruby

	# 太慢了可以从 ftp 上下载 ftp://192.168.88.104/temp/ruby-1.9.3-p327.tar.gz
	wget http://ftp.ruby-lang.org/pub/ruby/1.9/ruby-1.9.3-p327.tar.gz

	tar xfvz ruby-1.9.3-p327.tar.gz
	cd ruby-1.9.3-p327

	# 编译 (可以去喝杯茶再说)
	./configure
	make

	# 安装
	sudo make install

#### 5. 安装 bundler

	sudo gem install bundler

#### 6. 新建 git 和 gitolite 的用户

	sudo adduser --system --shell /bin/sh --gecos 'Git Version Control' --group --disabled-password --home /home/git git

#### 7. 新建 gitlab 用户

	sudo adduser --disabled-login --gecos 'GitLab' gitlab

	# 添加到 git 组
	sudo usermod -a -G git gitlab

	# 创建 SSH 密钥
	sudo -u gitlab -H ssh-keygen -q -N '' -t rsa -f /home/gitlab/.ssh/id_rsa

#### 8. 克隆 gitolite 源码

	cd /home/git
	sudo -u git -H git clone -b gl-v320 https://github.com/gitlabhq/gitolite.git /home/git/gitolite

#### 9. 设置 gitolite

	# 添加 gitolite 脚本到 $PATH
	sudo -u git -H mkdir /home/git/bin
	sudo -u git -H sh -c 'printf "%b\n%b\n" "PATH=\$PATH:/home/git/bin" "export PATH" >> /home/git/.profile'
	sudo -u git -H sh -c 'gitolite/install -ln /home/git/bin'

	# 设置 SSH 密钥
	sudo cp /home/gitlab/.ssh/id_rsa.pub /home/git/gitlab.pub
	sudo chmod 0444 /home/git/gitlab.pub
	sudo -u git -H sh -c "PATH=/home/git/bin:$PATH; gitolite setup -pk /home/git/gitlab.pub"

	# 修改文件夹权限
	sudo chmod 750 /home/git/.gitolite/
	sudo chown -R git:git /home/git/.gitolite/
	sudo chmod -R ug+rwXs,o-rwx /home/git/repositories/
	sudo chown -R git:git /home/git/repositories/

#### 10. 测试 gitolite

	sudo -u gitlab -H git clone git@localhost:gitolite-admin.git /tmp/gitolite-admin
	sudo rm -rf /tmp/gitolite-admin

出现以下提示表示配置 gitolite 成功：

	Cloning into /tmp/gitolite-admin...
	remote: Counting objects: 6, done.
	remote: Compressing objects: 100% (4/4), done.
	Receiving objects: 100% (6/6), 740 bytes, done.
	remote: Total 6 (delta 0), reused 0 (delta 0)

#### 11. 安装 mysql 服务器

	sudo apt-get install -y mysql-server mysql-client libmysqlclient-dev

#### 12. 设置 mysql

	# 登陆 mysql
	mysql -u root -p password

	# 添加 gitlab 用户 (记得修改 password 为自己的密码)
	CREATE USER 'gitlab'@'localhost' IDENTIFIED BY 'password';

#### 13. 克隆 gitlab 源码

	cd /home/gitlab
	sudo -u gitlab -H git clone https://github.com/gitlabhq/gitlabhq.git gitlab
	cd /home/gitlab/gitlab
	sudo -u gitlab -H git checkout 4-0-stable

#### 14. 设置 gitlab

	sudo -u gitlab -H cp config/gitlab.yml.example config/gitlab.yml
	sudo -u gitlab -H cp config/unicorn.rb.example config/unicorn.rb

	# 修改 gitlab 文件夹权限
	sudo chown -R gitlab log/
	sudo chown -R gitlab tmp/
	sudo chmod -R u+rwX  log/
	sudo chmod -R u+rwX  tmp/

#### 15. 设置 gitlab 数据库 (mysql) 连接

	sudo -u gitlab cp config/database.yml.mysql config/database.yml

	# 安装 gems (可以再去喝杯茶)
	sudo gem install charlock_holmes --version '0.6.9'
	sudo -u gitlab -H bundle install --deployment --without development test postgres

#### 16. 设置 git

	sudo -u gitlab -H git config --global user.name "GitLab"
	sudo -u gitlab -H git config --global user.email "gitlab@localhost"

#### 17. 设置 gitlab 钩子

	sudo cp ./lib/hooks/post-receive /home/git/.gitolite/hooks/common/post-receive
	sudo chown git:git /home/git/.gitolite/hooks/common/post-receive

#### 18. 初始化数据库

	sudo -u gitlab -H bundle exec rake gitlab:app:setup RAILS_ENV=production

#### 19. 设置 gitlab 开机启动脚本

	sudo wget https://raw.github.com/gitlabhq/gitlab-recipes/4-0-stable/init.d/gitlab -P /etc/init.d/
	sudo chmod +x /etc/init.d/gitlab
	sudo update-rc.d gitlab defaults 21

#### 20. 启动 gitlab

	sudo /etc/init.d/gitlab start
	# 或者 sudo /etc/init.d/gitlab restart

#### 21. 安装 nginx

	sudo apt-get install nginx

#### 22. 设置 gitlab 的网站配置

	sudo wget https://raw.github.com/gitlabhq/gitlab-recipes/4-0-stable/nginx/gitlab -P /etc/nginx/sites-available/
	sudo ln -s /etc/nginx/sites-available/gitlab /etc/nginx/sites-enabled/gitlab

#### 23. 修改配置文件，并重启 nginx

	# 修改 listen server_IP:80 default_server; 为服务器 IP
	sudo vim /etc/nginx/sites-enabled/gitlab
	# 重启
	sudo /etc/init.d/nginx restart

#### 24. 查看和测试服务器状态

	sudo -u gitlab -H bundle exec rake gitlab:env:info RAILS_ENV=production
	sudo -u gitlab -H bundle exec rake gitlab:check RAILS_ENV=production

----------服务器端至此搞定！以下为客户端-------------

#### 25. 在浏览器中输入地址：

	http://server_IP/users/sign_in

##### 登录用户名和密码：

	username: admin@local.host
	password: 5iveL!fe

#### 26. 最后，设置 SSH key

	# 邮箱与登录名称保持一致
	ssh-keygen -t rsa -C "admin@local.host"

	cat ~/.ssh/id_rsa.pub

选择 Your Profile -> SSH key -> Add new，将 id_rsa.pub 中的内容复制到 Key 输入框中，Save

##### 配置 id_rsa

	cd ~/.ssh
	mkdir gitlab
	mv id_rsa gitlab/
	chmod 600 gitlab/id_rsa

##### 配置 config (修改相应的 server_IP)

	host gitlab
        HostName server_IP
        User git
        IdentityFile ~/.ssh/gitlab/id_rsa

#### 27. 最后的最后，创建提交项目

选择 New Project -> Create Project

##### 提交

	# 修改下面命令为：
	# git remote add origin git@localhost
	git remote add origin gitlab
