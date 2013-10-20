## 使用 js 自动生成博客首页文件列表

分类：开发工具 | 标签：node | 发布时间：2013-10-20 00:17:00

___

#### 1. 介绍

因为每次写完文章后，都需要手动更新主页文件，打算每天至少写一篇文章。
所以这种重复工作还是交给机器去完成吧。

#### 2. 步骤

1) 遍历文章存放文件夹列表，生成所需要的文章列表

* 使用 fs.readdir(path, callback) 来读取文件夹的内容。

* 使用 fs.stat(path, callback) 来判断文件的属性

写了一半的代码之后发现 github 上有开源的遍历目录下（包括子目录）的所有文件，
于是直接拿来用了，多谢作者，该项目为：https://github.com/leizongmin/node-rd

2) 解析文件，提取文章名称、分类和日期信息

* 使用 fs.readFile(filename, [options], callback) 读取文件内容

* 使用正则表达式匹配想要的内容（最后木有用正则，字符串解析了。。。）

3) 生成 index.md 文件

* 使用 fs.writeFile(filename, data, [options], callback) 写入内容

#### 3. 最终成果

    var fs = require('fs'),
        rd = require('rd'),
        
        POST_DIR = __dirname + '/html/posts/';
    
    
    function list() {
        rd.read(POST_DIR, function(err, files) {
            if (err) {
                console.log(err);
                return;
            }
            files = files.filter(function(file) {
                if (endWith(file, '/index.md')) { // 过滤 index.md
                    return false;
                }
                return endWith(file, '.md'); // 查找 md 结尾的文件
            });
            files.sort().reverse(); // 按日期排序
            parse(files);
        });
    }
    
    function endWith(name, str) {
        return name.substring(name.length - str.length) === str;
    }
    
    function parse(files) {
        var posts = [];
        for (var i in files) {
            var content = fs.readFileSync(files[i]).toString();
                lines = content.split('\n');
                
            posts.push(getPost(files[i], lines[0], lines[2]));
        }
        create(posts);
    }
    
    function getPost(file, title, desc) {
        var arr = desc.split(' | '),
            post = {
                path: file.substring(POST_DIR.length, file.length - 3),
                title: title.substring(3),
                category: '个人作品',
                time: '置顶'
            };
            
        if (arr.length === 3) {
            post.category = arr[0].split('：')[1];    
            post.time = arr[2].split('：')[1].split(' ')[0];
        }
        return post;
    }
    
    function create(posts) {
        var content = ['## 全部文章 (' + (posts.length + 50) + ')'];
        for (var i in posts) {
            var post = posts[i];
            content.push([
                '* ',
                '(' + post.time + ')',
                '[' + post.title + '](' + post.path + ')',
                '【' + post.category + '】'
            ].join(' '));
        }
        content.push('* (其他)[更多文章...](http://qing.weibo.com/2292826740/profile) ')
        fs.writeFile(POST_DIR + 'index.md', content.join('\n\n'));
    }
    
    list();
