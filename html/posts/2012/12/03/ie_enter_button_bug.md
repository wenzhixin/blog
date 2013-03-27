## IE 下使用 button 时 Enter 的问题

分类：浏览器 | 标签：IE、bug | 发布时间：2012-12-03 20:21:00

___

#### 问题：

当页面中有 
	
	<button></button> 

的时候，IE 浏览器按 Enter 便会触发 button 按钮的点击事件，导致不必要的麻烦出现（例如对 input 的检查）。

#### 解决：

使用 
	
	<a class="button" href="javascript:void(0)"></a>
	
来代替，并设置其 css (根据需要进行其他的设置)：

    .button {
        display: inline-block;
        font-size: 14px;
        line-height: 25px;
        text-align: center;
        color: #333;
        text-decoration: none;
        background: url(images/button_sprite.png) no-repeat;
    }
