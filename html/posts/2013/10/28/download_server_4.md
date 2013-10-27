## 开发下载服务器——第四天

分类：项目 | 标签：nodejs、路由、主机 | 发布时间：2013-10-28 00:30:00

___

#### 1. 介绍

接着之前，今天的目标是通过 nodejs 获取使用路由的主机名称列表。

路由器的默认登录地址为：http://192.168.1.1

默认的用户名密码都为：admin

通过 chrome 浏览器的 Network 工具，我们可以知道路由器的登录方式是 HTTP Basic Authentication。

HTTP Basic Authentication 是一种通过直接提供用户名、密码来进行验证身份的一种优化的解决方案。

因此，在访问一个需要 HTTP Basic Authentication 的 URL 的时候，如果你没有提供用户名和密码，服务器就会返回401，
如果直接在浏览器中打开，浏览器会提示你输入用户名和密码。

要在发送请求的时候添加 HTTP Basic Authentication 认证信息到请求中，有两种方法：

1) 在请求头中添加Authorization：

    Authorization: "Basic 用户名和密码的base64加密字符串"

2) 在url中添加用户名和密码：

    http://userName:password@192.168.1.1
    
通过分析路由器的页面地址，可以知道获取主机列表的页面地址为：

    http://192.168.1.1/userRpm/AssignedIpAddrListRpm.htm?Refresh=true
    
#### 2. 代码实现

在这里，我们使用第二种方法来添加认证，使用 http 模块获取主机列表页面的内容，在通过正则表达式进行匹配出主机列表。

    var http = require('http');

    http.get('http://admin:admin@192.168.1.1/userRpm/AssignedIpAddrListRpm.htm?Refresh=true', function(res) {
        var content = '';
        
        res.setEncoding('utf8');
        res.on('data', function(data) {
            content += data;
        });
        res.on('end', function() {
            handle(content);
        })
    });
    
    function handle(content) {
        content = content.replace(/\n/g, '');
        var m = content.match(/var DHCPDynList = new Array\(([^\)]*)\);/);
        var str = m[1].substring(1);
        var arr = str.split('", "');
        var agents = [];
        var i = 0;
        while (i < arr.length) {
            agents.push(arr[i]);
            i += 4;
        }
        console.log(agents);
    }