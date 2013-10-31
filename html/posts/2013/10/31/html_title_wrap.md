## html 标签 title 换行方法

分类：前端技术 | 标签：title、换行 | 发布时间：2013-10-31 00:51:00

___

#### 1. 使用换行符换行

换行符分别为：&#10; 或 &#13;

例如：

    <a href="http://wenzhixin.net.cn" title="前端技术&#10;交互设计&#13;移动开发">文翼的博客</a>
    
#### 2. 使用 jQuery.attr('title', '') 的情况

实际项目应用中，我们常常会使用 jQuery 的 attr 方法来设置 title 属性。

例如：

    $('a').attr('title', '前端技术&#10;交互设计&#13;移动开发');
    
可以发现并没有得到我们想要的结果，这是因为 jquery 对 & 进行了编码，这样显示出来并没有换行。

在这里，可以使用下面的代码解决该问题：

    var title = $('<div/>').html('前端技术&#10;交互设计&#13;移动开发').text();
    $('a').attr('title', title);

#### 3. 解决浏览器兼容问题

测试了 chrome 和 firefox，貌似没什么问题，不过为了更好的解决浏览器兼容性，决定用 jQuery 来解决。

新建文件（[jquery.wrap.title.js](/posts/2013/10/31/jquery.wrap.title.js)）：

    $(function() {
        $(document).on('mouseover', '[title]', function(e) {
            var $this = $(this),
                title = $this.attr('title'),
                titles = [],
                $div = $('<div class="wrap-title"></div>');
                
            $this.attr('data-title', title);
            $this.removeAttr('title');
            
            $.each(title.split('\r'), function(i, item) {
                $.each(item.split('\n'), function(j, t) {
                    titles.push(t);
                });
            });
            
            $div.html(titles.join('<br/>')).css({
                'left': e.pageX + 'px',
                'top': e.pageY + 'px',
                'position': 'absolute',
                'padding': '5px',
                'background': '#000',
                'color': '#fff',
                'font-size': '14px',
                'border-radius': '5px'
            });
            $(this).append($div);
        });
        $(document).on('mouseout', '[data-title]', function() {
            var $this = $(this),
                title = $this.attr('data-title');
            
            $this.attr('title', title);
            $this.find('.wrap-title').remove();
        });
    });
    
代码兼容上面两种设置 title 的方法，不用修改任何 html 代码，使用：

    <script src="js/jquery.min.js"></script>
    <script src="js/jquery.wrap.title.js"></script>