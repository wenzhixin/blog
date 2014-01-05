## JavaScript 高级程序设计——引用类型（RegExp、Function、Global）

分类：前端技术 | 标签：JavaScript | 发布时间：2012-04-05 00:00:00

___

一、RegExp 类型

1、创建一个正则表达式

（1）语法：
```
var expression = / pattern / flags;
var expression = new RegExp(pattern, flags);
```

（2）模式（pattern）部分可以是任何简单或者复杂的正则表达式，包含字符类、限定符、分组、向前查找、以及反向引用。

（3）可带有一个或多个标志（flags），匹配模式支持 3 个标志：

 \*
g——表示全局（global）模式，即模式将应用与所有字符串，而非在发现第一个匹配时立即停止

 \*
i——表示不区分大小写（case-insensitive）模式，即在确定匹配项时忽略模式与字符串的大小写

 \*
m——表示多行（multiline）模式，即在到达一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项

（4）模式中使用的所有元字符都必须转义，而使用 RegExp
构造函数，所有的元字符必须双重转义。

 \* 元字符包括： ( [ { \\ \^ \$ | ? \* + . } ] ) 


2、RegExp 实例属性

 \* global：布尔值，表示是否设置了 g 标志

 \* ignoreCase：布尔值，表示是否设置了 i 标志

 \* lastIndex：整数，表示开始搜索下一个匹配项的字符位置，从 0 算起

 \* multiline：布尔值，表示是否设置了 m 标志

 \* source：正则表达式的字符串表示


3、RegExp 实例方法

 \*
exec()：专为捕获组设计，接收一个参数，即要应用模式的字符串，返回第一个匹配项信息的数组或者没有匹配项的时候返回
null。返回的数组包含两个额外属性：index 和
input，分别表示匹配项在字符串中的位置和应用正则表达式的字符串。

 \* test()：接收一个字符串参数，模式与该参数匹配返回 true，否则返回 false


二、Function 类型

1、函数实际上是对象，每个函数都是 Function
类型的实例，具有属性和方法，而函数名实际上是一个指向函数对象的指针，不会与具体的函数绑定。函数通常使用函数声明语法来定义，如：
```
function functionName() {}
var functionName = function() {}
```

2、函数声明与函数表达式的区别：解析器会率先读取函数声明，并使其在执行任何代码之前可用（可以访问）；而函数表达式则必须等到解析器执行到它所在的代码行，才会真正被解释执行。

 \* 例子：
```
alert(sum1(10, 10));//20
function sum1(num1, num2) {
	return num1 + num2;
}

alert(sum2(10, 10));//error
var sum2 = function(num1, num2) {
	return num1 + num2;
}
```

3、作为值的函数：不仅可以像传递函数一样把一个函数传递给另一个函数，而且可以将一个函数作为另一个函数的结果返回。也可以从一个函数中返回另一个函数，这是极为有用的技术。

 \* 要根据某个对象属性对数组进行排序的例子：
```
function createComparisonFunction(propertyName) {
	return function(object1, object2) {
		var value1 = object1[propertyName];
		var value2 = object2[propertyName];
		if (value1 < value2) {
			return -1;
		}

		if (value1 > value2) {
			return 1;
		}

		return 0;
	}
}

var data = [{name: "wenyi", age: 25}, {name: "l", age: 26}];
data.sort(createComparisonFunction("name"));
alert(data[0].name);//"l"

data.sort(createComparisonFunction("age"));
alert(data[0].name);//"wenyi"
```

4、函数内部属性

 \* arguments：一个类似数组对象，包含着传入函数中的所有参数。还有一个名叫
callee 的属性，该属性是一个指针，指向拥有这个 arguments
对象的函数，主要用于递归函数。如：
```
function factorial(num) {
	if (num < 1) {
		return 1;
	}
	return num * arguments.callee(num - 1);
}
```

 \* this：引用的是函数据以执行操作的对象，也就是说，this
是函数在执行时所处的作用域。注：函数的名字仅仅是一个包含指针的变量而已。如：
```
var name = "window";
function sayName() {
	alert(this.name);
}

var person = {name: "wenyi", sayName: sayName};
sayName();//"window"
person.sayName();//"wenyi"
```

5、函数属性

 \* length：表示函数希望接收的命名参数的个数

 \* prototype： 保存函数所有实例方法的真是所在。


6、函数方法：

（1）apply()和
call()方法，都是在特定的作用于中调用函数，实际上等于设置函数体内 this
对象的值。apply()接收两个参数，第一个是运行函数的作用域，第二个是参数数组。call()除了传入运行函数的作用域之外，必须明确的传入每一个参数。如：
```
function sum(num1, num2) {
	return num1 + num2;
}

function applySum(num1, num2) {
	sum.apply(this, arguments);
}

alert(applySum(10, 10));//20
alert(sum.apply(this, [10, 10]));//20
alert(sum.call(this, 10, 10));//20
```

（2）apply()和
call()方法能够扩充函数赖以运行的作用域，使得对象不需要与方法有任何耦合关系。如：
```
var name = "window";
function sayName() {
	alert(this.name);
}

var person = {name: "wenyi"};
sayName.call(this);//"window"
sayName.call(person);//"wenyi"
```

三、Global 对象

1、URI 方法

 \* encodeURI()：对 URI 中的空格进行编码，替换成 %20。

 \* decodeURI()：对使用 encodeURI 方法进行编码的字符进行解码。

 \* encodeURIComponent()：对 URI 中的所有非字母数字字符进行编码。

 \* decodeURIComponent()：对使用 encodeURIComponent
方法进行编码的字符进行解码。


2、eval()方法：完整的 JavaScript
解析器，接收一个参数，将传入的参数当作实际的 JavaScript
语句来解析，并把执行结果插入到原位置。能够解析代码字符串的能力非常强大，同时也非常危险。在使用
eval()时必须十分谨慎，防止恶意输入威胁安全的代码（代码注入）。
