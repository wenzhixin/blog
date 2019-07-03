---
title: nodejs 通过 JSON-RPC 调用 aria2 接口
date: 2013-10-27
categories: [前端技术]
tags: [aria2,websocket,jsonrpc]
---

今天继续之前的下载服务器的开发，第一步是调用文件的 API，第二步是列出应用目录下的所有文件，今天的目标是调用后台接口进行下载。

#### 1. aria2 配置

这里，我们用到的是 aria2，aria2 是一个命令行下运行、多协议、多来源下载工具。
它除了可以像 wget 一样直接下载文件外，最主要的功能是可以启用后台服务，启动后等着从 rpc 接口添加任务。

在[搭建小型下载服务器](/2013/07/01/raspberry-server)一文中，提到启动的方式为：

    aria2c --enable-rpc --rpc-listen-all &

用命令方式导致配置不方便修改保存，推荐启动方式是使用配置文件 $HOME/.aria2/aria2.conf 来进行启动。

    aria2c --conf-path=/home/pi/.aria2/aria2.conf &

1) 首先，创建 aria2.conf 文件

    vi ~/.aria2/aria2.conf

2) 输入内容：

    #允许rpc
    enable-rpc=true
    #允许非外部访问
    rpc-listen-all=true
    #RPC端口, 仅当默认端口被占用时修改
    rpc-listen-port=6800

    #最大同时下载数(任务数), 路由建议值: 3
    max-concurrent-downloads=10
    #断点续传
    continue=true
    #同服务器连接数
    max-connection-per-server=10
    #最小文件分片大小, 下载线程数上限取决于能分出多少片, 对于小文件重要
    min-split-size=10M
    #单文件最大线程数, 路由建议值: 5
    split=10
    #下载速度限制
    max-overall-download-limit=0
    #单文件速度限制
    max-download-limit=0
    #上传速度限制
    max-overall-upload-limit=0
    #单文件速度限制
    max-upload-limit=0

    #文件保存路径, 默认为当前启动位置
    dir=/home/pi/Downloads

3) 增加系统启动脚本（raspberrypi 系统还有待研究）

#### 2. 编写 nodejs 代码

1) aria2 JSON-RPC 接口以及 nodejs 模块

* [JSON-RPC 接口](http://manpages.ubuntu.com/manpages/oneiric/ru/man1/aria2c.1.html)
* [websocket](https://github.com/Worlize/WebSocket-Node)

2) 封装 websocket client

    var WebSocketClient = require('websocket').client,

        client = new WebSocketClient(),
        conn,
        cb,
        cbmap = {};

    client.on('connect', function(connection) {
        console.log('INFO: WebSocket client connected to Aria2.');
        connection.on('error', function(error) {
            console.error("ERROR: Connection Error: " + error.toString());
        });
        connection.on('close', function() {
            console.log('INFO: Connection Closed');
        });
        connection.on('message', function(message) {
            if (message.type === 'utf8') {
                var data = JSON.parse(message.utf8Data);
                if (typeof cbmap[data.id] === 'function') {
                    var result = {
                        obj: data,
                        err: data.error ? new Error(data.error.message) : false
                    };
                    cbmap[data.id](result);
                }
                delete cbmap[data.id];
            }
        });

        conn = connection;
        if (typeof cb === 'function') {
            cb();
        }
    });

    client.on('connectFailed', function(error) {
        console.error('ERROR: Client Error: ' + error.toString());
    });

    function connect(callback) {
        cb = callback;
        client.connect('ws://localhost:6800/jsonrpc');
    }

    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = (c === 'x') ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function send(command, callback) {
        var id = uuid();
        if (typeof callback === 'function') {
            cbmap[id] = callback;
        }

        command.jsonrpc = '2.0';
        command.id = id;
        conn.sendUTF(JSON.stringify(command));
    }

    exports.connect = connect;
    exports.send = send;

3) 调用 websocket 开始下载：

    var websocket = require('./websocket');

    websocket.connect(function() {
        websocket.send({
            method : 'aria2.addUri',
            params : [['http://wenzhixin.net.cn/images/header_bg.jpg']]
        }, function(result) {
            console.log(result);
        });
    });

到这里，查看 /home/pi/Downloads，可以看到已经成功下载了 header_bg.jpg 文件，
已经可以调用后台的 aria2 接口进行添加下载地址并下载我们想要的东西了。
