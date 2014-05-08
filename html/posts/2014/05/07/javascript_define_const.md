## 在 JavaScript 中定义常量（不可修改）

分类：前端技术 | 标签：常量、不可修改 | 发布时间：2014-05-07 23:00:00

___

[define-const.js](https://github.com/wenzhixin/define-const.js)

在《JavaScript 启示录》的最后一章中提到:
> Math 属性是无法改变的常数。这与 JavaScript 可变性质相悖，因此这些属性全部大写。

于是在浏览器（包括 IE6-IE8）中做了测试，确实如此：
```
Math.PI = 3;
alert(Math.PI); // 3.141592653589793
```

比较感兴趣的是它是如何实现的，我们是否可以自己定义这样的常量？

虽然许多编程语言提供了 const 关键字来支持常量的声明，但 JavaScript 里没有表示常量的语义。
在平时的开发中，都是通过命名规范（大写+下划线）来定义一个常量的，例如：
```
var MAX_CONST = 10000;
var MIN_CONST = -10000;
```

但是实际上，它们跟普通的变量没什么区别，并不能阻止用户改变“常量”的值。

虽然不知道 Math 内部是如何实现的，但是假如可以自己实现这样的不可变的常量，在应用中还是比较有作用。

通过查看 JavaScript 的文档，可以使用 [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 方法来定义这样的一个变量。如：
```
var Const = {};
Object.defineProperty(Const, PI, {writable: false, value: 3.14});
Const.PI = 3;
alert(Const.PI); // 3.14
```

我们将 ```writable``` 设置为 ```false```，即可简单的实现这样的功能。
但是问题 ```defineProperty``` 是 ECMAScript 5 才有的，也就是说旧浏览器（IE6、IE7）用不了，
而且在 IE8 下，虽然也定义了这样的方法，但是仅仅只对 DOM 对象才有效。

Github 上有许多 shim 的 repo，例如 [es5-shim](https://github.com/es-shims/es5-shim) 也没有实现这个方法：
> Unfortunately, because Object.defineProperty is part of ES5, it is only fully supported in IE9 and newer. IE8 has a partial implementation which only works on DOM objects, and would be useless for the examples considered above. Even more unfortunately, there is no compatibility shim for IE8.

我们知道，DOM 对象拥有 ```onpropertychanged``` 的事件，可以用于监听 DOM 对象属性值的改变。
为了兼容旧浏览器，我们可以利用这一特性，来实现我们想要的功能。

于是有了```define-const.js```：
```
function defineConst(props) {
    var obj = {},
        hack = !Object.defineProperty || /MSIE 8.0/.test(navigator.userAgent);

    if (hack) {
        var onPropertyChange = function (e) {
            // temporarily remove the event so it doesn't fire again and create a loop
            obj.detachEvent('onpropertychange', onPropertyChange);
            obj[e.propertyName] = props[e.propertyName];
            // restore the event
            obj.attachEvent('onpropertychange', onPropertyChange);
        };

        // IE6 - IE7: must be a DOM object (even if it's not a real tag) attached to document
        // IE8 (defineProperty must be a DOM object)
        obj = document.createElement('fake');
        document.body.appendChild(obj);
    }
    for (var prop in props) {
        if (hack) {
            obj[prop] = props[prop];
        } else {
            // Modern browsers, IE9+
            Object.defineProperty(obj, prop, {writable: false, value: props[prop]});
        }
    }

    if (hack) {
        obj.attachEvent('onpropertychange', onPropertyChange);
    }

    return obj;
}

```

通过判断是否定义 ```Object.defineProperty``` 以及正则匹配出 IE6-IE8 浏览器，然后创建了一个假的元素 ```fake```，
并添加到 ```body``` 中，这样就可以通过监听 ```onpropertychange``` 来实现想要的功能了。

这里支持定义多个常量，返回一个对象。
```
var Const = defineConst({
    PI: 3.14,
    MAX: 10000,
    MIN: -10000
});

Const.PI = 3;
Const.MAX = 20000;
Const.MIN = -20000;

alert(Const.PI); // 3.14
alert(Const.MAX); // 10000
alert(Const.MIN); // -10000
```

最后，不知道 Math 是如何实现的，知道的人麻烦告知下。