## 《锋利的jQuery》学习笔记——jQuery插件

分类：前端技术 | 标签：jQuery、插件 | 发布时间：2012-03-14 00:00:00

___

​**1. 插件的种类**

(1)封装对象方法的插件：将对象方法封装起来，用于对通过选择器获取的 jQuery
对象进行操作

(2)封装全局函数的插件：将独立的函数加到 jQuery 命名空间下

(3)选择器插件


​**2. 插件的基本要点**

 • jQuery 插件的文件名推荐命名为 jquery.[插件名].js

 • 所有的对象方法都应当附加到 jQuery.fn
对象上，而所有的全局函数都应当附加到 jQuery 对象本身上

 • 在插件内部，this 指向的是当前通过选择器获取的 jQuery 对象

 • 可以用 this.each 来遍历所有元素

 • 所有的方法或函数插件，都应当以分号结尾

 • 插件应该返回一个 jQuery 对象，以保证插件的可链式操作

 • 避免在插件内部使用作为 jQuery 对象的别名，而应使用完整的 jQuery
来表示

 • 使用闭包技巧


​**3. 插件中的闭包**

(1)闭包指的是：允许使用内部函数，这些内部函数可以访问它们所在的外部函数中的所有局部变量、参数和生命的其他内部函数，当其中一个这样的内部函数在包含它们的外部函数之外被调用时，就会形成闭包

```
(function() {
	/\*这里置放代码\*/
})();
```

(2)jQuery 中的闭包，为了更好的兼容性，在开始前加分号

```
;(function() {
	/\*这里置放代码\*/
})(jQuery);
```

​**4. jQuery 插件的机制**

(1)jQuery.fn.extend(Object)-封装对象方法
```
;(function() {
	$.fn.exetend({
		func1: function() {
			/\*这里置放代码\*/
			return this;
		},

		func2: function() {
			/\*这里置放代码\*/
			return this.each(function() {
				/\*这里置放代码\*/
			});
		},
		
		...
	}
})(jQuery);
```

 • 插件内部的 this 指向的是 jQuery 对象

 • 插件扩展函数应该返回 jQuery 对象，即
this，从而使其具有可链接性；当选择器匹配多个元素时，应返回每个匹配匹配元素，即
this.each(function)

 • 使用：("element").func1(), ("element").func2(), ...

(2)jQuery.extend(Object)-封装全局函数或者封装选择器

```
;(function() {
	$.exetend({
		func1: function() {
			/\*这里置放代码\*/
			return this;
		},

		func2: function() {
			/\*这里置放代码\*/
			return this;
		},
		...
	});
})(jQuery);
```

 • 使用：.func1(), .func2(), ... 或者 jQuery.func1(), jQuery.func2(),
...

(3)jQuery.extend(target, obj1, obj2, ...)-用于扩展已有的 Object
对象，用一个或多个对象来扩展一个对象，返回被扩展的对象。经常被用于设置插件方法的一系列默认参数，如：

```
function func(options) {
	options = jQuery.exetend({
		key1: value1,
		key2: value2,
		...                /\*默认参数\*/
	}, options);
}
```