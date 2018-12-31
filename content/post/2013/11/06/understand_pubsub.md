---
title: 理解并实现 PubSub 模式
date: 2013-11-06 12:54:00
categories: [前端技术]
tags: [PubSub 模式,分布式事件]
---

假如我们正在构建一个类似于 Google Docs 的应用程序，当用户按下一个按键时，需要做的事情有很多：
新字符显示到屏幕上；插入点向后移动；将本次动作加入到撤销的历史记录中；
保持与服务器同步；拼写错误检查；统计字数和页数等等。

按照传统的做法，假如我们监听 keypress 事件，并在一个处理中完成所有的任务，这想想都觉得可怕了。
那么有没有什么方法可以更好的解决这个问题，答案就是**分布式事件**。

PubSub 模式，是 Publish/Subscribe 的缩写，意为“发布/订阅”模式。

在实际使用中，我们应该也会接触到 PubSub 模式，例如 Nodejs 中的 EventEmitter、Backbone 中的事件模型、以及 jQuery 中的事件。
以 EventEmitter 为栗子，它提供了 addListener(event, listener)，removeListener(event, listener)，emit(event, [arg1], [arg2], [...]) 方法。

	var emitter = new EventEmitter(),
		fn1 = function(value) {
			console.log('fn1:', value);
		},
		fn2 = function(value) {
			console.log('fn2:', value);
		};
		
	emitter.addListener('message', fn1);
	emitter.addListener('message', fn2);
	emitter.emit('message', 'test1');
	emitter.removeListener('message', fn2);
	emitter.emit('message', 'test2');
	
	//fn1: test1
	//fn2: test1
	//fn1: test2
	
当调用 emit 方法时，会触发所有监听的事件。

就像上面说的，PubSub 其实很简单，现在我们来实现属于我们自己的 PubSub 对象。

首先创建 PubSub 类，增加 handlers 变量用于保存事件列表：

	function PubSub() {
		this.handlers = {};
	}
	
添加事件时，将监听器加到数组中：
	
	PubSub.prototype.on = function(type, listener) {
		if (!(type in this.handlers)) {
			this.handlers[type] = [];
		}
		this.handlers[type].push(listener);
	};

删除事件时，移除监听器：
	
	PubSub.prototype.off = function(type, listener) {
		var i,
			position = -1,
			list = this.handlers[type],
			length = this.handlers[type].length;
		
		for (i = 0; i < length; i++) {
			if (list[i] === listener) {
				position = i;
				break;
			}
		}
		
		if (position === -1) {
			return;
		}
		
		if (length === 1) {
			delete this.handlers[type];
		} else {
			this.handlers[type].splice(position, 1);
		}
	};
	
触发事件，循环遍历并触发所有的事件：
	
	PubSub.prototype.emit = function(type) {
		var args = Array.prototype.slice.call(arguments, 1),
			i,
			list = this.handlers[type],
			length = this.handlers[type].length;
		
		for (i = 0; i < length; i++) {
			list[i].apply(this, args);
		}
	};

测试：

	var pubsub = new PubSub(),
	    fn1 = function(value) {
	            console.log('fn1:', value);
	    },
	    fn2 = function(value) {
	            console.log('fn2:', value);
	    };
	
	pubsub.on('message', fn1);
	pubsub.on('message', fn2);
	pubsub.emit('message', 'test1');
	pubsub.off('message', fn2);
	pubsub.emit('message', 'test2');
	
	//fn1: test1
	//fn2: test1
	//fn1: test2

注：更多的实现请看 Nodejs 中的 [events.js](https://github.com/joyent/node/blob/master/lib/events.js)
