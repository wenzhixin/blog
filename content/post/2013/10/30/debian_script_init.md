---
title: Debian 添加自启动服务
date: 2013-10-30 07:46:00
categories: [操作系统]
tags: [Debian,aria2c,自启动]
---

#### 1. 新建脚本文件

+ 在 /etc/init.d 下加入脚本文件

```bash
sudo vi /etc/init.d/aria2c
```
	
+ 输入内容：

```bash
#!/bin/sh
### BEGIN INIT INFO
# Provides:          Aria2
# Required-Start:    $network $local_fs $remote_fs
# Required-Stop::    $network $local_fs $remote_fs
# Should-Start:      $all
# Should-Stop:       $all
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Aria2 - Download Manager
# Description:       Aria2 - Download Manager
### END INIT INFO

NAME=aria2c
USER=pi
ARIA2C=/usr/bin/$NAME
PIDFILE=/var/run/$NAME.pid
CONF=/home/$USER/.aria2/aria2.conf
ARGS="--conf-path=${CONF}"

test -f $ARIA2C || exit 0

. /lib/lsb/init-functions

case "$1" in
start)  log_daemon_msg "Starting aria2c" "aria2c"
        start-stop-daemon -S -q -b -m -p $PIDFILE -c $USER -a $ARIA2C -- $ARGS
        log_end_msg $?
        ;;
stop)   log_daemon_msg "Stopping aria2c" "aria2c"
        start-stop-daemon -K -q -p $PIDFILE
        log_end_msg $?
        ;;
restart|reload|force-reload)
        log_daemon_msg "Restarting aria2c" "aria2c"
        start-stop-daemon -K -R 5 -q -p $PIDFILE
        start-stop-daemon -S -q -b -m -p $PIDFILE -c $USER -a $ARIA2C -- $ARGS
        log_end_msg $?
        ;;
status)
        status_of_proc -p $PIDFILE $ARIA2C aria2c && exit 0 || exit $?
        ;;
*)      log_action_msg "Usage: /etc/init.d/aria2c {start|stop|restart|reload|force-reload|status}"
        exit 2
        ;;
esac
exit 0
```

以上脚本 ```### BEGIN INIT INFO - ### END INIT INFO``` 为启动脚本需要定义的 metadata 信息，不定义会报错

启用脚本使用 start-stop-daemon 命令，参数为：

* -S, --start  启动服务
* -K, --stop  停止服务
* -q, --quiet  静默启动，不输出日志
* -b, --background  后台启动
* -m, --make-pidfile  创建 pid 文件
* -p, --pidfile  指定 pid 文件
* -c, --chuid  指定启动用户
* -a, --startas pathname  进程路径
* -R, --retry timeout|schedule  重试次数

需要将 USER 修改为自己的用户名称  
配置文件位于 /home/$USER/.aria2/aria2.conf

更多参数含义可以通过 `man start-stop-daemon` 进行查看

+ 修改脚本权限

```bash
sudo chmod +x /etc/init.d/aria2c
```
	
+ 测试脚本

```
sudo /etc/init.d/aria2c start
sudo /etc/init.d/aria2c status
sudo /etc/init.d/aria2c stop
sudo /etc/init.d/aria2c status
sudo /etc/init.d/aria2c restart
```
	
#### 2. 使用 insserv 设置自动启动

+ 添加服务

```bash
sudo insserv /etc/init.d/aria2c #添加服务
sudo insserv -r /etc/init.d/aria2c #删除服务
```
	
+ 重启测试

```
sudo reboot
sudo /etc/init.d/aria2c status
```
