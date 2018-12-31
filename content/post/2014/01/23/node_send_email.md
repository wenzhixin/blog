---
title: 使用 nodejs 发送邮件
date: 2014-01-23 00:00:00
categories: [后台技术]
tags: [nodejs,邮件]
---

平时在开发应用的时候，很多时候会用到邮件，来通知我们，
这里介绍 nodejs 如何发送邮件，比较简单。

使用 [Nodemailer](https://github.com/andris9/Nodemailer) 库来发送邮件。

**安装：**
```
npm install nodemailer --save
```

**增加配置信息 config.js：**
```
module.exports = {
    mail: {
        from: {
            name: 'App name',
            service: 'Gmail',
            auth: {
                user: 'gmail.name@gmail.com',
                pass: 'gmail.password'
            }
        },
        to: [
            'Zhixin Wen <wenzhixin2010@gmail.com>'
        ]
    }
};
```

参数：

* from：配置发送邮件信息
* to：数组，配置发送给谁
* name：显示的名称
* service：SMTP 名称，这里用 Gmail
* auth：邮箱的用户名和密码

**如何使用：**
```
var nodemailer = require('nodemailer'),
    config = require('./config'),
    smtpTransport = nodemailer.createTransport('SMTP', config.mail.from);
```
定义并且根据配置文件生成 smtpTransport。

**发送邮件函数：**
```
/**
 * @param {String} subject：发送的主题
 * @param {String} html：发送的 html 内容
 */
function sendMail(subject, html) {
    var mailOptions = {
        from: [config.mail.from.name, config.mail.from.auth.user].join(' '),
        to: config.mail.to.join(','),
        subject: subject,
        html: html
    };

    smtpTransport.sendMail(mailOptions, function(error, response){
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + response.message);
        }
        smtpTransport.close();
    });
};
```

**发邮件例子：**
```
sendMail('测试发邮件', '<p>Hello world!</p>');
```