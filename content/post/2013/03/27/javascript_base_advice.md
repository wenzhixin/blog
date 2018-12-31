---
title: 改善 JavaScript 的建议——语言基础
date: 2013-03-27 19:46:00
categories: [前端技术]
tags: [语言基础]
---

### 1. 减少全局变量污染

建议：在应用程序中创建唯一一个全局变量，定义该变量为当前应用的容器

    var My = {};
    My.name = 'wenzhixin';
    My.work = {
        number: 123,
        list: [{
            name: 'web',
            time: '2010.05.01'
        }]
    };

### 2. 变量声明

建议：在函数体顶部声明可能用到的所有变量

    function test() {
        var a = 1,
            b = 'wen',
            c = {
                name: 'zhixin'
            };
        // use a, b ,c
    }

### 3. 慎用 JavaScript 类型自动转换、运算符

建议：明确变量类型，使用 === 来进行比较，不用 ==

    var a = 1,
        b = '1';
    if (a == b) {
        //
    }
    //or
    if (a === b) {
        //
    }
    //or
    switch (b) {
    case 1:
        //
    }
    0 == ''; //true
    '' == '0'; //false
    0 == '0'; //true

### 4. 避免误用 parseInt

建议：强制使用基数参数 parseInt(str, base)
    
    parseInt('08'); //0
    parseInt('09'); //0
    parseInt('09', 10); //9

### 5. 防止自动插入分号

建议：完整的语句都增加分号以表示句子结束，将 { 放于语句尾部

    // 相当于 return;
    function test() {
        return 
        {
            status: true
        };
    }

### 6. 不要过于信任 hasOwnProperty

建议：防止 hasOwnProperty 方法是否被重定义

    var obj = {
        name: 'test',
        hasOwnProperty: null
    };
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            //error
        }
    }

### 7. 谨记对象非空特性

建议：使用 hasOwnProperty 和 typeof 来检查成员

    var arr = ['on', 'off', 'constructor', 'on', 'off', 'constructor'],
        i, word, count = {};
    for (i = 0; i < arr.length; i++) {
        word = arr[i];
        if (count[word]) {
            count[word] += 1;
        } else {
            count[word] = 1;
        }
    }
    console.log(count['on']); //3
    console.log(count['off']); //3
    console.log(count['constructor']); //function Object(){[native code]}
    
    //use:
    if (typeof count[word] === 'number') {
    }

### 8. 谨慎使用伪数组

建议：使用 constructor 判断是否为数组

    function isArray(value) {
        return value && typeof value === 'object' && value.constructor === Array;
    }
    
    console.log(isArray(arguments));
    
### 9. 避免使用 with

建议： 不使用 with

    var name = 'wenyi',
        obj = {
            name = 'wenzhixin',
            age = 26
        };
    
    with (obj) {
        alert(name); //速度慢
        alert(age);
    }
    
    with (obj) {
        a = b; //结果不可预料
    }

### 10. 不滥用 eval

建议： 尽量不使用 eval

    eval('value = obj.' + key + ';'); //错的写法
    value = obj[key]; //对的写法
    
### 11. 块标志并非多余

建议：单行语句也加上大括号

    if (0) 
        if (1)
            alert(1);
    else
        alert(0);
        
    //实际上使用最近原则解析
    if (0) 
        if (1)
            alert(1);
        else 
            alert(0);
    
    //应该加上大括号
    if (0) {
        if (1) {
            alert(1);
        }
    } else {
        alert(0);
    }

### 12. 避免条件结构的多重嵌套

建议：使用排除法

    //多重嵌套
    if (a) {
        if (b) {
            if (c) {
                if (d) {
                    alert('所有成立');
                } else {
                    alert('d不成立');
                }
            } else {
                alert('c不成立');
            }
        } else {
            alert('b不成立');
        }
    } else {
        alert('a不成立');
    }
    //排除法
    if (!a) {
        alert('a不成立');
        return;
    }
    if (!b) {
        alert('b不成立');
        return;
    }
    if (!c) {
        alert('c不成立');
        return;
    }
    if (!d) {
        alert('d不成立');
        return;
    }
    alert('所有成立');
