---
title: JavaScript 高级程序设计——面向对象
date: 2012-04-03 00:00:00
categories: [前端技术]
tags: [JavaScript,面向对象]
---

1、JavaScript
把的对象定义成散列表：无序属性的集合，其属性可以包含基本值、对象或者函数。


2、创建对象模式

（1）最简单的方式：创建一个 Object 的实例，并为它添加属性和方法。

 \* 例子：

```
var person = new Object();
person.name = "wenyi";
person.age = 25;
person.sayName = function() {
	alert(this.name);
};
person.sayName();//"wenyi"
```

 \* 存在的问题：使用同一个借口创建很多对象，会产生大量的重复代码。


（2）工厂模式：抽象了创建具体对象的过程，用函数来封装以特定接口创建对象的细节。

 \* 例子：

```
function createPerson(name, age) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.sayName = function() {
		alert(this.name);
	};
	return o;
}

var person = createPerson("wenyi", 25);
person.sayName();//"wenyi"
```

 \* 存在的问题：没有解决对象识别的问题。


（3）构造函数模式：用来创建特定类型的对象，也可以创建自定义的构造函数，从而定义自定义对象类型的属性和方法。

 \* 例子：

```
function Person(name, age) {
	this.name = name;
	this.age = age;

	this.sayName = function() {
		alert(this.name);
	}
}

var person = new Person("wenyi", 25);
person.sayName();//"wenyi"
```

 \* 特点：不用显式的创建对象，而是直接将属性和方法赋给了 this 对象，不用
return

 \* 使用：创建构造函数模式对象的实例，需要使用 new 操作符。

 \* 构造函数与普通函数的区别：任何函数，只要通过 new
操作符来调用，那它就是构造函数；没有通过 new 操作符来调用，都是普通函数。

 \*
存在的问题：每个方法都要在每个实例上重新创建一遍，即每个实例都包含不同的
Function 实例。


（4）原型模式：创建的每个函数都有一个
prototype（原型）属性，这个属性是一个指针，指向一个对象，这个对象包含可以由特定类型的所以实例共享的属性和方法。

 \* 例子：
```
function Person() {

}

Person.prototype.name = "wenyi";
Person.prototype.age = 25;
Person.prototype.sayName = function() {
	alert(this.name);
};

var person = new Person();
person.sayName();//"wenyi"
person.name = "test";
person.sayName();//"test";

delete person.name;
person.sayName();//"wenyi"
```

 \* 理解原型对象：默认情况下，所有原型对象都会自动获得一个 constructor
属性，这个属性包含一个指向 prototype
属性所在函数的指针。创建自定义的构造函数后，其原型对象默认只会取得
constructor
属性。当调用构造函数创建一个实例后，该实例的内部包含一个内部指针，指向构造函数的原型对象。在实例中，Person.prototype
指向了原型对象，而 Person.prototype.constructor 又指回了 Person

 \*
特点：当为原型模型对象实例添加一个属性时，这个属性会屏蔽原型对象中保存的同名属性；使用
delete 操作符可以删除实例属性，从而重新访问原型属性。

 \*
更简单的原型模式语法：使用一个包含所有属性和方法的对象字面量重写整个原型对象，并设置
constructor 的指向。如：
```
Person.prototype = {
	constructor: Person,
	
	name: "wenyi",
	
	age: 25,
	
	sayName: function() {
		alert(this.name);
	}
};
```

 \*
存在的问题：原型模式省略了构造函数传递初始化参数，所以的实例都会获得相同的属性值。


（5）组合使用构造函数模式和原型模式：使用构造模式来定义实例属性，使用原型模式来地定义方法和共享的属性。从而使得每个实例都有自己的一份实例属性的副本，同时又共享着对方法的引用，最大限度的节省了内存。这种混成模式是创建自定义类型的最常见方法，是使用最广泛、认同度最高的一种创建自定义类型的方法。可以说，这是用来定义引用类型的一种默认模式。

 \* 例子：
```
function Person(name, age) {
	this.name = name;
	this.age = age;
}

Person.prototype = {
	constructor: Person,

	sayName: function() {
		alert(this.name);
	}
};

var person = new Person("wenyi", 25);
person.sayName();//"wenyi"
```

（6）寄生构造函数模式：创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象，这个函数是典型的构造函数。这种模式主要用于在特殊的情况下为对象创建构造函数。这种模式返回的对象与构造函数或者与构造函数的原型属性之间没有关系。

 \* 创建一个具有额外方法的特殊数组，例子：
```
function SpecialArray() {
	var values = new Array();

	values.push.apply(values, arguments);

	values.toPipedString = function() {
		return this.join("|");
	}
}

var colors = new SpecicalArray("red", "blue", "green");
alert(colors.toPipedString());//"red|blue|green"
```

（7）稳妥构造函数模式：指没有公共的属性，其方法也不引用 this
对象。这种模式主要用于一些安全的环境中，或者防止数据被其他应用程序改动时使用。这种模式返回的对象与构造函数或者与构造函数的原型属性之间没有关系。

 \* 例子：
```
function Person(name, age) {
	var o = new Object();
	
	o.sayName = function() {
		alert(name);
	};

	return o;
}

var person = new Person("wenyi", 25);
person.sayName();//"wenyi"
```