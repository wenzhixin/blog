---
title: 如何获取 div 的实际高度
date: 2014-05-04 22:00:00
categories: [前端技术]
tags: [div,实际高度]
---

在实际开发中，需要对 div 的高度进行计算并自动设置高度，但是遇到了这样的一个问题：

```html
<div id="outer">
    <div id="inner" style="height: 50px; margin-top: 20px; margin-bottom: 20px;">
        如何获取 div 的实际高度
    </div>
</div>
```

```js
<script>
    $(function() {
        console.log($('#outer').outerHeight(true)); // 50
        console.log($('#inner').outerHeight(true)); // 90
    });
</script>
```

可以看到，```outer``` 的高度为 50，而 ```inner``` 的高度为 90，并非是我们想要的结果。

通过查看 [W3C 相关文档](http://www.w3.org/TR/CSS21/box.html#collapsing-margins)，可以发现这并不是 jQuery 的 bug，
当父元素包含多个子元素的，并且第一个子元素有 ```margin-top```，最后一个子元素有 ```margin-bottom``` 属性的时候，
就会出现以上的问题。

根据 W3C 的标准，假如目标 div 有对应的 ```border-width``` 或者 ```padding```属性，例如对于第一个子元素，
有 ```border-top-width``` 或者 ```padding-top```（最后一个子元素同理），就可以避免这种情况的发生。

由此，我们有了通用的**解决方法**：

```
function realHeight($el) {
    var height = $el.wrap('<div style="border: 1px solid transparent;"></div>').parent().outerHeight(true);
    $el.unwrap();
    return height - 2; // 减去 border 的高度
}
```

**注：**

* 这里的 $el 不仅仅为 div 元素，其他元素也一样。
* 你可能会觉得干嘛不设置目标元素的 ```border-top-width``` 就可以了，
这里使用 ```wrap```，是避免目标元素本身就有设置 border 属性，从而计算错误的高度。
* 或者有更好的做法？有的话请告知。