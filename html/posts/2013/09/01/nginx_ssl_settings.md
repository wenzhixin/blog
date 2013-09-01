## nginx 配置 SSL（https）

分类：服务器 | 标签：nginx、https、ssl | 发布时间：2013-09-01 11:45:00

**配置信息：**

	listen 443;
	server_name wenzhixin.net.cn;

	ssl on;
	ssl_certificate /etc/ssl/certs/wenzhixin_net_cn.crt;
	ssl_certificate_key /etc/ssl/private/wenzhixin_net_cn.key;
	ssl_client_certificate /etc/ssl/certs/wenzhixin_net_cn-bundle;
	ssl_verify_client optional;

配置下面：

	ssl_client_certificate /etc/ssl/certs/wenzhixin_net_cn-bundle;
	ssl_verify_client optional;

是为了解决：

	unable to get local issuer certificate
	
的问题。