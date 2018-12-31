---
title: 详解 jQuery.extend() 方法
date: 2014-01-17
categories: [前端技术]
tags: [jQuery,extend]
---

今天在写插件，使用```$.extend({}, defaults, options)```的时候发现漏写了 {}，浪费了一些时间，
所以详细记录下该方法的 API 和使用。

API 如下：

jQuery.extend(  [ deep ], target, [ object1 ], [ objectN ] )

描述：合并两个或更多的对象的内容汇集成到第一个对象。

* deep：如果是true，合并成为递归（又叫做深拷贝）。

* target：一个对象，如果附加的对象被传递给这个方法将那么它将接收新的属性，如果它是唯一的参数将扩展 jQuery 的命名空间。

* object1：一个对象，它包含额外的属性合并到第一个参数

* objectN：包含额外的属性合并到第一个参数

源码如下：
```
jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};
```

关键代码为：
```
for ( name in options ) {
    src = target[ name ];
    copy = options[ name ];
    if ( deep ) {
        clone = src;
        target[ name ] = jQuery.extend( deep, clone, copy );
    } else {
        target[ name ] = copy;
    }
}
```
假如 deep 为```true```，则递归调用 extend 函数，从而实现深度拷贝。

当我们提供两个或多个对象给$.extend()，对象的所有属性都添加到目标对象。

通过代码可以看到目标对象（第一个参数）将被修改，也将通过 $.extend() 返回。

如果我们想保留原对象，我们可以通过传递一个空对象作为目标：
```
var object = $.extend({}, object1, object2);
```
