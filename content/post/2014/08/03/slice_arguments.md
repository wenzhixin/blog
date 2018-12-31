---
title: 理解 JavaScript 中的 Array.prototype.slice.apply(arguments)
date: 2014-08-03
categories: [前端技术]
tags: [slice,arguments]
---

假如你是一个 JavaScript 开发者，你可能见到过 Array.prototype.slice.apply(arguments) 这样的用法，然后你会问，这么写是什么意思呢？

这个语法其实不难理解，只是它有些不好看。Array 是 JavaScript 的基本类型，你可以使用 Array.prototype 获取它的属性值，在这里我假设你已经了解了 prototype 的概念。

slice 是 JavaScript 的一个方法，用于选取一个数组的一部分数据，并返回一个新的数组。它可以接收两个参数，startIndex（必选）和 endIndex。因此：

```
var a = ["a", "b", "c"];
a.slice(1,2);
```

将返回数组 ["b"]，它包含 a 数组从 1 到 2 之间元素。而：

```
var a = ["a", "b", "c"];
a.slice(1);
```

则会返回数组 [“b”, “c”]，它包含 a 数组从 1 到最后一个元素之间元素。

这里的 a 是个数组，那么变量 arguments 呢？

众所周知，当你调用 JavaScript 的函数的时候，会创建一个隐藏的名为 arguments 的参数，你是不是觉得它就是一个数组呢？答案是否定的，它是一个对象，但是与数组类似。

```
function f () {
  return arguments;
}

f("1", "2") instanceof Array;
```

这里，你会得到 FALSE 的结果，就是说我们不能像平常一样使用 Array 的函数，例如：push，pop，slice等等这些。但是我想使用这些方法，应该怎么办呢？

我们可以使用 Array.prototype.slice.apply(arguments) 对参数进行转换为真正的 Array。这里我们使用了 JavaScript 的 apply 方法，通过这个方法可以更好的了解 JavaScript 中调用函数的另一种方法。该方法将 slice 应用到第一个参数 arguments 中，并返回一个数组。

```
Array.prototype.slice.apply(f("1", "2")) instanceof Array;
```

现在可以看到这里返回 TRUE 的结果！！

PS：在 ECMAScript5 中，我们只需要直接调用 arguments.slice() 即可。
