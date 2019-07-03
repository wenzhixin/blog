---
title: 如何批量读取 word 的内容和图片
date: 2014-09-21
categories: [后台技术]
tags: [nodejs,word,批量]
---

今天朋友说需要对100份 word 文件的内容进行录入工作，问我是否有什么方便的方法。假如最少1份按2分钟的速度算，也需要200分钟才可以录入完成。我一直都不喜欢做重复又无意义的工作，就想着能否用程序来对其进行处理，后面虽然也花了快一个钟的时间来编写代码和测试，但是当程序用了几分钟的时间就将需要的内容全部录入完成时，觉得还是挺开心的，而自己也学到了许多的东西，在这里记录下，我想以后应该也会用到。

### 使用 unoconv 处理 word

首先 word 文件是 `.docx`，在 Ubuntu 上，我们可以使用 `unoconv` 命令来解析 word 的文件，安装命令如下：
```shell
sudo apt-get install unoconv
```

通过 `--help`，我们可以知道 `unoconv` 的用法如下：
```
unoconv --stdout --format=html ./docx/test.docx
```

解析 `test.docx` 文件的内容，设置格式为 html，并且输出到标准输出中。

### 使用 shelljs 运行 shell 命令

这里使用的是熟悉的 nodejs 进行开发，而运行 shell 命令我使用的是 [shelljs](https://github.com/arturadib/shelljs)。

安装：
```shell
npm install shelljs
```

使用：
```javascript
shelljs.exec('unoconv --stdout --format=html ./docx/test.docx', {silent: true}, function (code, result) {
    if (code) {
        console.log('Error code: ' + code);
        return;
    }
    console.log(result);
});
```

到这里已经可以将 word 的内容输出到 console 中了。

### 使用 jQuery 解析 html 内容

可以看到输入的内容为 html 代码，我们需要对其进行处理，这里使用的是熟悉的 [jQuery](https://github.com/UncoolAJ86/node-jquery)。

安装：
```shell
npm install -S 'jquery@>=2.1'
npm install -S 'jsdom@latest'
```

关键代码：
```javascript
env(data, function (errors, window) {
    var $ = require('jquery')(window);

    $('p').each(function (i) {
        var text = $.trim($(this).text());
        // 这里一行一行读取文本，可以根据需要自己解析文本
    });

    $('img').each(function (i) {
        var matches = $(this).attr('src').match(/^data:image\/([A-Za-z]+);base64,(.+)$/);

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        var type = matches[1]; // 图片的类型
        var data = new Buffer(matches[2], 'base64');

        fs.writeFile('./images/' + i + '.jpg', data);
        // 将图片保存到 images 中，可以根据需要生成不同的名称
    });
});
```

### 使用 async 批量读取 word 文件

假如直接使用 forEach 的话会导致内存溢出，所以我们需要对每个文件进行排队处理，这里使用 [async](https://github.com/caolan/async)。

安装：
```shell
npm install async
```

使用：
```javascript
fs.readdir('./docx', function (err, files) {
    async.eachSeries(files, parse, function () {
        console.log('OK!!!');
    });
});

function parse(file, callback) {
    // 处理 file，完成之后调用 callback
}
```

搞定！！！当然这里只是简单的记录了大概的思路和代码，实际上需要根据不同的需要做对应的处理。
