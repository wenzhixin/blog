## Ubuntu 开发 Nodejs 入门小记

分类：Nodejs | 标签：Nodejs | 发布时间：2012-10-25 22:40:00

___

### Nodejs 之搭建环境

##### 1) 安装 nodejs、npm

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs npm

##### 2) 安装 express​ - web application framework for node

    sudo npm install -g express

##### 3) 安装 supervisor - is used to restart programs when a *.js file changes
​
    npm install -g supervisor

___

### Nodejs 之模块与包

##### 1) 模块是什么
一个 Nodejs 文件（Javascript 代码、JSON 代码或者 C/C++ 模块）就是一个模块。

##### 2) 加载、创建模块

    require 用来访问其他模块提供的 API
    exports 用来向外提供模块的 API
    module 存储模块的元信息

例子：

    exports.func = function() {};
    var hello = require("./hello");
    hello.func();
    
    function Hello() {}
    module.exports = Hello;
    var Hello = require("./Hello");
    var hello = new Hello();

##### 3) 包（package.json）字段：

    name 包的名称
    description 简要说明
    version 版本号
    keywords 关键字数组，用于搜索
    ​maintainers 维护者数组，包含 name、email（可选）、web（可选）
    ​contributors 贡献这数组，作者为第一个元素
    bugs 提交 bug 的地址
    licenses 许可证数组
    repositories 仓库托管地址数组，包含 type、url、path（可选）
    dependencies 包的依赖，由包名和版本号组成

##### 4) 包管理器 npm  
安装 Nodejs 包：  

    npm [install / i] [-g] [package_name]
    
本地模式和全局模式区别：

* 本地模式：npm install package_name  
* 全局模式：npm install -g package_name
     
* 本地模式：可通过 require 使用、不注册 PATH  
* 全局模式：不可通过 require 使用、注册 PATH

创建全局链接：
    
    npm link package_name  

包的发布相关：
    
    npm init / npm publish / npm unpublish

___

### Nodejs 之调试

##### 1) 命令行调试  

    node debug *.js  

调试参数：  

    run 执行脚本，在第一行暂停
    restart 重新执行脚本
    cont(c) 继续执行
    stop(s) 单步执行
    out(o) 从函数步出
    setBreakpoint(sb) 设置断点
    clearBreakpoint(cp) 清除断点
    backtrace(bt) 显示当前的调用栈
    watch 加入到监视列表
    unwatch 从监视列表移除
    watchers 显示监视列表所有的表达式和值
    kill 停止执行

##### 2) 使用 Eclipse 调试 Nodejs  
* 依次点击：Help -> Install New Software... -> Add  
* 输入：http://chromedevtools.googlecode.com/svn/update/dev/
* 选择：Google Chrome Developer Tools
* 重启 eclipse

##### 3) 使用 node-inspector 调试 Nodejs

    sudo npm install -g node-inspector