---
title: PHP 代码规范
date: 2014-01-20
categories: [后台技术]
tags: [PHP,代码规范]
---

### 通用规范

* 代码缩进全部用 tab / 四个空格
* SVN / Git 中新建文件编码类型统一用 utf-8 编码
* 行宽：80 字符

### PHP 代码划分

PHP 代码总是用完整的标准的 PHP 标签定界：
```php
<?php
// 开头必须使用 <?php

// php文件必须以 ?> 结尾，并且保证其后面没有空格或空行。
?>
```

### 注明作者信息

每个文件必须注明作者的信息和邮箱
```php
<?php
/*
 * @author: zhixin <wenzhixin2010@gmail.com>
 */
?>
```

### 字符串文字

当字符串是文字（不包含变量），应当用单引号（apostrophe）来括起来：
```php
$a = 'Example String';
```

### 操作符前后都要有空格

```php
$c = $a + $b; // 操作符前后都要有空格

$company = 'Zend' . ' ' . 'Technologies'; // 字符串必需用 "." 操作符连接，在它的前后加上空格以提高可读性
```

### 函数

```php
function foo($i, $list) { // 定义函数，( 前面没有空格，） 后面需要空格

}

require_once('config.inc.php'); //  调用函数，() 前后没有空格

threeArguments(1, 2, 3); // 多个参数，如果有逗号，那么逗号后面要有空格
```

### 控制语句

* 使用控制语句在语句的圆括号前后都必须有一个空格。

```php
if ($i > 0) { // if后面加空格

} else { // else前后也要有空格

}

for ($j = 0; $j < $i; $j++) { // for后面加空格

}

switch ($numPeople) { // switch后面加空格
    case 1: // 缩进
        break;

    case 2:
        break;

    default: // switch 语句应当有 default
        break;
}
```

### 数组：

```php
$number = array(1, 2, 3, 4); // 简单数组，放一行

// 数组格式
$color = array(
    '1' => 'red', // 缩进一次
    '2' => 'blue',
    '3' => 'yellow',
    '4' => array(
        '1' => 'green',	// 缩进一次
        '2' => 'gray'
    ) // 数组的结尾与声明的变量最前面对齐
); // 数组的结尾与数组变量声明的地方对齐
```

### 类
```php
class CodingStandard { // 大括号前面加空格，类名开头字母大写，多个字母首字母大写
    private $attribute; // 命名使用驼峰原则

    public function testFunction() { // 方法命名都遵守驼峰原则

    }
}

$s = new CodingStandard(); // new 一个对象，后面必须加括弧
```

---

参考：

* [编码风格](http://framework.zend.com/manual/1.12/zh/coding-standard.coding-style.html)
