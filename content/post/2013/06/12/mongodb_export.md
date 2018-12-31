---
title: MongoDB mongoexport 命令的使用及简单实现
date: 2013-06-12 23:07:00
categories: [数据库]
tags: [MongoDB,mongoexport]
---

MongoDB 提供了 mongoexport 命令来导出数据，导出的数据是 json 格式的，当然也可以是 csv 格式。主要可以实现**备份和恢复**的功能。

具体的使用，我们使用 --help 查看，主要的参数有：

    -h [ --host ] arg         要连接的服务器，例如 127.0.0.1 或者 localhost
    
    --port arg                要连接服务器的端口，也可以使用 --host hostname:port
    
    -u [ --username ] arg     用户名
    
    -p [ --password ] arg     密码
    
    -d [ --db ] arg           使用的数据库（database）名称
    
    -c [ --collection ] arg   使用的集合（collection）
      
    -o [ --out ] arg          导出的文件名
    
    -f [ --fields ] arg       字段名称，使用逗号分隔，例如 -f name,age
      
    -q [ --query ] arg        查询过滤器
      
    --csv                     导出为 csv 格式

例如，我们要导出 tests 数据库中的 users 集合，可以使用：

    mongoexport -d tests -c users -o users.dat
    
现在，针对这几个简单的参数，我们自己使用 nodejs 来进行对 mongoexport 简单的实现，**大概思路**如下：

* 1. 使用 nodejs 的 mongodb 库 [node-mongodb-native](https://github.com/mongodb/node-mongodb-native) 来连接 MongoDB。

安装 mongodb：

    npm install mongodb
    
连接 MongoDB 的主要代码：

    var mongoClient = new MongoClient(new Server('localhost', 27017));
    
    mongoClient.open(function(err, mongoclient) {
    
    });

* 2. 使用 process.argv 来接收输入的参数

* 3. 使用 fs.writeFile 来输出 json 数据文件

**具体实现**如下：

    var fs = require('fs'),
        MongoClient = require('mongodb').MongoClient,
        Server = require('mongodb').Server,
    
        options = null;
        mongoClient = null;
    
    if (process.argv.length <= 2 || process.argv.indexOf('--help') !== -1) {
        showHelp();
        return;
    }
    
    options = getOptions();
    exportFile();
    
    function showHelp() {
        console.error([
            'Export MongoDB data to JSON files.',
            '',
            'options:',
              ' --help                                produce help message',
              ' -h [ --host ] arg                     mongo host to connect to',
              ' --port arg                            server port',
              ' -u [ --username ] arg                 username',
              ' -p [ --password ] arg                 password',
              ' -d [ --db ] arg                       database to use',
              ' -c [ --collection ] arg               collection to use (some commands)',
              ' -o [ --out ] arg                      output file'
        ].join('\n'));
    }
    
    function getOptions() {
        var args = process.argv,
            options = {
                host: '127.0.0.1',
                port: 27017
            },
            keys = {
                '-h': 'host',
                '--host': 'host',
                '--port': 'port',
                '-u': 'username',
                '--username': 'username',
                '-p': 'password',
                '--password': 'password',
                '-d': 'db',
                '--db': 'db',
                '-c': 'collection',
                '--collection': 'collection',
                '-o': 'output',
                '--out': 'output'
            };
        for (var i = 2; i < args.length; i += 2) {
            if (keys.hasOwnProperty(args[i])) {
                options[keys[args[i]]] = args[i + 1];
            }
        }
        return options;
    }
    
    function exportFile() {
        mongoClient = new MongoClient(new Server(options.host, options.port, {native_parse: true}));
        mongoClient.open(function(err, mongoclient) {
            var db = mongoclient.db(options.db);
            db.collection(options.collection).find().toArray(function(err, results) {
                if (err) {
                    console.log(err);
                    return;
                }
                fs.writeFile(options.output, JSON.stringify(results), function(err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log([
                        'connected to: ' + options.host,
                        'exported ' + results.length + ' records'
                    ].join('\n'));
                    mongoClient.close();
                });
            });    
        });
    }

**如何使用**：

    node mongoexport.js -d tests -c users -o users.dat
    
___

[源码下载](/demos/mongoexport.js)
