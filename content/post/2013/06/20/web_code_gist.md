---
title: Web 前端开发有用的代码片段
date: 2013-06-20 23:43:00
categories: [前端技术]
tags: [JavaScript,Web,代码片段]
---

### 1. 定时器

经常会用到 setTimeout 和 setInterval 函数，假如可以整合起来，会方便很多：

    function timer(func, start, interval, end) {
        start = start || 0;
        if (arguments.length <= 2) {
            setTimeout(func, start);
        } else {
            var repeat = function() {
                var i = setInterval(func, interval);
                end && setTimeout(function() {
                    clearInterval(i);
                }, end);
            };
            setTimeout(repeat, start);
        }
    }
    
参数：

* func：需要运行的函数
* start：开始时间，单位为毫秒，不填表示立即开始
* interval：运行间隔，单位为毫秒，不填表示运行一次
* end：结束时间，单位为毫秒

例子：

    // 立即运行
    timer(function() {
        console.log('test1');
    });
    
    // 2秒后开始运行
    timer(function() {
        console.log('test2');
    }, 2000);
    
    // 2秒后开始运行，并隔2秒重复运行1次
    timer(function() {
        console.log('test3');
    }, 2000, 2000);
    
    // 2秒后开始运行，并隔1秒重复运行1次，结束时间为10秒后
    timer(function() {
        console.log('test4');
    }, 2000, 1000, 10000);
    
源码：[https://gist.github.com/wenzhixin/5820136](https://gist.github.com/wenzhixin/5820136)

### 2. url 解析

在看 location 的时候（详细见《JavaScript权威指南》14.2 浏览器定位和导航），说到 location 同时也适用与 a 和 area 标签，
于是在想平时不是经常要解析 url 字符串嘛，那利用 a 或者 area 标签岂不是更省事：

    function url(href) {
        var a = document.createElement('a');//or document.createElement('area')
        a.href = href;
        return a;
    }
    
参数：

* href：需要解析的 href 字符串

例子：

    var u = url('http://wenzhixin.net.cn:12345/test?name=wenzhixin#about');
    console.log(u.protocol); // http:
    console.log(u.hostname); // wenzhixin.net.cn
    console.log(u.port); // 12345
    console.log(u.pathname); // /test
    console.log(u.search); // ?name=wenzhixin
    console.log(u.hash); // #about
    
源码：[https://gist.github.com/wenzhixin/5820633](https://gist.github.com/wenzhixin/5820633)

### 3. search 解析

解析 location.search，转换为对象：

    function parse(search) {
        var query = {}, 
            params = search.substring(1).split('&');
        for (var i = 0, l = params.length; i < l; i++) {
            var p = params[i].split('=');
            query[p[0]] = p[1] || '';
        }
        return query;
    }

参数：

* search：query 查询字符串

例子：

    var query = parse('?name=zhixin&age=26&blog=wenzhixin.net.cn&ttt');
    console.log(query); // Object {name: "zhixin", age: "26", blog: "wenzhixin.net.cn", ttt: ""}

源码：[https://gist.github.com/wenzhixin/5823839](https://gist.github.com/wenzhixin/5823839)

问题：想过用正则

	.*\?(?:(\w+)=(\w+)&)*(\w+)=(\w+)

来实现的，可是没能匹配出来，结果只能匹配出最后两个，
才知道是因为 Groups only remember the last value they captured。 或许，有更好的办法？

### 4. ...

(未完待续...)
