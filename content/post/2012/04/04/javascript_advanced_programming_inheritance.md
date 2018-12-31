---
title: JavaScript 高级程序设计——继承
date: 2012-04-04 00:00:00
categories: [前端技术]
tags: [JavaScript]
---

1、JavaScript
中实现继承主要是依靠原型链来实现的。基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。


2、实现继承模式

（1）基本模式

 \* 例子：
```
function SuperType() {
	this.property = true;
}

SuperType.prototype.getSuperType = function() {
	return this.property;
};

function SubType() {
	this.subproperty = false;
}

SubType.prototype = new SuperType();

SubType.prototype.getSubValue() {
	return this.subproperty;
};
```

//重写
```
SubType.prototype.getSuperValue() {
	return this.subproperty; 
}

var subType = new SubType();
alert(subType.getSuperType());//false
alert(subType.getSubType());//false
```

 \* 默认原型：所有引用类型默认都继承了
Object，而这个继承也是通过原型链实现的。所有函数的默认原型都是 Object
的实例，默认原型都会包含一个内部指针，指向 Object.prototype

 \* 重写超类型中的方法：重新定义原型链中的方法

 \* 注意：通过原型链实现继承时，不能使用字面量创建原型方法。

 \*
存在的问题：包含引用类型的原型属性会被所有实例共享；在创建子类的实例时，不能向超类型传递参数。


（2）借用构造函数（constructor
stealing）模式：在子类型构造函数的内部调用超类型构造函数。一般是通过使用
apply() 和 call() 方法来是调用。

 \* 例子：
```
function SuperType(name) {
	this.name = name;
	this.sayName = function() {
		alert(this.name);
	};
}

function SubType(name, age) {
	SuperType.call(this, name);
	this.age = age;
	this.sayAge = function() {
		alert(this.age);
	}
}

var subType = new SubType("wenyi", 25);
subType.sayName();//"wenyi"
subType.sayAge();//25
```

 \*
存在的问题：跟构造函数存在同样的问题，即方法都在构造函数中定义，函数无法复用。


（3）组合继承（combination
inheritance）模式：也叫伪经典继承，指的是将原型链和构造函数的技术组合到一块，从而发挥二者之长的一种继承模式。使用原型琏实现对原型属性和方法的继承，通过借用构造函数来实现对实例属性的继承。

 \* 例子：
```
function SuperType(name) {
	this.name = name;
}

SuperType.prototype.sayName = function() {
	alert(this.name);
};

function SubType(name, age) {
	SuperType.call(this, name);
	this.age = age;
}

SubType.prototype = new SuperType();
SubType.prototype.sayAge = function() {
	alert(this.age);
};

var subType = new SubType("wenyi", 25);
subType.sayName();//"wenyi"
subType.sayAge();//25
```

 \* 存在的问题：无论在什么情况下，都会调用两次超类型构造函数。


（4）寄生式继承：创建一个仅用于封装继承过程的函数，在内部以某种方式来增强对象，最后返回对象。这种模式主要用于对象而不是自定义类型和构造函数的情况下。

 \* 例子：
```
function createAnother(original) {
	function clone(o) {
		function F(){};
		F.prototype = o;
		return new F();
	}
	
	var another = clone(original);
	another.sayHi = function() {//以某种方式来增强对象
		alert("hi");
	}

	return another;//返回对象
}

var person = {
	name: "wenyi",
	age: 25
};

var anotherPerson = createAnother(person);
anotherPerson.sayHi();//"hi"
```

（5）寄生组合式继承：通过借用构造函数来继承属性，通过原型链来继承方法，不调用超类型的构造函数，而是通过寄生式继承得到超类型的一个副本。这种模式组合了以上三种继承方式，是继承引用类型最理想的继承范式。

 \* 例子：
```
function inheritPrototype(subType, superType) {
	function clone(o) {
		function F(){};
		F.prototype = o;
		return new F();
	}
	
	var prototype = clone(subperType.prototype);
	prototype.constructor = subType;
	subType.prototype = prototype;
}

function SuperType(name) {
	this.name = name;
}

SuperType.prototype.sayName = function() {
	alert(this.name);
};

function SubType(name, age) {
	SuperType.call(this, name);
	this.age = age;
}

inheritPrototype(SubType, SuperType);
	SubType.prototype.sayAge = function() {
	alert(this.age);
};

var subType = new SubType("wenyi", 25);
subType.sayName();//"wenyi"
subType.sayAge();//25
```

 \* 注：jQuery 中的 $.extend() 方法和 YUI 的 YAHOO.lang.extend()
方法都使用了继承组合继承。
