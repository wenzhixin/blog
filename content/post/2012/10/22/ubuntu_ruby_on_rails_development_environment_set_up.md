---
title: Ubuntu 搭建 Ruby on Rails 开发环境
date: 2012-10-22 00:00:00
categories: [前端技术]
tags: [ROR,Ubuntu]
---

#### 安装 ruby：

	sudo apt-get install ruby1.9.1 ruby1.9.1-dev

#### 安装 rubygems：

	sudo apt-get install rubygems

#### 安装 mysql

	sudo apt-get install mysql

#### 安装 ruby-mysql

1）下载：http://www.tmtm.org/en/ruby/mysql/ruby-mysql-0.2.6.tar.gz

2）解压安装：

	ruby setup.rb
	ruby test.rb hostname user passwd 
	ruby install.rb

#### 安装 rails

	sudo apt-get install rails

#### 更新 rake

	sudo gem install rake


#### 遇到的问题：

问题1：

	mysql_config: command not found

解决：

	sudo apt-get install libmysqlclient-dev

问题2：

	Client does not support authentication protocol requested by server

解决：

登录 mysql，重设密码

	set password for 'root'@'localhost'=old_password('password');

问题3：

	undefinedmethod `more_results' for #<Mysql>

解决：

注释 mysql_adapter.rb 中的 318 行和 642 行

	/usr/lib/ruby/vendor_ruby/active_record/connection_adapters/mysql_adapter.rb 
                                            