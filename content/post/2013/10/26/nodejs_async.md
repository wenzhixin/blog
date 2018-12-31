---
title: nodejs 异步递归
date: 2013-10-26 00:00:00
categories: [前端技术]
tags: [async,递归,异步]
---

今天继续之前的下载服务器的开发，第一步调用文件的 API 已经成功了，那么今天的目标是列出应用目录下的所有文件（包括子目录）。

#### 1. 最初代码实现

代码的实现主要是用到了异步回调+递归：

    var https = require('https'),
        config = require('./config'),
        
        list = [];
    
    function getList(path) {
        https.get(config.file_url + 'list&access_token=' + config.access_token + '&path=' + path, function(res) {
            var content = '';
            
            res.setEncoding('utf8');
            res.on('data', function(data) {
                content += data;
            });
            res.on('end', function() {
                var result = JSON.parse(content);
                result.list.forEach(function(item) {
                    if (item.isdir === 1) { // 判断是否为目录
                        getList(item.path, callback);
                    } else {
                        console.log(item.path);
                        list.push(item.path);
                        // handle(list); // 完成处理 list
                    }
                });
            });
        });
    }
    
    getList(config.app_path);
    
到这里，貌似已经可以获取所有的文件的。  
但是发现了一个问题，那就是什么时候才完成所有的调用，然后对 list 进行下一步的处理呢？  
因为 https.get() 是一个异步的方法，我们无法知道什么时候完成。

#### 2. async.each 和 async.eachSeries 的实现

相信聪明的人已经知道怎么解决上面的问题了，但是我并不聪明，一时半会被卡在了这里。  
记得之前刚刚看过《JavaScript 异步编程》这本书，里面有提到 [async](https://github.com/caolan/async) 和 [step](https://github.com/creationix/step)。  
其实有用过了 async 了，但是一直是时间去研究源码，既然自己遇到了问题，那不搞懂也不能罢休。

修改了下，实现很简单：

    function each(arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        arr.forEach(function (x) {
            iterator(x, function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed >= arr.length) {
                        callback(null);
                    }
                }
            });
        });
    };

    function eachSeries(arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        var iterate = function () {
            iterator(arr[completed], function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed >= arr.length) {
                        callback(null);
                    }
                    else {
                        iterate();
                    }
                }
            });
        };
        iterate();
    };
    
其实也不难理解，加了 completed 参数统计完成的数量，两个函数都有 callback 作为结束的函数通知。  
有所不同的是 eachSeries 的话是在一次异步请求返回之后才进行下一个请求，这样就相当于实现了同步调用。

#### 3. 最终成果

    var https = require('https'),
        config = require('./config'),
        
        list = [];
    
    function getList(path, callback) {
        https.get(config.file_url + 'list&access_token=' + config.access_token + '&path=' + path, function(res) {
            var content = '';
            
            res.setEncoding('utf8');
            res.on('data', function(data) {
                content += data;
            });
            res.on('end', function() {
                var result = JSON.parse(content);
                each(result.list, function(item, callback) {
                    if (item.isdir === 1) {
                        getList(item.path, callback);
                    } else {
                        list.push(item.path);
                        callback();
                    }
                }, function(err) {
                    callback();
                });
            });
        });
    }
    
    getList(config.app_path, function() {
        list.forEach(function(path) {
            console.log(config.file_url + 'download&access_token=' + config.access_token + '&path=' + path);
        });
    });