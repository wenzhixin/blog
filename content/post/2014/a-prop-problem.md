---
title: Bootstrap a 标签按钮使用 prop 方法
date: 2014-06-18
categories: [前端技术]
tags: [Bootstrap,按钮,prop]
---

### 问题

将 jQuery 从 1.5.2 升级到 1.7.2 之后，统一将```attr('disabled', 'disabled')```改为```prop('disabled', true)```，将```attr('disabled', '')```改为```prop('disabled', false)```。由于使用了 bootstrap，所以很多按钮都是 a 标签按钮，如：

```
<a class="btn" href="javascript:void(0)">button</a>
```

当对 a 标签使用 prop 的时候，并没有禁用按钮。

### 原因

从[Bootstrap 禁用 a 按钮](/2013/08/12/disable-link)一文中，我们知道禁用 ａ 标签的按钮是利用 css，而通过[jQuery 中 attr() 和 prop() 方法的区别](/2013/05/24/jquery-attr-prop)我们知道对于 a 标签应该使用```attr('disabled', true)```。由于项目比较庞大，修改的地方也比较多，需要先判断这个按钮是否为 a 标签，那么有没有更好的办法呢？

### 解决

通过统一处理 jQuery 的函数来解决这个问题，代码如下：

```
(function() {
    var fn = {
        attr: jQuery.fn.attr,
        prop: jQuery.fn.prop
    };

    jQuery.fn.prop = function() {
        var value,
            args = Array.prototype.slice.apply(arguments);

        if (!this.length && args.length === 1) {
            return undefined;
        }
        this.each(function() {
            if (args.length === 1) {
                value = fn[$(this).is('a') ? 'attr' : 'prop'].apply($(this), args);
            } else {
                fn[$(this).is('a') ? 'attr' : 'prop'].apply($(this), args);
            }
        });
        return typeof value === 'undefined' ? this : value;
    };
})();
```

在这里，我们对原来的 prop 函数进行了预处理，假如是 a 标签则使用 attr 方式。
