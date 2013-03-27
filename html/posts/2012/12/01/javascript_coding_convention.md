## Javascript 编码约定

分类：Javascript | 标签：编码约定 | 发布时间：2012-12-01 02:31:00

___

### 1、使用 strict 模式

在一个作用域(包括函数作用域、全局作用域)中，可以使用

    "use strict";
    
来开启 strict 模式。

### 2、缩进

用 Tab 键进行代码缩进，以节约代码大小，使用4个空格的宽度来进行缩进(JSLint 建议)。

### 3、符号

1) 大括号  

与语句放同一行，放于最后面；仅有一行语句，也使用大括号：

    if (true) {
        //true
    } else {
        //false
    }
    
    while (true) {
        //alert(1);
    }
    
2) 空格  

* 在逗号、分号、冒号后加空格  
* 在操作符前后加空格  
* 在大括号开始符之前  
* 在大括号结束符和 else、while 或 catch 之间  
* 在 for 的各个部分  

如：
    
    var a = [1, 2, 3];
    var obj = {
        name: 'name',
        value: 'value'
    };
    for (var i = 0; i < 10; i++) {}
    function func(a, b, c) {}
    
    c = a + b;
    if (a && b || c) {
        //if
    } else {
        //else
    }
    
    try {
        //try
    } catch(err) {
        //catch
    }

3) 所有语句结束后，使用 ; 号结束

### 4、命名

* 对象：使用驼峰式，如：MyClass
* 方法、变量：使用混合式，如：getName(), myName
* 常量：大写加下划线，如：MY_NAME

### 5、单一 var 模式

只使用一个 var 在函数顶部进行变量声明，作用如下：

1) 提供一个单一的地址已查找到函数需要的所有局部变量  
2) 防止出现变量在定义前就被使用的逻辑错误  
3) 帮助牢记要声明变量，尽可能少地使用全局变量  
4) 更少的编码  

    function func() {
        var a = 1,
            b = 2, 
            sum = a + b,
            obj = {
                name: 'name',
                value: 'value'
            },
        $btn = $('#btn');
        //函数体
    }

### 6、循环

1) for 循环

    var i, arr = [];
    for (i = arr.length; i--;) {
        //arr[i];
    }

注: 

    for (var i = 0; i < document.getElementsByName().length; i++) {
        //document.getElementsByName()[0];
    }

这种方式每次对 i 进行长度比较的使用对会进行 document 的查询，而通常 DOM 操作是非常耗时的。

2) while 循环

    var arr = [], 
        i = arr.length;
    while (i--) {
        //处理
    }

3) for-in 循环

    var i,
        hasOwn = Object.prototype.hasOwnProperty;
    for (i in man) {
        if (hasOwn.call(man, i)) { //过滤
            console.log(i, ':', man[i]);
        }
    }

### 7、switch 选择

    switch (num) {
    case 0:
        //do something
        break;
    case 1:
        //do something
        break;
    ...
    default:
        //do default
    }

建议使用：
    
    var obj = {
        '0': function() {
            //do somethins
        },
        '1': function() {
            // do somethis
        }, ...
    }
    if (obj.hasOwnProperty(num)) {
        obj[num]();
    } else {
        //do default
    }


### 8、使用 parseInt() 的数值约定

1) 每次都具体指定进制参数：
    
    var month = '09', day = '08';
    month = parseInt(month, 10); //不加进制参数便会转换为八进制
    day = parseInt(day, 10);
    
2) 其他常用的将字符串转换为数值的方法：

    +'08';
    Number('08');
    
### 9、字面量模式

不建议使用构造函数来定义：

    // built in constructors (avoid)
    var o = new Object();
    var a = new Array();
    var re = new RegExp('[a-z]', 'g');
    var s = new String();
    var n = new Number();
    var b = new Boolean();
    throw new Error('message');
    
建议使用更优的字面量模式：
    
    // literals and primitives (prefer)
    var o = {};
    var a = [];
    var re = /[a-z]/g;
    var s = '';
    var n = 0;
    var b = false;
    throw {
        name: 'Error',
        message: 'message'
    }

### 10、其他

1) 变量内的简写单词如果在开头则全小写：xmlDocument，如果不在开头则全大写：loadXML  
2) 变量必须是有意义的英文，禁止拼音  