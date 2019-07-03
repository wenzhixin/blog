---
title: 解决 jshint 的语法警告
date: 2013-11-29
categories: [前端技术]
tags: [jshint,语法警告]
---

#### 问题： Wrap the regexp literal in parens to disambiguate the slash operator

**示例代码：**
```
function isMe(name) {
	return /^wenzhixin$/.test(name);
}
```

**警告原因：**
虽然 JavaScript 解析器可以正常工作，但是对于解析器来说，解析 “/” 的完整含义是比较困难的。

**建议写法：**
```
function isMe(name) {
	return (/^wenzhixin$/).test(name);
}
```
