---
title: 编写 WebStorm 实用工具
date: 2014-11-04
categories: [前端技术]
tags: [WebStorm,工具]
---

在写代码的时候，很多时候（例如写 jQuery 插件）需要将 html 代码转换为 js 模板。例如将下面的 html 代码：
```html
<ul>
    <li class="item">
        <a href="#">Item 1</a>
    </li>
</ul>
```

放到 js 中：

```js
var html = [
    '<ul>',
        '<li class="item">',
            '<a href="#">Item 1</a>',
        '</li>',
    '</ul>'
];
```

因为平时都是用 WebStorm 进行开发，就在想是否能够自定义快捷键实现这样的功能呢？
如按一下 `Ctrl + '` 切换为 js 代码，再按一次切换原来 html 的代码。先上想要的效果图：

![](/2014/11/04/gif.gif)

有了这样的想法，于是就开始尝试。

首先尝试了自定义 Keymap （快捷键）的方式，发现行不通，因为只能自定义 WebStorm 本身已经定义好的 Action。

![](/2014/11/04/1.png)

接着看到 External Tools 可以定义外部的程序，Good，这样就可以使用外部的脚本语言来实现我想要的功能。
一开始是想使用 shell 来编写的，但是发现编写起来有些吃力，何不用自己熟悉的 nodejs 来写呢。

![](/2014/11/04/2.png)

于是，便有了 `toggle-html-js-code` 的雏形：
```js
#! /usr/bin/node

var fs = require('fs');

// toggle-html-js-code $FilePath$ $SelectionStartLine$ $SelectionEndLine$

var filePath = process.argv[2],
    startLine = +process.argv[3],
    endLine = +process.argv[4],
    type = 'html',
    content,
    lines,
    i;

content = fs.readFileSync(filePath).toString();
lines = content.split('\n');

if (/'.*',?/.test(lines[startLine - 1])) {
    type = 'js';
}

for (i = startLine - 1; i < endLine; i++) {
    lines[i] = type === 'html' ?
        html2js(lines[i], i !== startLine - 1 && i === endLine - 1) :
        js2html(lines[i], i !== startLine - 1 && i === endLine - 1);
}
fs.writeFileSync(filePath, lines.join('\n'));


// tools

function html2js(str, lastLine) {
    if (!/([\S^'].*[\S^'])/.test(str)) {
        return str;
    }
    return str.replace(/([\S^'].*[\S^'])/, '\'\$1\'' + (lastLine ? '' : ','));
}

function js2html(str, lastLine) {
    if (lastLine) {
        if (!/'(.*)'/.test(str)) {
            return str;
        }
        return str.replace(/'(.*)'/, '\$1');
    } else {
        if (!/'(.*)',/.test(str)) {
            return str;
        }
        return str.replace(/'(.*)',/, '\$1');
    }
}
```

最后，再到 Keymap 中设置快捷键为 `Ctrl + '` 就大功告成了！

![](/2014/11/04/4.png)

![](/2014/11/04/3.png)

---

PS：上面的代码已经实现了自己想要的功能，但可能还需要进行完善优化，本文只是对自己想法进行了尝试并实现，或许可以用插件的方式来实现。
