## nginx 开启 http 下载服务器认证

分类：后台技术 | 标签：nginx、http、认证 | 发布时间：2013-10-19 01:40:00

___

#### 1. 介绍

有时候，我们需要提供下载服务器给别人文件，但是又不想给所有人看到，从而保证安全性。
这种时候，对目录访问进行认证，并且每天改变随机密码，共享的时候提供地址、用户名和密码就可以了。

#### 2. nginx 设置

1) 设置 nginx 的配置文件（/etc/nginx/sites-enabled/default）：

    location /download/ {
        # 下载目录为 /home/myname/download
        root /home/myname;
        
        # 设置目录浏览
        autoindex on; 
        
        # 默认为on，显示出文件的确切大小，单位是bytes。 
        # 改为off后，显示出文件的大概大小，单位是kB或者MB或者GB 
        autoindex_exact_size off;
        
        # 默认为off，显示的文件时间为GMT时间
        # 注意:改为on后，显示的文件时间为文件的服务器时间 
        autoindex_localtime on;
        
        # 在第一次访问目录时，会弹出输入验证框
        auth_basic "Restricted";
        
        # 存放密码的文件，/etc/nginx/passwd/download
        auth_basic_user_file passwd/download;
        
        # 设置charset，解决中文乱码问题
        charset utf-8,gbk;
    }
    
2) 生成密码文件：

    sudo mkdir /etc/nginx/passwd
    sudo chmod 777 /etc/nginx/passwd
    sudo vi /etc/nginx/passwd/download
    sudo chmod 777 /etc/nginx/passwd/download
    
输入用户名和密码（密码会在第三步被替换）：

    admin: admin
    
* admin 为自己使用的用户名密码
* guest 提供给他人使用的用户名和密码

3) 设置 admin 的密码（apt-get install apache2-utils）：

    sudo htpasswd /etc/nginx/passwd/download admin
    
4) 重启 nginx 就可以了：

    sudo service nginx restart
    
#### 3. 每天随机生成 guest 密码

1) 编写 shell 脚本（random_password.sh）：

    #!/bin/bash

    passwd=`cat /dev/urandom | head -1 | md5sum | head -c 6`
    echo guest $passwd > /home/myname/download/password.txt
    htpasswd -b /etc/nginx/passwd/download guest $passwd
    
2) 编辑 crontab：

    crontab -e
    
添加内容：

    0 0 * * * random_password.sh
    
3) 登录查看密码：

http://yourhost/download/password.txt