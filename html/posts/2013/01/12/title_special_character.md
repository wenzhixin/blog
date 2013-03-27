## 设置存在特殊字符的 tooltip 

分类：jQuery | 标签：特殊字符 | 发布时间：2013-01-12 10:21:00

___

#### 问题：

通过 $('element').html(html) 来生成页面元素时，假如 title 信息存在 ' 或者 " 等特殊字符时便会出现显示错误的问题

#### 解决：

    function getHtml(html, title, el) {
        $div = $('<div></div>').html(html);
        if (el) {
            $div.find(el).attr('title', title);
        } else {
            $div.children().attr('title', title);
        }
        return $div.html();
    }
