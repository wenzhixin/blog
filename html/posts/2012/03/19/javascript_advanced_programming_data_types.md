## JavaScript 高级程序设计——数据类型

分类：前端技术 | 标签：JavaScript、数据类型 | 发布时间：2012-03-19 00:00:00

___

1、JavaScript 中有 5
种简单数据类型（基本数据类型）：Undefined、Null、Boolean、Number 和
String；1 种复杂数据类型：Object，Object 本质上由一组无序的名值对组成。


2、typeof 操作符：用于检测给定变量的数据类型。使用 typeof
操作符可能返回的字符串：

（1）undefined——该值为未定义（Undefined）或者未声明的变量

（2）boolean——该值为布尔值（Boolean）

（3）number——该值为数值（Number）

（4）string——该值为字符串（String）

（5）object——该值为对象（Object）或者 Null

（6）function——该值为函数（Function）


3、Undefined 类型：只有一个值，即特殊的 undefined。在使用 var
声明变量但未对其加以初始化时，这个变量的值就是
undefined。由于对未初始化和未声明的变量使用 typeof 操作符都返回
undefined，建议养成显式初始化变量（在声明变量的同事给变量赋值）的习惯。


4、Null 类型：只有一个值，即特殊的 null，表示一个空对象指针。null 和
undefined 有特殊的关系：null == undefined
//true，但它们的用途完全不同，对于
undefined，无论在什么情况下都没必要声明一个变量的值为
undefined，而可以声明一个变量为 null 来表示空指针对象。


5、Boolean 类型：只有两个值 true 和 false


6、Number
类型：表示整数和浮点数值。整数主要包括十进制整数、八进制整数和十六进制整数。其中，八进制整数第一位必须是
0，然后为八进制数字序列（0\~7）。十六进制前两位必须为
0x，然后为十六进制数字（0\~9 及 A\~F）。

（1）e 表示法：等于 e 前面的数值乘以 10 的指数次幂

（2）Number 的最大值为 Number.MAX\_VALUE，最小值为
Number.MIN\_VALUE，超过最大值或者最小值会被自动转换为 Infinity 或者
-Infinity，可以使用 isFinite() 函数来判断。

（3）NaN（非数值 Not a
number）：是一个特殊的数字表示一个错误值，如任何数值除以 0 都会返回
NaN，可以使用 isNaN() 函数判断是否为 NaN。

（4）NaN的两个非同寻常的特点：任何涉及 NaN 的操作都会返回 NaN；NaN
与任何值都不相等，包括 NaN 本身。

（5）Number 类型用到的转换函数：parseInt() 和
parseFloat()，用于将字符串转换为整数和浮点数。


7、String 类型：表示由零或者多个 Unicode 字符组成的字符序列，即字符串。

（1）字符串的特点：JavaScript
中的字符串是不可变的，即字符串一旦创建，值便不能改变。当改变某个字符串变量的时候，首先先销毁原来的字符串，在用一个包含新值的字符串填充该变量。

（2）数值、布尔值、对象和字符串都有 toString() 方法，转换为字符串类型。


8、Object 类型：表示一组数据和功能的集合。可以通过 new
操作符来创建对象：var o = new Object()。而创建 Object
类型的实力并为其添加属性和方法，就可以创建自定义对象。Object
的每个实例都具有的属性和方法：

（1）constructor——保存着用于创建当前对象的函数，即构造函数。

（2）hasOwnProperty(propertyName)——用于检查指定的属性在当前对象实例中是否存在。

（3）isPrototypeof(object)——用于检查传入的对象是否是另一个对象的原型。

（4）propertyIsEnumerabled(propertyName)——用于检查给定的属性是否能够使用
for-in 语句来枚举。

（5）toString()——返回对象的字符串表示。

（6）valueOf()——返回对象的字符串、数值或布尔值表示。


9、其他应该注意的问题：

（1）switch
语句在比较值时使用的是全等操作符，因此不会发生类型转换，如字符串不会自动转换为整数。

（2）function 函数的参数可以用 argument
对象来获取，而函数命名的参数只是提供便利，而不是必须的。JavaScript
中的所有参数传递的都是值，不可能通过引用传递参数。
