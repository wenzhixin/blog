## 快速搭建自己的博客(markdown)

分类：Javascript | 标签：markdown、博客 | 发布时间：2012-11-30 01:54:00

___

PS：基于 jQuery、markdown 的 html 博客，无涉及后台，如此简单，你也可以拥有!!!

### 目录结构

    ├── js  
    |    ├── jquery-1.8.3.min.js
    |    ├── markdown.js
    |    ├── js-url.js
    |    └── index.js
    ├── index.html
    └── posts  
         ├── index.md
         └── 2012/11/30
              └── hello_world.md

### 1、创建 index.html

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>文翼的博客</title>
    </head>
    <body>
      <div id="post"></div>
      <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
      <script type="text/javascript" src="js/markdown.js"></script>
      <script type="text/javascript" src="js/js-url.js"></script>
      <script type="text/javascript" src="js/index.js"></script>
    </body>
    </html>


分别引入

* 1) jQuery，这里使用 jquery-1.8.3，详细见 [http://www.jquery.com](http://www.jquery.com)
* 2) markdown，用于解析 md 文件，详细见 [https://github.com/evilstreak/markdown-js](https://github.com/evilstreak/markdown-js)
* 3) url，用于解析 url 地址，详细见 [https://github.com/websanova/js-url](https://github.com/websanova/js-url)
* 4) index.js

### 2、创建 index.js

    $(function() {
        'use strict';
        
        function getPost(url) {
            if (!url) {
                getPost('index');
                return;
            }
            $.ajax({
                url: 'posts/' + url + '.md', 
                success: function(data) {
                    $('#post').html(markdown.toHTML(data));
                },
                error: function(data) {
                    getPost('index');
                }
            });
        }
        
        getPost(url('?'));
    });
    
### 3、创建 index.md

    ## 文章列表
    
    * [我的第一篇文章哦](/2012/11/30/hello_world) (2012-11-30)
    
### 4、增加第一篇文章 hello_world.md

    ## 我的第一篇文章哦
    
    分类：分类 | 发布时间：2012-11-30 02:20:00
    
    ___
    
    ### hello world! 
    
    这是我的第一篇文章哦  
    我的文章内容

注：这里的目录结构以日期来命名，以防止冲突，如：2012/11/30/文章名称.md

### 5、大功告成
最后，将整个 blog 目录放到服务器上（nodejs, apache2, nginx, IIS, ...）,输入地址便可以看到:

![index](/posts/2012/11/30/build_markdown_blog1.jpeg) 

![hello_world](/posts/2012/11/30/build_markdown_blog2.jpeg) 

### 6、最后的最后>>>
* 你可以加入自己的 CSS 进行美化，以及其他信息
* 你可以考虑将 md 文件内容存在数据库（例如：mongodb）中，并加入评论等其他的功能

___

#### 附件下载：
[blog.zip](/posts/2012/11/30/build_markdown_blog.zip)
