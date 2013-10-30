## Ubuntu 下无密码访问及文件同步

分类：操作系统 | 标签：SSH、rsync | 发布时间：2013-03-17 22:38:00

___

#### 服务器端配置 ssh

修改客户端sshd配置文件

	sudo vi /etc/ssh/sshd_config
	
修改为

	RSAAuthentication yes
	PubkeyAuthentication yes
	AuthorizedKeysFile     %h/.ssh/authorized_keys
	
重启ssh服务

	sudo /etc/init.d/sshd restart
	
___

#### 配置密钥

在客户端生成公钥和私钥文件

	ssh-keygen
	cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
	
scp 到服务器端
	
	scp ~/.ssh/authorized_keys username@hostname:~/.ssh/authorized_keys
	
修改 config 文件

	vi ~/.ssh/config

添加

	host sshname
        HostName hostname(ip address)
        user username
        IdentityFile ~/.ssh/id_rsa

测试

	ssh sshname (-p port)
	
___

#### rsync 同步

	rsync (--exclude=exclude) -avz (-e "ssh -p 22") ./ sshname:~/path
	
___

注：

1. 括号为可选
2. hostname 指域名或者 IP 地址
3. username 对应服务器的用户名