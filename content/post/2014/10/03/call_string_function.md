---
title: 如何不用 eval 的方式通过字符串调用 JavaScript 的方法
date: 2014-10-03 23:28:00
categories: [前端技术]
tags: [eval,字符串,方法]
---

由于 [bootstrap-table](https://github.com/wenzhixin/bootstrap-table) 插件需要支持`data-name="functionName"`的方式，所以在实现的过程中使用了`eval`的方法。我们知道，在 JavaScript 中，`eval`是丑陋的，在[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/eval)中提到：

> Obsolete

> This feature is obsolete. Although it may still work in some browsers, its use is discouraged since it could be removed at any time. Try to avoid using it.

我们通过`eval`执行字符串代码，例如：
```js
eval("var x = 'Hello from eval!';");
console.log(x);
```

然而，`eval`会带来一些意想不到的问题：

1. 安全性问题：你的字符串可能会被注入其他的命令或者第三方脚本。
2. 可调试问题：很难去调试错误信息。
3. 压缩问题：程序不会对字符串进行最小化压缩。

不幸的是，在实际的开发中，`eval`经常会被滥用，例如解析 JSON 字符串，虽然使用`eval`可以正常工作，但是我们应该尽量避免使用它，例如使用`JSON.parse`方法。

那么，我们如何才能不用 eval 的方式通过字符串调用 JavaScript 的方法呢？

首先，假如我们有一个字符串名称的方法：
```js
// function we want to run
var func = 'runMe';

function runMe() {
    // do something
}
```

一个好的解决方法那就是我们可以通过`window`对象，在调用方法之前我们对其进行检查：
```js
// find function
var fn = window[func]; // runMe

// is a function?
if (typeof fn === 'function') {
    fn();
}
```

更多的时候，我们的方法是有一系列的参数的，例如我们存放到数组中，这个我们只需要简单的执行`apply`方法即可：
```js
// function name and parameters to pass
var func = 'runMe';
var args = [1, 2, 3];

// find function
var fn = window[func]; // runMe

// is a function?
if (typeof fn === 'function') {
    fn.apply(null, args);
}
```

到此，我们知道了不用 eval 的方式通过字符串调用 JavaScript 的方法，是更安全、容易进行调试、运行更快的方法。

最后，将其封装成了一个工具函数：
```js
var calculateFunctionValue = function (func, args, defaultValue) {
    if (typeof func === 'string') {
        // support obj.func1.func2
        var fs = func.split('.');

        if (fs.length > 1) {
            func = window;
            $.each(fs, function (i, f) {
                func = func[f];
            });
        } else {
            func = window[func];
        }
    }
    if (typeof func === 'function') {
        return func.apply(null, args);
    }
    return defaultValue;
};
```

___

**扩展：**

对字符串对象，也同样的方法处理。而对于字符串数组，则使用类似：
```js
'[5, 10, 20, 50, 100, 200]'.replace(/, /g, ',').slice(1, -1).split(',');
```
