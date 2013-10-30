## Bootstrap 禁用 a 按钮

分类：前端技术 | 标签：Bootstrap、按钮 | 发布时间：2013-08-12 00:31:00

___

### 问题描述：

使用 Bootstrap 的 btn 时，可以使用添加 class="disabled" 或者 disabled="disabled" 来禁用按钮，可以看到 bootstrap.css 中的代码：

    .btn.disabled,
    .btn[disabled] {
      cursor: default;
      background-color: #e6e6e6;
      background-image: none;
      opacity: 0.65;
      filter: alpha(opacity=65);
      -webkit-box-shadow: none;
         -moz-box-shadow: none;
              box-shadow: none;
    }
    
假如我们需要对按钮进行事件监听，例如：

    <a href="#" class="btn" disabled="disabled">按钮</a>

    $(function() {
        $('btn').click(function() {
            alert('click');
        });
    });
    
按钮是灰掉了，但是还是会触发点击事件。

### 问题解决：

通过添加 pointer-events 来阻止按钮的事件：

    .btn.disabled,
    .btn[disabled] {
        pointer-events: none;
        cursor: default;
    }