---
title: Ubuntu 设置 sshproxy 代理
date: 2012-10-24
categories: [操作系统]
tags: [sshproxy. 代理]
---

### 服务器端

#### 1. 添加用户，并切换到该用户：

    adduser sshproxy
    su - sshproxy

#### 2. 生成 key：

    ssh-keygen
    cd .ssh
    mv id_rsa.pub authorized_keys

#### 3. 禁止 sshproxy 用户登录：

    chsh -s /bin/false sshproxy

___

### 客户端：

#### 1. 拷贝密钥 id_rsa 到客户端，并进行配置：

    cd ~/.ssh
    mkdir sshproxy
    chmod 700 sshproxy
    mv id_rsa sshproxy/
    chmod 600 sshproxy/id_rsa

#### 2. 配置 sshproxy，在 .ssh/config 中加入：

    host sshproxy
            HostName <your hostname>
            user sshproxy
            IdentityFile ~/.ssh/sshproxy/id_rsa

#### 3. 安装 autossh

    wget https://launchpad.net/~likemartinma/+archive/net/+files/autossh_1.4c-1_amd64.deb
    sudo dpkg -i autossh_1.4c-1_amd64.deb

#### 4. 创建 /etc/init/myhost.conf

    # autossh

    description  "myhost autossh daemon"

    start on (net-device-up IFACE!=lo)
    stop on (net-device-down IFACE!=lo)

    respawn

    script
            exec /usr/bin/autossh -U <your username> -M40000 -q -N -D localhost:12345 sshproxy
    end script

#### 5. 启动 myhost

    sudo start / restart myhost

#### 6. 查看是否成功：

    ps -ef | grep autossh

#### 7. 配置 SOCKS v5 代理：

    SOCKS 代理：127.0.0.1
    端口：12345
