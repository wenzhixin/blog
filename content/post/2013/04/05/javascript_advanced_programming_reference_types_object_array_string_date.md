---
title: JavaScript 高级程序设计——引用类型（Object、Array、String、Date）
date: 2012-04-05 00:00:00
categories: [前端技术]
tags: [JavaScript]
---

一、Object 类型

1、创建 Object 实例的方法：使用 new 操作符接构造函数方法 和
使用对象字面量表示法。
```
var obj = new Object();
obj.name1 = value1;
obj.name2 = value2;
...
```

```
var obj = {
	name1: value1,
	name2: value2,
	...
}
```

2、访问 Object
属性使用的方法：点表示法（优先使用）和方括号表示法（变量作为属性）。

 \* obj.name

 \* obj["name"]


3、常用方法：

（1）obj.hasOwnProperty(name)-判断 obj 对象是否存在 name 属性，例子：

```
var obj = {name: "wenyi"};
alert(obj.hasOwnProperty("name"));//true
alert(obj.hasOwnProperty("age"));//false
```

（2）Object.getOwnPropertyNames(obj)-获取 obj
对象中所有的属性名称，常用于对对象属性进行遍历，返回属性数组。例子：
```
var obj = {name: "wenyi", age: 25};
var names = Object.getOwnPropertyNames(obj);
alert(names);//"name,age"
```

二、Array 类型

1、创建数组的方法：new Array 方法 和 使用数组字面量方法。

```
var arr = new Array();

var arr = new Array(length);

var arr = new Array(value1, value2, ...);
```

```
var arr = [value1, value2, ...];
```

2、使用数组的方法：用方括号并提供响应值的机遇 0 的数字索引。


3、数组的常用属性：

 \* length-表示数组的长度，可以写入，表示设置数组的长度为指定大小。


4、方法：

（1）转换方法：toLocalString()、toString()、valueOf()和 join()。

 \*
toLocalString()、toString()、valueOf()都会将数组中的每个值拼接成一个字符串，中间以逗号分割。

 \* join()接收一个参数，用作分隔符，返回包含所以数组项的字符串。

 \* 例子：
```
var colors = {"red", "blue", "yellow"};

alert(colors.toLocalString());//"red,blue,yellow"

alert(colors.toString());//"red,blue,yellow"

alert(colors.valueOf());//"red,blue,yellow"

alert(colors);//"red,blue,yellow"

alert(colors.join("|"));//"red|blue|yellow"
```

（2）栈（LIFO-后进先出）方法：push()和 pop()。

 \*
push()可以接收任意数量的参数，逐个添加到数组末尾，返回修改后数组的长度。

 \* pop()表示从数组末尾移除最后一项，返回移除的项。


（3）队列（FIFO-先进先出）方法：push()和 shift()；unshift()和 pop()。

 \* shift()表示移除并返回数组的第一个项。

 \* unshift()表示在数组前端添加任意个项并返回修改后数组的长度。


（4）重排序方法：reverse()和 sort()。

 \* reverse()用于反转数组项的顺序。

 \*
sort()用于对数组项进行字符串排序，默认按升序排列。对数值类型进行排序，需要传递比较函数，比较函数接收两个参数，返回负数表示第一个参数应该位于第二个之前，返回
0 表示两个参数相等，返回正数表示第一个参数应该位于第二个之后。

 \* 例子：
```
function compareAsc(value1, value2) {
	return value1 - value2;
}

function compareDesc(value1, value2) {
	return value2 - value1;
}

var values = {5, 0, 15, 10};

values.reverse();
alert(values);//10, 15, 0, 5

values = values.soft(compareAsc);
alert(values);//0, 5, 10, 15

values = values.soft(compareDesc);
alert(values);//15, 10, 5, 0
```

（5）操作方法：concat()、slice()和 splice()。

 \* concat()基于当前数组，将接收到的参数添加到末尾，并返回新构建的数组。

 \*
slice()基于当前数组中的一个或者多个项来创建一个新数组，可以接收一个或两个参数，表示返回项的起始和结尾位置。

 \*
splice()可用于删除、插入和替换多种操作。接收两个或两个以上的参数，第一个参数表示起始位置、第二个参数表示要删除的项数，第三个参数开始表示所有插入的项。


三、String 类型

1、字符方法：charAt()和
charCodeAt()，接收一个参数，返回指定位置的字符和字符编码。


2、字符串操作方法：

 \*
concat()：用于将一或多个字符串拼接起来，返回新字符串。注：实践中用的比较少，用加号操作符（+）代替。

 \* slice(start, end)、substr(start, length)和 substring(start,
end)，用于基于子字符串创建新字符串的方法。


3、字符串位置方法：indexOf()和
lastIndexOf()从一个字符串中搜索给定的子字符串，返回子字符串的位置。


4、字符串模式匹配方法：

 \* match()：接收一个参数，正则表达式或者是 RegExp 对象，返回匹配数组

 \* search()：返回字符串中第一个匹配项的索引

 \* replace()：接收两个参数，第一个参数为 正则表达式或者 RegExp
对象或者字符串，第二个参数为字符串或者函数。注：替换所有子字符串，需要提供一个正则表达式并指定全局（g）标志。


四、Date 类型

1、创建 Date 对象

 \* Date()：表示创建一个当前日期对象

 \* Date(dateStr) 和
Date.parse(dateStr)：表示接收一个表示日期的字符串参数，创建一个日期对象。（注：接收
yyyy/MM/dd 的格式，不接收 yyyy-mm-dd 格式）

 \* Date(year, month, day, hour, minute, second) 和 Date.UTC(year,
month, day, hour, minute, second)：表示通过参数创建一个日期对象，year 和
month 为必须项。

 \* 用于转换 yyyy-MM-dd hh-mm-ss 字符串格式的例子：
```
function parseDate(dateStr) {
	dateStr = dateStr.replace(/\\-/g, "-");
	return new Date(dateStr);
}

var dateStr = "2012-04-05 11:19:00";
var date = parseDate(dateStr);
```

2、日期格式化方法：

 \* toDateString()-显示星期几、月、年、日

 \* toLocaleDateString()-显示特定地区的星期几、月、年、日

 \* toTimeString()-显示时、分、秒和时区

 \* toLocaleTimeString()-显示特定地区时、分、秒和时区

 \* toUTCString()-显示完整的 UTC 日期


3、日期/时间组件方法

 \* getTime/setTime：日期毫秒数

 \* getFullYear/setFullYear：4位数年份

 \* getMonth/setMonth：日期中的月份，0-11

 \* getDate/setDate：日期中的天数，1-31

 \* getDay/setDay：日期中的星期数，0-6

 \* getHours/setHours：日期中的小时数，0-23

 \* getMinutes/setMinutes：日期中的分钟数，0-59

 \* getSeconds/setSeconds：日期中的秒数，0-59

 \* getMilliseconds/setMilliseconds：日期中的毫秒数


五、Math 类型

1、属性：

 \* Math.E：常量 e 的值

 \* Math.LN10：10 的自然对数

 \* Math.LN2：2 的自然对数

 \* Math.LOG2E：以 2 为底 e 的对数

 \* Math.LOG10E：以 10 为底 e 的对数

 \* Math.PI：pi的值

 \* Math.SQRT1\_2：1/2 的平方根

 \* Math.SQRT2：2 的平方根


2、方法：

 \* min()和 max()确定数组中的最小值和最大值

 \* ceil()、floor()和 round()执行向上舍入、向下舍入和标准舍入

 \* random()返回介于 0-1 之间的一个随机数
