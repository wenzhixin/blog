## ubuntu 下使用 FreeRDP 连接 Windows 远程桌面

分类：操作系统 | 标签：ssh、tunnel | 发布时间：2014-03-16 00:00:00

___

#### 简介

[FreeRDP](https://github.com/FreeRDP/FreeRDP) 是一款开源的远程桌面系统，支持多种平台，
在 ubuntu 中使用 FreeRDP 可以很方便的登录到 windwos 远程桌面中。

#### 安装

```
sudo apt-get install freerdp
```

#### 使用

```
xfreerdp -f host:port -u username -p password
```

**参数：**

* -f：表示全屏（切换全屏的快捷键为：Ctrl + Alt + Enter）

* host：远程服务器地址

* port：端口，默认为 3389

* -u username：用户名

* -p password：密码

例如：

```
xfreerdp -f 192.168.1.10 -u administrator -p 123456
```

表示远程桌面到 192.168.1.10

#### 常用插件

FreeRDP 提供了很多[插件](https://github.com/FreeRDP/FreeRDP/wiki/Plugins)

这里记录我比较常用到的插件：

**cliprdr（开启粘贴功能）**

```
--plugin cliprdr
```

例如：

```
xfreerdp -f --plugin cliprdr 192.168.1.10 -u administrator -p 123456
```

**rdpdr（开启本地文件夹映射为远程服务器磁盘功能）**

```
--plugin rdpdr --data disk:<Name>:<Path> --
```

例如将本地 /home/username/share 作为共享文件夹：

```
xfreerdp -f --plugin rdpdr --data disk:username:~/share -- 192.168.1.10 -u administrator -p 123456
```