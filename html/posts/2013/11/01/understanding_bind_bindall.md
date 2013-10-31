## 理解并实现 underscore 中的 bind 和 bindAll 函数

分类：前端技术 | 标签：underscore、bind、bindAll | 发布时间：2013-11-01 00:00:00

___

在开始之前，我们定义了 Person 类：

    function Person(name) {
        this.name = name;
    }
    Person.prototype.say = function() {
        console.log(this.name);
    }
    
首先，新建 person 对象：

    var wenyi = new Person('wenyi');
    wenyi.say(); // wenyi
    
可以看到这里输出的结果是 wenyi，没什么好说的，因为这里的 this 指向的是 wenyi 这个对象。

接下来，我将 say 函数赋值给一个变量，会怎么样呢？

    var func = wenyi.say;
    func(); // 空
    
可以看到输出的结果为空，因为赋值给 func 后，这里的 this 指向的是 window，而 window.name 为空。

为了改变 this 的指向，我们可以使用 **apply** 方法：

    func.apply(wenyi); // wenyi

在实际的使用中，我们常常看到这样的代码：

    $('button').click(function() {
        wenyi.say();
    });
    
* 它并不美观，因为还得嵌套多一层 function 来解决 this 的指向问题
* 像上面将 say 函数赋值给 func 变量后，转移的责任者并不能正确的使用原来的函数

而使用 bind 和 bindAll 函数可以很好的解决上面的问题：

    var func = bind(wenyi, wenyi.say);
    func(); // wenyi
    
    bindAll(wenyi, 'say');
    var func = wenyi.say;
    func(); // wenyi
    
那么，要怎么**实现** bind 和 bindAll 函数呢？

    function bind(obj, func) {
        return function() {
            return func.apply(obj, Array.prototype.slice.call(arguments));
        };
    }
    function bindAll(obj) {
        var funcs = Array.prototype.slice.call(arguments, 1);
        for (var i = 0; i < funcs.length; i++) {
            obj[funcs[i]] = bind(obj, obj[funcs[i]]);
        }
        return obj;
    }
    
* bind 的实现就是通过 apply 方法
* bindAll 的实现是利用 bind 将所有方法重新赋值

最后，附上一个实际使用到完整的**例子**：

    function Person(name, age) {
        this.name = name;
        this.age = age;
        
        bindAll(this, 'sayName', 'sayAge');
    }
    Person.prototype.sayName = function() {
        console.log(this.name);
    }
    Person.prototype.sayAge = function() {
        console.log(this.age);
    }
    
    var wenyi = new Person('wenyi', 26);
    
    var func = wenyi.sayName;
    func(); // wenyi
    
    $('button').click(wenyi.sayAge); // 26
    
___

注：  
以上为个人的理解，如有不准确的地方，欢迎有相关研究的同行指正。  
完整的实现请查看 [underscore](https://github.com/jashkenas/underscore/blob/master/underscore.js) 的源码。
