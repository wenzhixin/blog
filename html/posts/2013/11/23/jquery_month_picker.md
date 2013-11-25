## jQuery 打造月份选择器插件

分类：前端技术 | 标签：月份、选择器、jQuery | 发布时间：2013-11-23 00:00:00

___

项目中需要用到月份选择器，找到了几款日期选择器 datepicker，
但是我不需要选择具体的日期，虽然有个可以支持只显示月份的，但是显得比较臃肿。

所以，还是决定自己实现一个吧。最后封装成了 jQuery 的插件，插件地址为：

[bootstrap-monthpicker](http://wenzhixin.net.cn/p/bootstrap-monthpicker/)

其实编写 jQuery 插件很简单，使用起来也简单，把相同的代码提取出来写成 jQuery 的插件，
这样不仅仅可以省很多代码量，还可以很好的提高开发速度。

这里，把自己编写插件的步骤记录下来，希望有需要的人可以参考下。

#### 1. 编写基本的 html 代码

日期选择器需要年份选择，以及12个月的月份选择。
```html
<div class="mp-dialog">
	<div class="mp-title">
		<i class="glyphicon glyphicon-circle-arrow-left"></i>
		<span>2013</span>
		<i class="glyphicon glyphicon-circle-arrow-right"></i>
	</div>
	<div class="mp-content">
		<ul>
			<li>一</li>
			<li>二</li>
			...
			<li>十二</li>
		</ul>
	</div>
</div>
```

#### 2. 编写基本的 css 代码

根据 html 代码，编写我们所需要的 css 样式。
```css
.mp-dialog {
	position: absolute;
	z-index: 1000;
	width: 282px;
	height: 260px;
	background: #fff;
	border-radius: 5px;
	border: 1px solid #ccc;
	display: none;
}
.mp-title {
	text-align: center;
	line-height: 40px;
	background: #92cade;
	color: #fff;
	border-radius: 5px 5px 0 0;
}
.mp-title i {
	cursor: pointer;
}
.mp-content ul {
	list-style: none;
	margin: 0;
	padding: 20px;
}
.mp-content li {
	text-align: center;
	line-height: 48px;
	float: left;
	margin: 6px;
	padding: 0;
	width: 48px;
	height: 48px;
	border: 2px dotted #ccc;
	cursor: pointer;
	border-radius: 5px;
}
.mp-content li:hover, .mp-content li.active {
	background: #f5f9fc;
	border: 2px dotted #ffaaaa;
}
```

#### 3. 编写基本的 js 事件监听

我们需要对上一年和下一年进行事件监听，并显示我们想要的年份。
```html
<div class="mp-title">
	<i class="mp-year-prev glyphicon glyphicon-circle-arrow-left"></i>
	<span>2013</span>
	<i class="mp-year-next glyphicon glyphicon-circle-arrow-right"></i>
</div>
```

这里添加了 mp-year-prev 和 mp-year-next 两个类。
```javascript
var year = 2013;
$('.mp-year-prev').click(function() {
	year--;
	$('.mp-title span').text(year);
});
$('.mp-year-next').click(function() {
	year++;
	$('.mp-title span').text(year);
});
```

我们在月份中加上了 data-month 属性，方便知道是选择哪个月份。
```html
<li data-month="0">一</li>
<li data-month="1">二</li>
...
<li data-month="11">十二</li>
```

并添加对月份选择的监听。
```javascript
$('.mp-content li').click(function() {
	console.log($(this).data);
});
```

#### 4. 封装成 jQuery 插件

自己写 jQuery 插件的时候有个基本的模块，详细见
[源码](https://gist.github.com/wenzhixin/7634953)

需要做的事情：

* 将基本的 html 让 js 来自动生成
* 监听事件使用 $el.off('click').on('click') 或者绑定监听
* 将月份选择器加在 input 或者 div、span 选择器中
* 对于 input 使用 val()，对于 div、span 使用 text()

至此，我们的[月份选择器插件](https://github.com/wenzhixin/bootstrap-monthpicker)就完成了。