## wordpress 修改IP地址后进不去后台的解决方法

分类：后台技术 | 标签：wordpress | 发布时间：2012-09-14 00:00:00

___

#### 1、登录数据库

	mysql -uroot -ppassword wordpress

#### 2、更新 wp_options 表

	update wp_options set option_value = 'http://newip/wordpress' where option_name = 'siteurl' or option_name = 'home';

___

注：使用 shell 脚本

	vi setwordpress

输入内容：

	#! /bin/bash
	# set wordpress admin ip
	
	param=$#
	
	if [ $param -eq 1 ]; then
	        echo "update wp_options set option_value = 'http://"$1"/wordpress' where option_name = 'siteurl' or option_name = 'home';" > setwordpress.tmp
	        mysql -uroot -ppassword wordpress < setwordpress.tmp
	        rm setwordpress.tmp
	        echo "OK..."
	        exit 0
	fi
	
	echo "use: $0 IP Address (127.0.0.1)"


___

更正文章中内部链接及附件的地址：

	update wp_posts set post_content = replace(post_content, 'http://www.old-domain.com', 'http://www.new-domain.com');
                                        