## 客户端数据存储之 Web Storage

分类：前端技术 | 标签：数据存储 | 发布时间：2013-04-09 23:52:00

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
    
**如何判断一个浏览器是否支持 Web Storage 呢？**

    function supportsLocalStorage() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }

**存储事件与触发条件**

当存储对象中的值发生变化后，会触发一个存储事件，事件的**数据结构**为：

    var StorageEvent = {
        key: 'key',
        oldValue: 'oldValue',
        newValue: 'newValue',
        url: 'url',
        storageArea: storage //更改的存储区域
    };
    
 通过 window 来添加**事件监听**：
    
    function addStorageEvent() {
        var handlerStorage = function(e) {
            console.log(e);
        };
        if (window.addEventListener) {
            window.addEventListener("storage", handlerStorage, false);
        } else {
            window.attachEvent("onstorage", handlerStorage); //IE浏览器
        };
    }

当然，也可以使用 jQuery 来添加事件：

    function addStorageEvent() {
        var handlerStorage = function(e) {
            console.log(e.originalEvent); //使用 jQuery 需要用 originalEvent
        };
        $(window).on('storage', handlerStorage);
    }

当调用 setItem(), removeItem(), 和 clear() 方法的时候，都会**触发 storage 事件**。

那么，下面的代码，是否会触发 StorageEent 呢？

    addStorageEvent();
    localStorage.setItem('name', 'wenyi');//是否会触发呢？

答案是 no，no～你一定会问为什么不会触发呢？

    A storage event is fired on every window/tab except for the one that updated the localStorage object and caused the event.
    
没错，确实不会触发。因为同一窗口下不会触发事件，当打开新的窗口或者标签，才会触发 Storage Event。

由此，我们可以知道，storage 事件主要是**用于监听 localStorage 数据改变时，通知其他窗口或者标签**。


___

#### 相关 jQuery 插件

* DSt ([https://github.com/gamache/DSt](https://github.com/gamache/DSt)) 是一个包装 localStorage 对象的简单类库。

* jStore ([https://code.google.com/p/jquery-jstore](https://code.google.com/p/jquery-jstore)) jQuery 的 jStore 插件，
支持 localStorage、sessionStorage、Gears SQLLite 和 HTML5 SQLLite，以及 Flash Storage 和 IE7 的解决方案。

___

#### 实践

在这里，我们来编写一个自定义界面用于对浏览器上的存储对象的查看和编辑。

思路：**使用表格来进行显示，使用 prompt 来进行编辑**

猛击 [这里](/demos/webstorage.html) 查看 demo

html 代码：

    <div>
        <button id="clear">清空所有</button>
      </div>
      <table>
        <thead>
              <tr>
                <th>键</th>
                <th>值</th>
                <th>操作</th>
              </tr>
        </thead>
        <tbody></tbody>
      </table>
      
js 代码：

    $(function() {
    
        var $tbody = $('table tbody');
    
        function main() {
            $(window).on('storage', list);
            
            //添加测试数据
            localStorage.setItem('name', 'wenzhixin');
            localStorage.setItem('age', 26);
            list();
            events();
        }
    
        function events() {
            $('#clear').click(function() {
                localStorage.clear();
                list();
            });
            $(document).on('click', 'button.edit', function() {
                var key = $(this).parents('tr').attr('data-key'),
                    value = localStorage[key],
                    newValue = prompt('请输入键为' + key + '的新值：', value);
                if (newValue) {
                    localStorage.setItem(key, newValue);
                    list();
                }
            });
            $(document).on('click', 'button.remove', function() {
                var key = $(this).parents('tr').attr('data-key');
                localStorage.removeItem(key);
                list();
            });
        }
    
        function list() {
            var html = [];
            for (var key in localStorage) {
                html.push(getItem(key, localStorage[key]));
            }
            $tbody.html(html.join(''));
        }
        
        function getItem(key, value) {
            return [
                '<tr data-key="' + key + '">', 
                    '<td>' + key + '</td>', 
                    '<td>' + value + '</td>', 
                    '<td>',
                        '<button class="btn edit">编辑</button>',
                        '<button class="btn remove">删除</button>',
                    '</td>',
                '</tr>'
            ].join('');
        }
    
        main();
    }); 

___ 
   
注：本文中的大部分观点以及例子属于个人理解，难免还有不准确的地方，欢迎有相关研究的同行指正。