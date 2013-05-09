## 客户端数据存储(一)

分类：JavaScript | 标签：数据存储 | 发布时间：2013-04-09 23:52:00

___

### Web Storage

Web Storage 有两种形式：localStorage (本地存储) 和 sessionStorage (会话存储)。
与 cookie 相似，都是使用**键值对**来对数据进行存储和读取。

**这里对 cookie 与 Web Storage 进行了比较：**

* cookie：

容量 4kb，支持各种浏览器，但是每次请求浏览器都会把本机存的 cookies 发送到服务器

* Web Storage:

1) 存储空间更大  
2) 数据则仅仅是存在本地，不与服务器发生任何交互  
3) 独立的存储空间

**而 localStorage 与 sessionStorage 的区别：**

* localStorage：

即使浏览器关闭了，数据也会被保存下来并可用于所有来自同源（相同域名、协议和端口）窗口的加载。

主要用于**参数设置**或者**偏好设置**的功能。

* sessionStorage：

数据存储在窗口对象中，对于其他窗口或标签不可见，并且当窗口关闭时，数据丢失。

主要用于**特殊的窗口状态**。

**那么要怎么使用 Web Storage？**

其实提供的接口很简单，localStorage 和 sessionStorage 的用法是一样的。

* 设置数据：setItem(name, value)

* 获取数据：getItem(name)

* 删除键值：removeItem(name)

* 删除所有键值：clear()

例如：

	localStorage.setItem('name', 'wenzhixin');
	localStorage.getItem('name'); //'wenzhixin'
	localStorage.removeItem('name');
	localStorage.clear();

当然，你也可以使用普通的对象用法：

	localStorage.name = 'wenzhixin';
	localStorage['name'] = 'wenzhixin';
	localStorage.name; //'wenzhixin'
	localStorage['name']; //'wenzhixin'
	delete localStorage.name;//删除键值
	delete localStorage['name'];//删除键值
	
在**实际使用**中，会先将数据转换为 JSON，作为字符存储，如：

	localStorage[name] = JSON.stringify(value); //存储
	JSON.parse(localStorage[name]); //读取

___

#### 相关 jQuery 插件

DSt ([https://github.com/gamache/DSt](https://github.com/gamache/DSt)) 是一个包装 localStorage 对象的简单类库。

___

#### 实践

在这里，我们来编写一个自定义界面用于对浏览器上的存储对象的查看和编辑

未完待续......