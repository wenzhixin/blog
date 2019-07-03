---
title: chrome 浏览器 console 面板直接使用 JSON 数据进行调试错误问题
date: 2014-11-02
categories: [前端技术]
tags: [console,JSON,错误]
---

今天在微博上看到小鱼在问：https://gist.github.com/sofish/c250881989aaa10c029d 为什么会出错，看了下之前就有遇到过这个问题，特意整理记录下。

是想直接 copy json 数据到 console 面板进行调试，但是竟然报错了。然后特意对比了下，奇怪的是为什么 `{a: "b"}` 是输出 `"b"`，而 `{"a": "b"}` 输出却是 `Uncaught SyntaxError: Unexpected token :`，why?

后面就研究了下，可以看到源码 [InjectedScriptSource.js](https://code.google.com/p/webkit-mirror/source/browse/Source/WebCore/inspector/InjectedScriptSource.js?r=ed19c0a99ddb564e317bb7363d481c2693ffb5fd#333) 中实现 console 是通过下面的方式：

```js
expression = "with ((window && window.console && window.console._commandLineAPI) || {}) {\n" + expression + "\n}";
eval(expression);
```

当我们在 `console` 面板下直接输入 `{a: "b"}` 时，相当于执行：

```js
eval("with ((window && window.console && window.console._commandLineAPI) || {}) {\n{a: \"b\"}\n}"); // "b"
```

而 `{"a": "b"}` 相当于执行：

```js
eval("with ((window && window.console && window.console._commandLineAPI) || {}) {\n{\"a\": \"b\"}\n}"); // Uncaught SyntaxError: Unexpected token :
```

因为 `with` 这里的 `{{ ... }}` 被忽略成了 `{}`，例如：

```
with (window) {{{{a:"b"}}}}; // window.a = "b";

with (window) {"a":"b"}; // error!!!
```

后面想直接 copy json 到 console 中进行调试的时候，加上：
```js
var obj = {"status":"error","error":{"msg":"\u6b64\u997f\u5355\u5df2\u6295\u8bc9","code":23}}; // undefined
```

就OK了，但是这样还得输入多一次 obj，干脆酱紫：

```js
}0,{"status":"error","error":{"msg":"\u6b64\u997f\u5355\u5df2\u6295\u8bc9","code":23} // Object {status: "error", error: Object}
```

还有其他的一些比较有趣的，例如输入：
```js
{} // undefined

( // Uncaught SyntaxError: Unexpected token }

}{ // undefined

}!{ // false

}!!{ // true

}+{ // NaN
```
