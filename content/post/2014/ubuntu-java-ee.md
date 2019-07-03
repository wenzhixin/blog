---
title: Ubuntu 下搭建 JavaEE 环境
date: 2014-04-02
categories: [后台技术]
tags: [Ubuntu,JavaEE]
---

在 Ubuntu 下搭建 JavaEE 的环境稍微有些麻烦，这里记录下。

### 1. 安装 eclipse 和 tomcat7

```
sudo apt-get install eclipse
sudo apt-get install tomcat7
```

注：安装 eclipse 后会把依赖的 jdk 安装好，使用 apt-get 安装的 eclipse 是最精简的版本。

### 2. 安装 eclipse 的 JavaEE 插件

* 依次点击：Help -> Install New Software... -> Add

* 输入：http://download.eclipse.org/releases/indigo

* 选择：Eclipse Java EE Developer Tools、JST Server Adapters、JST Server Adapters Extentions 并进行安装

* 重启 eclipse

注：不安装 JST Server Adapters 的话，在 Eclipse Server Runtime Environments 选择不了 tomcat

### 3. create new server wizard

会出现 ```Cannot create a server using the selected type``` 的问题，解决：

```
cd .metadata/.plugins/org.eclipse.core.runtime/.settings/
rm org.eclipse.jst.server.tomcat.core.prefs
rm org.eclipse.wst.server.core.prefs
```

修改 tomcat7 的配置和文件权限：

```
cd /usr/share/tomcat7
sudo ln -s /var/lib/tomcat7/conf conf
sudo ln -s /etc/tomcat7/policy.d/03catalina.policy conf/catalina.policy
sudo ln -s /var/log/tomcat7 log
sudo chmod -R 777 /usr/share/tomcat7/conf
```

禁用 tomcat7 自启动：

```
sudo service tomcat7 stop
sudo update-rc.d tomcat7 disable
```

注：至此，已经搞定了，假如还有问题那还需要：

```
cd /usr/share/tomcat7
sudo ln -s /var/lib/tomcat7/common common
sudo ln -s /var/lib/tomcat7/server server
sudo ln -s /var/lib/tomcat7/shared shared
```
