---
title: 《锋利的jQuery》学习笔记——jQuery与Ajax应用
date: 2012-03-13 00:00:00
categories: [前端技术]
tags: [jQuery,Ajax]
---

 

​**1. 什么是 Ajax？**

 • Ajax 全称为”Asynchronous Javascript and XML”（异步 Javascript 和
XML），并不是指一种单一的技术，而是有机地利用了一系列交互式网页应用相关的技术所形成的结合体。

 

​**2. Ajax 的优势和不足**

 • Ajax 的优势：

(1)不需要插件支持；(2)优秀的用户体验；(3)提高
Web程序的性能；(4)减轻服务器和宽带的负担

 • Ajax 的不足

(1)  浏览器对 XMLHttpRequest
对象的支持度不足；(2)破坏浏览器前进、后退按钮的正常工作；(3)对搜索引擎的支持不足

 

​**3. Ajax的XMLHttpRequest对象**

 • Ajax 的核心是 XMLHttpRequest 对象，是 Ajax
实现的关键——发送异步请求、接收响应及执行回调。

(1)readyState 属性-标识当前对象正处于什么状态

(2)responseText 属性-包含客户端接收到的 HTTP 响应的文本内容

(3)responseXML 属性-描述被 XMLHttpRequest 解析后的 XML 文档的属性

(4)status 属性-描述 HTTP 的状态码

(5)statusText 属性-描述了 HTTP 的状态代码文本

(6)onreadystatechange 事件-当 readyState 属性值改变时，触发该事件

(7)open(method, uri, async, username, password) 方法-对 XMLhttpRequest
对象进行初始化

(8)send(params) 方法-按照 open() 方法设定的参数将请求进行发送

(9)abort() 方法-暂停一个 HttpRequest 的发送请求或者接收，并将
XMLHttpRequest 对象设置为初始化状态

(10)setRequestHeader() 方法-设置请求的头部信息

(11)getResponseHeader() 方法-获取 HttpResponse 的头部信息


​**4. jQuery 中的 Ajax**

(1)load(url[, data][, callback])

 • url-请求 HTML 页面的 URL 地址

 • data-发送至服务器的 key/value 数据，可选，没有设置参数表示使用 GET
方式，设置参数表示使用 POST 方式

 • callback(responseText, textStatus,
XMLHttpRequest)-请求完成时的回调函数，参数分别表示：请求返回的内容、请求状态（success、error、notmodified、timeout）和
XMLHttpRequest 对象

(2)

$.get(url[, data][, callback][, type])-使用 GET 方式来进行一步请求

$.post(url[, data][, callback][, type])-使用 POST 方式来进行一步请求

 • url-请求 HTML 页面的 URL 地址

 • data-发送至服务器的 key/value 数据，GET 作为 QueryString 附加到请求
URL 中，POST 作为 HTTP 消息的实体内容

 • callback(data,
textStatus)-载入成功时的回调函数，参数分别表示：返回的内容和请求状态（success）

 • type-服务器返回内容的格式，包括 xml、html、script、json、text 和_default

 • 注意：GET 方式请求的数据会被浏览器缓存起来，而 POST 方式不会

(3)$.getScript(url, callback)-用于动态加载 JS(.js) 文件

(4)$.getJSON(url, callback)-用于加载 JSON(.json) 文件

(5)$.ajax(options)-jQuery 最底层的 Ajax 实现

 • 参数 options 以 key/value 的形式存在：

 • url：发送请求的地址

 • type：请求方式（POST 或 GET）默认为 GET

 • timeout：设置请求超时时间（毫秒）

 • data：发送到服务器的数据，默认会将不是字符串会自动转换为字符串。GET
方式将附加在 URL 后

 •
dataType：预期服务器返回的数据类型（xml、html、script、json、jsonp、text），默认返回
responeXML 或 responseText

 • beforeSend：function(XMLHttpRequest)，发送请求前触发的事件

 • complete：function(XMLHttpRequest，textStatus)，请求完成后调用的回调函数（请求成功或失败都调用）

 • success：function(data, textStatus)，请求成功后调用的回调函数

 • error：function(XMLHttpRequest, textStatus,
errorThrown)，请求失败时被调用的回调函数

 • global：默认为 true，表示是否触发全局 Ajax 事件


​**5. 序列化方法**

 • serialize() 方法是用于一个 jQuery 对象，能将 DOM
元素内容序列化为字符串，用于 Ajax
请求。经常用于复杂的表单请求中，从而减少代码量

 • serializeArray() 方法是用于一个 jQuery 对象，能将 DOM 元素内容序列化为
JSON 格式的数据

 • $.param() 方法是用于将一个数组或者对象按照 key/value 进行序列化


​**6. jQuery 中的 Ajax 全局事件**

 • $.ajaxStart()-Ajax 请求开始时执行的函数

 • $.ajaxSend()-Ajax 请求发送前执行的函数\

 • $.ajaxComplete()-Ajax 请求完成时执行的函数

 • $.ajaxSuccess()-Ajax 请求成功时执行的函数

 • $.ajaxError()-Ajax 请求发生错误时执行的函数

 • $.ajaxStop()-Ajax 请求结束时执行的函数

 


