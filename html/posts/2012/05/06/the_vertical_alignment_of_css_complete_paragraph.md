## 彻底研究 CSS ——段落的垂直对齐

分类：前端技术 | 标签：CSS、垂直对齐 | 发布时间：2012-05-06 00:00:00

___

如果文字内容只有一行，可以设置 line-height 与height
相同来使文字垂直居中。

 \* css 代码：
```
.one_line {
    width: 500px;
    height: 100px;
    line-height: 100px;
    background-color: #9bd;
    margin: 20px;
    padding: 20px;
}
```

 \* html 代码：
```
<div class="one_line">
    这是一行文字内容的垂直对齐
</div>
```

 \* 效果：

![彻底研究 CSS
——段落的垂直对齐](http://ww4.sinaimg.cn/mw600/88a9c274jw1dsnwuu9youg.gif)


但是对于超过一行的文本，或者浏览器窗口变窄的情况话，设置
line-height
的方法就不起作用了。怎么样才能有效解决未知高度的垂直居中问题（在一个DIV标签里有未知高度的文本或图片的情况下）。下面是解决该问题比较完善的一个解决方案。

在标准浏览器（Mozilla, Opera, Safari
等）中，可将父级元素显示方式设定为 table(display: table;)，内部子元素定为
table-cell(display: table-cell;),通过 vertical-align（vertical-align:
middle;）特性使其垂直居中，但非标准浏览器是不支持的。

在非标准浏览器（IE）中，只能在子元素里设距顶部
50%，里面再套个元素距顶部 -50% 来实现垂直居中。

 \* css 代码：

```
.more_line {
    width: 500px;
    height: 100px;
    background-color: #9bd;
    margin: 20px;
    padding: 20px;
}

.outer {
    display: table;
    overflow: hidden;
    position: relative;
}

.middle {
    display: table-cell;
    vertical-align: middle;
    position: absolute; 
    top: 50%;  
}

.inner {
    position: relative; 
    top: -50%;
}
```

 \* html 代码：
```
<div class="outer more_line">
    <div class="middle">
        <div class="inner">
			这是多行文字内容的垂直对齐。这是多行文字内容的垂直对齐。这是多行文字内容的垂直对齐。
        </div>
    </div>
</div>
```

 \* 效果：

![彻底研究 CSS
——段落的垂直对齐](http://ww3.sinaimg.cn/mw600/88a9c274jw1dsnwvk6onbg.gif)


由于需要每次都加入三个 div，和 css
样式，比较复杂也不好记，在这里，可以利用 jquery
将其自定义为插件的方式以方便调用。

插件名称为：jquery.verticalCenter.js，使用的时候用$(".vc").verticalCenter();

 \* jquery-verticalCenter.js 代码：

```
;(function($) {
    $.fn.extend({
        verticalCenter: function() {
            return this.each(function() {
                var _html = $(this).html();
                $(this).attr("style", "display:table;\#position:relative;overflow:hidden;");
                var html = "<div style='\#position:absolute;\#top:50%;display:table-cell;vertical-align:middle;'>";
                html += "<div style='\#position:relative;\#top:-50%;'>";
                html += _html;
                html += "</div>";
                html += "</div>";
                $(this).html(html);
                $("img", $(this)).css("vertical-align", "middle");
                $("input", $(this)).css("vertical-align", "middle");
            });
        }
    });
})(jQuery);
```
    
例子：

 \* html 代码：
```
<div class="vc">
    这是多行文字内容使用 jquery-plugin 的垂直对齐。这是多行文字内容使用jquery-plugin 的垂直对齐。
</div>
<div class="vc test_img">
    <img src="test.gif" />
    <input type="text" />
    这是混合的使用 jquery-plugin 的垂直对齐。
</div>
```

\* javascript 代码：
```
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript"
src="js/jquery.verticalCenter.js"></script>
<script type="text/javascript">
    $(function() {
        $(".vc").verticalCenter();       
    });
</script>
```

\* 效果：

![彻底研究 CSS
——段落的垂直对齐](http://ww1.sinaimg.cn/mw600/88a9c274jw1dsnww350n6g.gif)
